const puppeteer = require('puppeteer');

const getChromiumExecPath = () => puppeteer.executablePath().replace('app.asar', 'app.asar.unpacked/node_modules/puppeteer');

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
  await page.goto('https://www.shoepalace.com/product/jordan/cd0461-100/air-jordan-1-high-og-tie-dye-womens-lifestyle-shoe-white-black-tie-dye-blue-limit-one-per-customer/');// 'https://www.shoepalace.com/product/nike/cj0625-700/air-max-97-womens-running-shoe-gold-white/', { waitUntil: 'networkidle2' });
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
      if (buttons[i].innerText === '10') {
        buttons[i].click();
        found = true;
      }
    }
    // HANDLE TIMER HERE
  }, size);
  await page.evaluate((found) => {
    // if (found) {
    document.getElementById('oCartSubmit').click();
    // } else {
    //   throw new Error('Shoe size not available');
    // }
  }, found);
  await page.waitForSelector('body');
  console.info('Waiting for timer....');
  await page.waitForFunction('document.querySelector("body").innerText.includes("TRY AGAIN")', { timeout: 0 });
  console.info('timer is complete');
  await page.evaluate(() => {
    console.info('Clicked try again');
    document.querySelector('[onclick="window.history.go(-1); return false;"]').click();
  });
  await page.waitForSelector('[class="button w32 dark"]');
  console.info('Trying again...');
  found = false;
  await page.evaluate(async (sz) => {
    const buttons = document.getElementsByClassName('button w32 dark');
    for (let i = 0; i < buttons.length; i += 1) {
      if (buttons[i].innerText === '10') {
        buttons[i].click();
        found = true;
      }
    }
  }, size);
  await page.evaluate(() => {
    // if (found) {
    document.getElementById('oCartSubmit').click();
    // } else {
    //   throw new Error('Shoe size not available');
    // }
  });
  await page.waitForSelector('[maxlength="2"]');
  // Update shoe quantity to 4
  await page.evaluate((qty) => {
    document.querySelector('[maxlength="2"]').value = '4';
  }, quantity);

  // Wait and click on checkout button
  await page.waitForSelector('[class="buttonred"]');
  await page.click('[class="buttonred"]');

  // Fill out address details
  await page.waitForSelector('[class="required-entry input-text"]');
  await page.type('[id="billing:firstname"]', 'andre');
  await page.type('[id="billing:lastname"]', 'marques');
  await page.type('[id="billing:street1"]', '10240 capitol view ave');
  await page.type('[id="billing:city"]', 'silver spring');
  await page.select('[id="billing:region_id"]', '31');
  await page.type('[id="billing:postcode"]', '20910');
  await page.type('[id="billing:telephone"]', '301-792-8948');
  await page.type('[id="billing:email"]', 'andre.c.marques7@gmail.com');
  await page.type('[id="billing:confirmemail"]', 'andre.c.marques7@gmail.com');

  // Select option to pay with credit card
  await page.evaluate(() => {
    document.getElementById('p_method_firstdataglobalgateway').click();
  });

  // Fill out credit card details
  await page.select('[id="firstdataglobalgateway_cc_type"]', 'MC');
  await page.type('[id="firstdataglobalgateway_cc_number"]', '5313671235003042');
  await page.select('[id="firstdataglobalgateway_expiration"]', '6');
  await page.select('[id="firstdataglobalgateway_expiration_yr"]', '2026');
  await page.type('[id="firstdataglobalgateway_cc_cid"]', '626');

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
