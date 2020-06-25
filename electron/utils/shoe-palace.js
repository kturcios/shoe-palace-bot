const puppeteer = require('puppeteer');

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

try {
  (async () => {
    const browser = await puppeteer.launch({ args: ['--no-sandbox', '--disable-web-security', '--disable-features=IsolateOrigins,site-per-process'], headless: false, slowMo: 1 });
    const page = await browser.newPage();
    await page.setViewport({ width: 1280, height: 1200 });

    // Load shoe URL directly
    await page.goto('https://www.shoepalace.com/product/nike/cj0625-700/air-max-97-womens-running-shoe-gold-white/', { waitUntil: 'networkidle2' });
    // Wait until 'Sale' window apppears in iframe
    await page.waitForSelector('[title="Sign Up via Text for Offers"]');
    const iframe = await iframeAttached(page, 'attentive_creative');
    // Close 'Sale' Window
    const iframeBtn = await iframe.$('button[id=reject]');
    iframeBtn.click();

    // Search through all available sizes and click on the desired size if is available
    let found = false;
    await page.evaluate(async () => {
      const size = '10';
      const buttons = document.getElementsByClassName('button w32 dark');
      for (let i = 0; i < buttons.length; i += 1) {
        if (buttons[i].innerText === size) {
          buttons[i].click();
          found = true;
        }
      }
      if (found) {
        document.getElementById('oCartSubmit').click();
      }
    });
    await page.waitForSelector('[maxlength="2"]');
    // Update shoe quantity to 4
    await page.evaluate(() => {
      document.querySelector('[maxlength="2"]').value = '4';
    });

    // Wait and click on checkout button
    await page.waitForSelector('[class="buttonred"]');
    await page.click('[class="buttonred"]');

    // Fill out address details
    await page.waitForSelector('[class="required-entry input-text"]');
    await page.type('[id="billing:firstname"]', 'Jimmy');
    await page.type('[id="billing:lastname"]', 'Jazz');
    await page.type('[id="billing:street1"]', '12345 Sunny Ave');
    await page.type('[id="billing:city"]', 'Los Angeles');
    await page.select('[id="billing:region_id"]', '12');
    await page.type('[id="billing:postcode"]', '12082');
    await page.type('[id="billing:telephone"]', '1112223333');
    await page.type('[id="billing:email"]', 'jimmy@jazz.com');
    await page.type('[id="billing:confirmemail"]', 'jimmy@jazz.com');

    // Select option to pay with credit card
    await page.evaluate(() => {
      document.getElementById('p_method_firstdataglobalgateway').click();
    });

    // Fill out credit card details
    await page.select('[id="firstdataglobalgateway_cc_type"]', 'MC');
    await page.type('[id="firstdataglobalgateway_cc_number"]', '5313678868785423');
    await page.select('[id="firstdataglobalgateway_expiration"]', '3');
    await page.select('[id="firstdataglobalgateway_expiration_yr"]', '2026');
    await page.type('[id="firstdataglobalgateway_cc_cid"]', '894');

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
  })();
} catch (err) {
  console.error(err);
}
