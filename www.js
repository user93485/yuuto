const path = require('path');
let file = path.join('www', ...context.path);
if (!/\..{0,4}$/.test(path)) {
  file += '.html';
  try {
    const body = require('fs').readFileSync(file);
    return {
      headers: {'Content-Type': 'text/html'},
      statusCode: 202,
      body,
    };
  } catch (e) {}
}
return {
  headers: {'Content-Type': 'text/html'},
  statusCode: 404,
  body: Buffer.from('<html><body>Not found</body></html>'),
};
