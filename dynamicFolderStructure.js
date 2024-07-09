const fs = require('fs');
const path = require('path');

// Define the root directory and directories to exclude
const rootDir = './SuperMan';
const excludeDirs = [
  'node_modules',
  '.git',
  'coverage',
  'logs',
  'dist'
];

// Function to generate HTML for directory structure
const generateHtml = (dirPath, level = 0) => {
  let html = '';
  const indent = '|   '.repeat(level);

  const files = fs.readdirSync(dirPath);

  files.forEach((file, index) => {
    const filePath = path.join(dirPath, file);
    const stats = fs.statSync(filePath);
    const isLast = index === files.length - 1;

    if (stats.isDirectory() && !excludeDirs.includes(file)) {
      html += `${indent}${isLast ? '└── ' : '├── '}<strong>${file}/</strong>\n`;
      html += generateHtml(filePath, level + 1);
    } else if (!stats.isDirectory()) {
      html += `${indent}${isLast ? '└── ' : '├── '}${file}\n`;
    }
  });

  return html;
};

// Generate the HTML content
const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>SuperMan Project Structure</title>
  <style>
    body {
      font-family: 'Courier New', Courier, monospace;
      background-color: #e0e0e0;
      color: #333;
      padding: 20px;
      line-height: 1.6;
    }
    strong {
      font-weight: bold;
      color: #006699;
    }
    pre {
      background-color: #f0f0f0;
      padding: 20px;
      border-radius: 5px;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    }
  </style>
</head>
<body>
  <h1>SuperMan Project Structure</h1>
  <pre>${generateHtml(rootDir)}</pre>
</body>
</html>
`;

// Write the HTML content to a file
fs.writeFileSync('project_structure.html', htmlContent, 'utf8');

console.log('HTML file has been generated successfully.');
