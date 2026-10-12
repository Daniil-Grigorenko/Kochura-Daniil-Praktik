const fs = require('fs');
const path = require('path');

const emojiRegex = /[\u2600-\u26FF\u2700-\u27BF\u1F300-\u1F5FF\u1F600-\u1F64F\u1F680-\u1F6FF\u1F900-\u1F9FF]/g;

function scanDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      scanDir(fullPath);
    } else if (stat.isFile() && (fullPath.endsWith('.jsx') || fullPath.endsWith('.js') || fullPath.endsWith('.css') || fullPath.endsWith('.html'))) {
      let content = fs.readFileSync(fullPath, 'utf-8');
      if (emojiRegex.test(content)) {
        content = content.replace(emojiRegex, '');
        fs.writeFileSync(fullPath, content, 'utf-8');
        console.log(`Removed emojis from ${fullPath}`);
      }
    }
  }
}

scanDir(path.join(__dirname, 'src'));
