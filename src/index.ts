// src/index.ts
// import https  from 'node:https';
import { Wallet } from 'ethers';

export default {
  async fetch(request, env, ctx): Promise<Response> {
    // Use ethers to create a wallet
    const wallet = Wallet.createRandom();
    const address = wallet.address;

    // Use https module to make a simple request
    const data = await new Promise((resolve, reject) => {
      https.get('https://www.cloudflare.com/', (res) => {
        let body = '';
        res.on('data', (chunk) => (body += chunk));
        res.on('end', () => resolve(body));
        res.on('error', (err) => reject(err));
      });
    });

    return new Response(`Address: ${address}\nData length: ${(data as string).length}`);
  },
} satisfies ExportedHandler<Env>;
