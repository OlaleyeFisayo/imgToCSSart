const fs = require("fs");
const SVGParser = require("svg-parser");
const { generateContent } = require("./generateContent");

const createFile = (svgPath) => {
  fs.readFile(svgPath, "utf-8", (err, svg) => {
    if (err) {
      console.error(`Error reading input SVG file: ${err}`);
      return;
    }

    const parsedSvg = SVGParser.parse(svg);

    const { htmlContent, cssContent } = generateContent(parsedSvg);

    if (!fs.existsSync("output")) {
      fs.mkdirSync("output");
    }

    const completeHtmlContent = `<!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Document</title>
      <link rel="stylesheet" href="./index.css">
  </head>
  <body>
      ${htmlContent}
  </body>
  </html>`;

    // Write the HTML content to 'index.html' file
    fs.writeFile("Output/index.html", completeHtmlContent, (err) => {
      if (err) {
        console.error(`Error writing index.html file: ${err}`);
        return;
      }

      console.log(`HTML content saved to 'Output/index.html'`);
    });

    const width = parsedSvg.children[0].properties.viewBox
      ? parsedSvg.children[0].properties.viewBox.split(" ")[2]
      : "100%";
    const height = parsedSvg.children[0].properties.viewBox
      ? parsedSvg.children[0].properties.viewBox.split(" ")[3]
      : "100%";

    const cssTemplate = `    
    body {
      background-color: #000;
    }
    
    .box {
      margin: auto;
      display: grid;
      position: relative;
      width: ${width}px;
      height: ${height}px;
      overflow: hidden;
    }
    
    .box * {
      grid-area: 1/1;
      display: inherit;
      transform: translate(0);
    }

    div *:before,
    div *:after {
      grid-area: 1/1;
    }
  
    ${cssContent}`;

    // Write the CSS content to 'index.css' file
    fs.writeFile("Output/index.css", cssTemplate, (err) => {
      if (err) {
        console.error(`Error writing index.css file: ${err}`);
        return;
      }

      console.log(`CSS content saved to 'Output/index.css'`);
    });
  });
};

module.exports = { createFile };
