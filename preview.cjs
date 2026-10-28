const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const files = { '/': ['index.html', 'text/html; charset=utf-8'], '/index.html': ['index.html', 'text/html; charset=utf-8'], '/style.css': ['style.css', 'text/css; charset=utf-8'], '/app.js': ['app.js', 'text/javascript; charset=utf-8'], '/logo-tapronto.svg': ['logo-tapronto.svg', 'image/svg+xml'] };
http.createServer((req, res) => {
  files['/theme.css'] = ['theme.css', 'text/css; charset=utf-8'];
  const file = files[new URL(req.url, 'http://127.0.0.1').pathname];
  if (!file) { res.writeHead(404); return res.end('Not found'); }
  res.writeHead(200, { 'Content-Type': file[1] });
  fs.createReadStream(path.join(__dirname, 'dist', file[0])).pipe(res);
}).listen(4175, '127.0.0.1', async () => {
  const response = await fetch('http://127.0.0.1:4175');
  console.log('Local: http://127.0.0.1:4175 — HTTP ' + response.status);
});
