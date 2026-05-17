// Proxy that adds COOP/COEP headers for SharedArrayBuffer (expo-sqlite web)
import http from 'node:http';

const EXPO_PORT = 4301;
const PROXY_PORT = 4300;

const proxy = http.createServer((clientReq, clientRes) => {
  // Strip origin to avoid Expo CORS middleware rejection
  const headers = { ...clientReq.headers };
  delete headers['origin'];
  delete headers['referer'];

  const options = {
    hostname: '127.0.0.1',
    port: EXPO_PORT,
    path: clientReq.url,
    method: clientReq.method,
    headers,
  };

  const proxyReq = http.request(options, (proxyRes) => {
    const resHeaders = { ...proxyRes.headers };
    // Add required headers for SharedArrayBuffer
    resHeaders['cross-origin-opener-policy'] = 'same-origin';
    resHeaders['cross-origin-embedder-policy'] = 'credentialless';
    // Allow all origins
    resHeaders['access-control-allow-origin'] = '*';

    clientRes.writeHead(proxyRes.statusCode, resHeaders);
    proxyRes.pipe(clientRes, { end: true });
  });

  proxyReq.on('error', (err) => {
    clientRes.writeHead(502);
    clientRes.end('Proxy error: ' + err.message);
  });

  clientReq.pipe(proxyReq, { end: true });
});

// Also handle WebSocket upgrades for hot reload
proxy.on('upgrade', (req, socket, head) => {
  const headers = { ...req.headers };
  delete headers['origin'];

  const options = {
    hostname: '127.0.0.1',
    port: EXPO_PORT,
    path: req.url,
    method: req.method,
    headers,
  };

  const proxyReq = http.request(options);
  proxyReq.on('upgrade', (proxyRes, proxySocket, proxyHead) => {
    socket.write(
      `HTTP/1.1 101 Switching Protocols\r\n` +
      Object.entries(proxyRes.headers).map(([k, v]) => `${k}: ${v}`).join('\r\n') +
      '\r\n\r\n'
    );
    proxySocket.write(proxyHead);
    proxySocket.pipe(socket);
    socket.pipe(proxySocket);
  });
  proxyReq.on('error', () => socket.end());
  proxyReq.end();
});

proxy.listen(PROXY_PORT, () => {
  console.log(`COOP/COEP proxy listening on :${PROXY_PORT} → Expo :${EXPO_PORT}`);
});
