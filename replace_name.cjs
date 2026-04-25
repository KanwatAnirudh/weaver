const fs = require('fs');
const path = require('path');

function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    if (isDirectory) {
      if (!['node_modules', '.git', 'dist'].includes(f)) {
        walkDir(dirPath, callback);
      }
    } else {
      callback(dirPath);
    }
  });
}

const targetDir = __dirname;
walkDir(targetDir, function(filePath) {
  // Only process source files
  if (!filePath.endsWith('.js') && 
      !filePath.endsWith('.jsx') && 
      !filePath.endsWith('.json') && 
      !filePath.endsWith('.md') && 
      !filePath.endsWith('.html') &&
      !filePath.endsWith('.css')) return;
      
  if (filePath.endsWith('package-lock.json')) return;

  let content = fs.readFileSync(filePath, 'utf8');
  let original = content;
  
  // Replace all variations
  content = content.replace(/Weaver/g, 'Weeaver');
  content = content.replace(/weaver/g, 'weeaver');
  content = content.replace(/WEAVER/g, 'WEEAVER');
  
  if (content !== original) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log('Updated', filePath);
  }
});
