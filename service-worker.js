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
  console.log('Message received:', event.data); // Log the received message
  const { action, data } = event.data;

  if (action === 'compress') {
    try {
      console.log('Compression started'); // Log the start of compression
      const compressedData = pako.deflate(data).buffer;
      console.log('Compression completed'); // Log when compression completes
      event.ports[0].postMessage({ compressedData: compressedData });
    } catch (error) {
      console.error('Compression error:', error); // Log compression errors
      event.ports[0].postMessage({ error: error.message });
    }
  } else if (action === 'decompress') {
    try {
      console.log('Decompression started'); // Log the start of decompression
      const inflatedData = pako.inflate(data).toString('utf8');
      console.log('Decompression completed'); // Log when decompression completes
      event.ports[0].postMessage({ inflatedData: inflatedData });
    } catch (error) {
      console.error('Decompression error:', error); // Log decompression errors
      event.ports[0].postMessage({ error: error.message });
    }
  }
});

