const storage = require('./data-store');

const main = async () => {
  await storage.init('/Users/kturcios/Library/Application Support');
  await storage.createBillingProfile({
    firstname: 'jimmy',
    lastname: 'jazz',
    phoneNumber: '1231231234',
    email: 'jimmy@jazz.com',
    country: 'US',
    street: '12345 happy pl',
    city: 'happy land',
    state: '31',
    zip: '12345',
    ccType: 'VI',
    cc: '1234123412341234',
    ccv: '123',
    expMonth: '3',
    expYear: '2025',
  });
  console.log(await storage.listBillingProfiles());
};

main();
