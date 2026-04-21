const uniqueId = Date.now();

const contact = {
  firstName: 'QA',
  lastName: `Auto${uniqueId}`,
  birthdate: '1995-05-20',
  email: `qa.auto.${uniqueId}@test.com`,
  phone: '8005551234',
  street1: 'Main St 123',
  street2: 'Apt 4',
  city: 'TestCity',
  state: 'TestState',
  postalCode: '12345',
  country: 'TestLand',
};

export default contact;