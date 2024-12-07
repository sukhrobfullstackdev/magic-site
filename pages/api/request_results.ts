export default async function handler(request, response) {
  if (request.method === 'POST') {
    const { body } = request;
    const { status } = body;
    const { request_id } = body;
    console.log(`${request_id}: ${status}`);

    response.status(200).json({});
    // Process a POST request
  } else {
    throw Error('BAHH');
  }
}
