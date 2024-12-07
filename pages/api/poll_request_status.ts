require('dotenv').config();

export default async function handler(request, response) {
  const { request_id } = request.query;

  if (request.method === 'GET') {
    try {
      const magic_request = await fetch('https://nft-api.magic.link/v1/nft/request/status?request_id=' + request_id, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      console.log('Request status for request id: ' + request_id + ' is: ' + magic_request);

      response.status(200).json(magic_request);
      // response.status(200).json(magic_json);
    } catch (err) {
      console.log('Minting error:', response.status(err).json());
      response.status(err).end();
    }
  } else {
    response.status(405).end();
  }
}
