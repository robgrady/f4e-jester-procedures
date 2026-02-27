const puppeteer = require('puppeteer');
const http = require('http');
const fs = require('fs');
const path = require('path');

const OVERLAY_DIR = path.resolve(__dirname, 'overlay');
const PORT = 9847;

// Simple static file server for the overlay directory
function startServer() {
  return new Promise((resolve) => {
    const server = http.createServer((req, res) => {
      let filePath = path.join(OVERLAY_DIR, req.url === '/' ? 'print.html' : req.url);
      // Prevent directory traversal
      if (!filePath.startsWith(OVERLAY_DIR)) {
        res.writeHead(403);
        res.end();
        return;
      }

      const ext = path.extname(filePath).toLowerCase();
      const mimeTypes = {
        '.html': 'text/html',
        '.js':   'application/javascript',
        '.css':  'text/css',
        '.svg':  'image/svg+xml',
        '.png':  'image/png',
        '.jpg':  'image/jpeg',
      };

      fs.readFile(filePath, (err, data) => {
        if (err) {
          res.writeHead(404);
          res.end('Not Found');
          return;
        }
        res.writeHead(200, { 'Content-Type': mimeTypes[ext] || 'application/octet-stream' });
        res.end(data);
      });
    });

    server.listen(PORT, () => {
      console.log(`Static server running at http://localhost:${PORT}`);
      resolve(server);
    });
  });
}

(async () => {
  // Start local server so XHR requests work without CORS issues
  const server = await startServer();

  console.log('Launching headless Chromium...');
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();

  const url = `http://localhost:${PORT}/print.html`;
  console.log('Loading:', url);

  await page.goto(url, {
    waitUntil: 'networkidle0',
    timeout: 30000
  });

  // Wait for rendering to complete
  await page.waitForSelector('.procedure-page', { timeout: 15000 });

  const pageCount = await page.evaluate(() => {
    return document.querySelectorAll('.procedure-page').length;
  });
  console.log(`Rendered ${pageCount} procedure pages`);

  if (pageCount !== 17) {
    console.warn(`WARNING: Expected 17 pages, got ${pageCount}`);
  }

  // Check SVG count
  const svgCount = await page.evaluate(() => {
    return document.querySelectorAll('.svg-wrapper svg').length;
  });
  console.log(`Inlined ${svgCount} SVG diagrams`);

  const outputPath = path.resolve(__dirname, 'f4e-procedures.pdf');

  console.log('Generating PDF...');
  await page.pdf({
    path: outputPath,
    format: 'Letter',
    printBackground: true,
    margin: {
      top:    '0.5in',
      right:  '0.5in',
      bottom: '0.4in',
      left:   '0.5in'
    },
    displayHeaderFooter: false
  });

  await browser.close();
  server.close();

  console.log('PDF saved to:', outputPath);
})().catch(async (err) => {
  console.error('PDF generation failed:', err);
  process.exit(1);
});
