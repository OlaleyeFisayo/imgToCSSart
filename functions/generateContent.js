const { convertPathToPolygon } = require("./convertPathToPolygon");

function generateContent(parsedSvg) {
  const width = parsedSvg.children[0].properties.viewBox
    ? parsedSvg.children[0].properties.viewBox.split(" ")[2]
    : "100%";
  const height = parsedSvg.children[0].properties.viewBox
    ? parsedSvg.children[0].properties.viewBox.split(" ")[3]
    : "100%";
  let htmlContent = '<div class="box">\n';
  let cssContent = "";

  let pathIndex = 1;

  // Recursively iterate over each node in the SVG
  function traverse(node) {
    if (node.tagName === "path") {
      // Get the color of the path (if available)
      const fill = node.properties.fill || "none";

      // Create a div element with a corresponding CSS class
      htmlContent += `<div id="el${pathIndex}"></div>\n`;

      // Create a CSS rule for the corresponding div
      cssContent += `#el${pathIndex}:before {\n`;
      cssContent += `  content: "";\n`;
      cssContent += `  clip-path: polygon(${convertPathToPolygon(
        node.properties.d,
        width,
        height
      )});\n`;
      cssContent += `  background-color: ${fill};\n`;
      cssContent += "}\n";

      pathIndex++;
    }

    if (node.children && node.children.length > 0) {
      node.children.forEach(traverse);
    }
  }

  traverse(parsedSvg);

  htmlContent += "</div>";

  return { htmlContent, cssContent };
}

module.exports = { generateContent };
