import { PrismaClient, Prisma } from '@prisma/client';
import { MD5 } from 'crypto-js';

const { secrets } = require('./secrets');

const prisma = new PrismaClient();

export default async function handler(request, response) {
  const { address } = request.body;
  const { tokenId } = request.body;
  const { captcha } = request.body;
  const { sk, cid } = secrets;
  const allowedOrigins = 'https://magic.link';

  // Destructure the headers from the request
  const { headers } = request;

  // Check the origin of the request
  const { origin } = headers;
  if (origin !== allowedOrigins) {
    console.log('Origin not allowed: ' + origin);
    response.status(403).end();
    return;
  }

  console.log('Minting NFT for address: ' + address + ' with token id: ' + tokenId);

  if (request.method === 'POST' && sk && cid) {
    try {
      const captcha_resp = await fetch(
        `https://www.google.com/recaptcha/api/siteverify?secret=${secrets.captcha_sk}&response=${captcha}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      const captcha_json = await captcha_resp.json();
      console.log(captcha_json);
      if (!captcha_json.success) {
        response.status(400).end();
        return;
      }

      console.log('Captcha score: ' + captcha_json.score);
      if (
        captcha_json.score < (process.env.RECAPTCHA_THRESHOLD !== undefined ? process.env.RECAPTCHA_THRESHOLD : 0.85)
      ) {
        response.status(400).end();
        return;
      }

      // Make sure user hasn't minted before
      const hash = MD5(address).toString();
      await prisma.addresses.create({ data: { address: hash } });

      const magic_resp = await fetch('https://nft-api.magic.link/v1/nft/1155/start_mint', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Magic-Secret-Key': sk,
        },
        body: JSON.stringify({
          contract_id: cid,
          token_id: tokenId,
          quantity: 1,
          destination_address: address,
        }),
      });

      const magic_json = await magic_resp.json();
      console.log('Magic json Successful', magic_json);

      response.status(200).json(magic_json);
    } catch (err) {
      if (err instanceof Prisma.PrismaClientKnownRequestError) {
        if (err.code === 'P2002') {
          console.log('Address already minted');
          response.status(429).end();
          return;
        }
      }
      console.log('Minting error:', response.status(err).json());
      response.status(403).end();
    }
  } else {
    response.status(405).end();
  }
}
