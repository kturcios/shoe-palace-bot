const puppeteer = require('puppeteer');
const logger = require('electron-log');

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

// // Checks if we got to the 'Try Again' screen. If yes, wait until the 
// const checkAndWaitForTryAgain = async (page) => {
//   await page.waitForSelector('body');
//   logger.info('Waiting for timer....');
//   await page.waitForFunction('document.querySelector("body").innerText.includes("TRY AGAIN")', { timeout: 0 });
// };

const checkAndWaitForPopUp = async (page) => {
  logger.info('Waiting to close popup...');
  // Wait until 'Sale' window apppears in iframe
  await page.waitForSelector('[title="Sign Up via Text for Offers"]');
  const iframe = await iframeAttached(page, 'attentive_creative');
  // Close 'Sale' Window
  const iframeBtn = await iframe.$('button[id=reject]');
  iframeBtn.click();
};

// Checks to see if desired size is available and if so select it. Otherwise, throw an error.
const selectSize = async (page, size) => {
  logger.info(`Selecting size: ${size}...`);
  await page.evaluate(async (sz) => {
    // Search through all available sizes and click on the desired size if is available
    let found = false;
    const buttons = document.getElementsByClassName('button w32 dark');
    for (let i = 0; i < buttons.length; i += 1) {
      if (buttons[i].innerText === sz) {
        buttons[i].click();
        found = true;
      }
    }
    if (!found) {
      throw new Error(`Size ${size} is not available`);
    }
  }, size);
};

// Clicks on the Add to Cart button
const clickAddToCart = async (page) => {
  logger.info('Clicking ADD TO CART...');
  await page.evaluate(() => {
    document.getElementById('oCartSubmit').click();
  });
};

const selectQuantity = async (page, quantity) => {
  // Wait until quantity textbox appears
  await page.waitForSelector('[maxlength="2"]');
  await page.evaluate((qty) => {
    document.querySelector('[maxlength="2"]').value = qty;
  }, quantity);
};

const clickCheckout = async (page) => {
  // Wait and click on checkout button
  await page.waitForSelector('[class="buttonred"]');
  await page.click('[class="buttonred"]');
};

const fillOutShipping = async (page, shipping) => {
  const {
    firstName,
    lastName,
    address,
    city,
    state,
    zipCode,
    phoneNumber,
    email,
  } = shipping;
  // Fill out address details
  await page.waitForSelector('[class="required-entry input-text"]');
  await page.type('[id="billing:firstname"]', firstName);
  await page.type('[id="billing:lastname"]', lastName);
  await page.type('[id="billing:street1"]', address);
  await page.type('[id="billing:city"]', city);
  await page.select('[id="billing:region_id"]', state);
  await page.type('[id="billing:postcode"]', zipCode);
  await page.type('[id="billing:telephone"]', phoneNumber);
  await page.type('[id="billing:email"]', email);
  await page.type('[id="billing:confirmemail"]', email);
};

// TODO: Implement
const fillOutBilling = async (page, billing) => {

};

const fillOutPayment = async (page, payment) => {
  const {
    ccType,
    cc,
    cvv,
    expMonth,
    expYear,
  } = payment;
  // Select option to pay with credit card
  await page.evaluate(() => {
    document.getElementById('p_method_firstdataglobalgateway').click();
  });
  // Fill out credit card details
  await page.select('[id="firstdataglobalgateway_cc_type"]', ccType);
  await page.type('[id="firstdataglobalgateway_cc_number"]', cc);
  await page.select('[id="firstdataglobalgateway_expiration"]', expMonth);
  await page.select('[id="firstdataglobalgateway_expiration_yr"]', expYear);
  await page.type('[id="firstdataglobalgateway_cc_cid"]', cvv);
};
const selectFlatRateShipping = async (page) => {
  // Wait and select flat rate shipping
  await page.waitForSelector('[id="s_method_flatrate_flatrate"]');
  await page.click('[id="s_method_flatrate_flatrate"]');
};

const agreeToTermsAndConditions = async (page) => {
  // Agree to terms and conditions
  await page.click('[id="agreement-1"]');
};

const placeOrder = async (page) => {
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

// Open a new window and attempt to checkout
const startTask = async (task) => {
  const {
    url,
    size,
    quantity,
    profile,
  } = task;
  const {
    shipping,
    billing,
    payment,
  } = profile;
  const browser = await puppeteer.launch({
    args: ['--no-sandbox', '--disable-web-security', '--disable-features=IsolateOrigins,site-per-process'],
    headless: false,
    slowMo: 1,
    // executablePath: '/Applications/Google\\ Chrome', //getChromiumExecPath(),
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 1200 });

  // Load shoe URL directly
  logger.info(`Loading URL: ${url}`);
  await page.goto(url, { waitUntil: 'networkidle2' });

  await checkAndWaitForPopUp(page);
  await selectSize(page, size);
  await clickAddToCart(page);
  await selectQuantity(page, quantity);
  await clickCheckout(page);
  await fillOutShipping(page, shipping);
  await fillOutBilling(page, billing);
  await fillOutPayment(page, payment);
  await selectFlatRateShipping(page);
  await agreeToTermsAndConditions(page);
  await placeOrder(page);
};

module.exports = {
  startTask,
};
