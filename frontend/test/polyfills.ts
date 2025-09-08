// test/polyfills.ts

// 1) TextEncoder/TextDecoder (needed by @mswjs/interceptors)
import { TextEncoder, TextDecoder } from 'util';
(global as any).TextEncoder = TextEncoder;
(global as any).TextDecoder = TextDecoder as any;

// 2) Web Streams API (needed by MSW fetch interceptor)
import { ReadableStream, WritableStream, TransformStream } from 'stream/web';
(global as any).ReadableStream = ReadableStream;
(global as any).WritableStream = WritableStream;
(global as any).TransformStream = TransformStream;

// 3) BroadcastChannel (needed by MSW v2 core/ws)
try {
  // Node >=16: available via worker_threads
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const { BroadcastChannel } = require('worker_threads');
  if (!(global as any).BroadcastChannel) {
    (global as any).BroadcastChannel = BroadcastChannel;
  }
} catch {
  // Fallback minimal shim (sufficient for tests; no cross-thread comms)
  class DummyBC {
    name: string;
    onmessage: ((ev: any) => void) | null = null;
    constructor(name: string) { this.name = name; }
    postMessage(_: any) {}
    close() {}
    addEventListener() {}
    removeEventListener() {}
  }
  (global as any).BroadcastChannel = DummyBC as any;
}
