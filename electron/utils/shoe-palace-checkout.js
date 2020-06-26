const puppeteer = require('puppeteer');

const getChromiumExecPath = () => puppeteer.executablePath().replace('app.asar', 'app.asar.unpacked');

/**
 * Waits until the iframe is attached and then returns it to the caller
 *
 * @access public
 * @param {object} page - The Puppeteer page API object
 * @param {string} nameOrId - The name or id of the target iframe
 * @returns {object} The Puppeteer iframe element
 */
const iframeAttached = (page, nameOrId) => new Promise((resolve) => {
  const pollingInterval = 1000;
  const poll = setInterval(() => {
    const iFrame = page.frames().find((frame) => frame.name() === nameOrId);
    if (iFrame) {
      clearInterval(poll);
      resolve(iFrame);
    }
  }, pollingInterval);
});

const order = async ({
  phoneNumber,
  email,
  url,
  size,
  quantity,
  firstname,
  lastname,
  street,
  city,
  state,
  zip,
  ccType,
  cc,
  ccv,
  expMonth,
  expYear,
}) => {
  const browser = await puppeteer.launch({
    args: ['--no-sandbox', '--disable-web-security', '--disable-features=IsolateOrigins,site-per-process'],
    headless: false,
    slowMo: 1,
    executablePath: getChromiumExecPath(),
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 1200 });

  // Load shoe URL directly
  await page.goto(url);// 'https://www.shoepalace.com/product/nike/cj0625-700/air-max-97-womens-running-shoe-gold-white/', { waitUntil: 'networkidle2' });
  // Wait until 'Sale' window apppears in iframe
  await page.waitForSelector('[title="Sign Up via Text for Offers"]');
  const iframe = await iframeAttached(page, 'attentive_creative');
  // Close 'Sale' Window
  const iframeBtn = await iframe.$('button[id=reject]');
  iframeBtn.click();

  // Search through all available sizes and click on the desired size if is available
  let found = false;
  await page.evaluate(async (sz) => {
    const buttons = document.getElementsByClassName('button w32 dark');
    for (let i = 0; i < buttons.length; i += 1) {
      if (buttons[i].innerText === sz) {
        buttons[i].click();
        found = true;
      }
    }
    if (found) {
      document.getElementById('oCartSubmit').click();
    } else {
      throw new Error('Shoe size not available');
    }
  }, size);
  await page.waitForSelector('[maxlength="2"]');
  // Update shoe quantity to 4
  await page.evaluate((qty) => {
    document.querySelector('[maxlength="2"]').value = qty;
  }, quantity);

  // Wait and click on checkout button
  await page.waitForSelector('[class="buttonred"]');
  await page.click('[class="buttonred"]');

  // Fill out address details
  await page.waitForSelector('[class="required-entry input-text"]');
  await page.type('[id="billing:firstname"]', firstname);
  await page.type('[id="billing:lastname"]', lastname);
  await page.type('[id="billing:street1"]', street);
  await page.type('[id="billing:city"]', city);
  await page.select('[id="billing:region_id"]', state);
  await page.type('[id="billing:postcode"]', zip);
  await page.type('[id="billing:telephone"]', phoneNumber);
  await page.type('[id="billing:email"]', email);
  await page.type('[id="billing:confirmemail"]', email);

  // Select option to pay with credit card
  await page.evaluate(() => {
    document.getElementById('p_method_firstdataglobalgateway').click();
  });

  // Fill out credit card details
  await page.select('[id="firstdataglobalgateway_cc_type"]', ccType);
  await page.type('[id="firstdataglobalgateway_cc_number"]', cc);
  await page.select('[id="firstdataglobalgateway_expiration"]', expMonth);
  await page.select('[id="firstdataglobalgateway_expiration_yr"]', expYear);
  await page.type('[id="firstdataglobalgateway_cc_cid"]', ccv);

  // Wait and select flat rate shipping
  await page.waitForSelector('[id="s_method_flatrate_flatrate"]');
  await page.click('[id="s_method_flatrate_flatrate"]');

  // Agree to terms and conditions
  await page.click('[id="agreement-1"]');

  // Wait until page is ready to checkout by waiting for the 'Place order now' button
  // and waiting for 'Grand Total' section to appear
  await page.waitForSelector('[id="onestepcheckout-place-order"]');
  await page.waitForSelector('[id="id_comments"]');
  await page.waitForFunction('document.querySelector("body").innerText.includes("Grand Total")');
  // Click on place order button
  await page.evaluate(() => {
    document.getElementById('onestepcheckout-place-order').click();
  });
};

module.exports = {
  order,
};
