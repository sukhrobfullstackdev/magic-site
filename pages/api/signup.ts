require('dotenv').config();

const { secrets } = require('./secrets');

export default async function handler(request, response) {
  const { email } = request.body;
  if (request.method === 'POST') {
    try {
      const signup = await fetch('https://track.customer.io/api/v1/forms/test_form_1234/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Basic ${secrets.customer_io_authId}`,
        },
        body: JSON.stringify({
          data: {
            id: email,
            email,
          },
        }),
      });
      response.status(200).json(signup);
    } catch (err) {
      response.status(err).end();
    }
  }
}
