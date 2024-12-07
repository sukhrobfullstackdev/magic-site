import { WORKABLE_API_KEY } from 'constants/config';
import type { NextApiHandler } from 'next';

const getWorkable: NextApiHandler = async (_, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers',
  );

  try {
    const data = await fetch('https://magic-labs-inc.workable.com/spi/v3/jobs?state=published', {
      headers: {
        Authorization: `Bearer ${WORKABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
    });

    const response = await data.json();

    res.status(200).json(response.jobs ?? []);
  } catch (error) {
    res.status(500).json({ error });
  }
};

export default getWorkable;
