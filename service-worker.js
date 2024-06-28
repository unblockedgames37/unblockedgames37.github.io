importScripts('https://cdn.jsdelivr.net/npm/pako/dist/pako.min.js');

self.addEventListener('install', (event) => {
  event.waitUntil(self.skipWaiting());
});

self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', (event) => {
  // Normal fetch behavior
});

self.addEventListener('message', async (event) => {
  const { action, data } = event.data;

  if (action === 'compress') {
    try {
      const compressedData = pako.deflate(data).buffer;
      event.ports[0].postMessage({ compressedData: compressedData });
    } catch (error) {
      event.ports[0].postMessage({ error: error.message });
    }
  } else if (action === 'decompress') {
    try {
      const inflatedData = pako.inflate(data).toString('utf8');
      event.ports[0].postMessage({ inflatedData: inflatedData });
    } catch (error) {
      event.ports[0].postMessage({ error: error.message });
    }
  }
});
