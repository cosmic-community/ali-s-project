const fs = require('fs');
const path = require('path');

const SCRIPT_TAG = '<script src="/dashboard-console-capture.js"></script>';

function findHtmlFiles(dir, files = []) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      findHtmlFiles(fullPath, files);
    } else if (entry.isFile() && entry.name.endsWith('.html')) {
      files.push(fullPath);
    }
  }
  return files;
}

function injectScript() {
  const outputDir = path.join(process.cwd(), '.next');
  if (!fs.existsSync(outputDir)) {
    console.log('No .next directory found, skipping console capture injection.');
    return;
  }

  const htmlFiles = findHtmlFiles(outputDir);
  let injectedCount = 0;

  for (const file of htmlFiles) {
    let content = fs.readFileSync(file, 'utf8');
    if (!content.includes('dashboard-console-capture.js') && content.includes('</head>')) {
      content = content.replace('</head>', `${SCRIPT_TAG}</head>`);
      fs.writeFileSync(file, content, 'utf8');
      injectedCount++;
    }
  }

  console.log(`Console capture script injected into ${injectedCount} file(s).`);
}

injectScript();