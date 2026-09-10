// Haven 本地预览服务器：node server.js 后访问 http://localhost:3000
// 想让同一 Wi-Fi 的朋友访问：node server.js --lan
const http = require('http');
const fs = require('fs');
const path = require('path');
const os = require('os');

const root = __dirname;
const LAN = process.argv.includes('--lan');
const HOST = process.env.HOST || (LAN ? '0.0.0.0' : '127.0.0.1');
const types = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
  '.map': 'application/json'
};

function tryListen(server, port, attempt) {
  server.once('error', (err) => {
    if (err.code === 'EADDRINUSE' && attempt < 10) {
      console.log(`端口 ${port} 被占用，尝试 ${port + 1} …`);
      tryListen(server, port + 1, attempt + 1);
    } else {
      console.error('启动失败：', err.message);
      process.exit(1);
    }
  });
  server.listen(port, HOST, () => {
    console.log('');
    console.log('  Haven 预览已启动');
    console.log(`  ➜  本机打开： http://localhost:${port}`);
    if (LAN) {
      const ips = [];
      const ifaces = os.networkInterfaces();
      Object.keys(ifaces).forEach((name) => {
        (ifaces[name] || []).forEach((info) => {
          if (info.family === 'IPv4' && !info.internal) ips.push(info.address);
        });
      });
      if (ips.length) {
        console.log('  ➜  同一 Wi-Fi 的朋友打开： ' + ips.map((ip) => `http://${ip}:${port}`).join('  '));
      }
      console.log('  ⚠  局域网是 http，浏览器会禁用“定位”；朋友可手动选择城市，其余功能正常。');
    }
    console.log('  按 Ctrl+C 可停止服务器');
    console.log('');
  });
}

const server = http.createServer((req, res) => {
  let urlPath;
  try {
    urlPath = decodeURIComponent((req.url || '/').split('?')[0]);
  } catch (e) {
    res.writeHead(400);
    return res.end('Bad Request');
  }
  if (urlPath === '/') urlPath = '/index.html';
  if (urlPath.split('/').some((seg) => seg.startsWith('.'))) {
    res.writeHead(403);
    return res.end('Forbidden');
  }

  const file = path.normalize(path.join(root, urlPath));
  if (!file.startsWith(root)) {
    res.writeHead(403);
    return res.end('Forbidden');
  }

  fs.readFile(file, (err, data) => {
    if (err) {
      res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
      return res.end('404 Not Found: ' + urlPath);
    }
    const ext = path.extname(file).toLowerCase();
    res.writeHead(200, { 'Content-Type': types[ext] || 'application/octet-stream' });
    res.end(data);
  });
});

const startPort = parseInt(process.env.PORT, 10) || 3000;
tryListen(server, startPort, 0);
