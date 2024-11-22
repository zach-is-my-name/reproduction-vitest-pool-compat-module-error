// test/index.spec.ts
import { env, createExecutionContext, waitOnExecutionContext, SELF } from 'cloudflare:test';
import { describe, it, expect } from 'vitest';
import worker from '../src/index';

// For now, you'll need to do something like this to get a correctly-typed
// `Request` to pass to `worker.fetch()`.
const IncomingRequest = Request<unknown, IncomingRequestCfProperties>;

describe('Hello World worker', () => {
  it('responds with address and data length (unit style)', async () => {
    const request = new IncomingRequest('http://example.com');
    // Create an empty context to pass to `worker.fetch()`.
    const ctx = createExecutionContext();
    const response = await worker.fetch(request, env, ctx);
    // Wait for all `Promise`s passed to `ctx.waitUntil()` to settle before running test assertions
    await waitOnExecutionContext(ctx);
    const text = await response.text();
    expect(text).toMatch(/Address: 0x[a-fA-F0-9]{40}\nData length: \d+/);
  });

  it('responds with address and data length (integration style)', async () => {
    const response = await SELF.fetch('https://example.com');
    const text = await response.text();
    expect(text).toMatch(/Address: 0x[a-fA-F0-9]{40}\nData length: \d+/);
  });
});
