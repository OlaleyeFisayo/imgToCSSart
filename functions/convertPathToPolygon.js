function convertPathToPolygon(pathData, svgWidth, svgHeight) {
  const pathPoints = pathData.match(/[+-]?\d+(\.\d+)?/g);
  const polygonPoints = [];

  for (let i = 0; i < pathPoints.length; i += 2) {
    const x = parseFloat(pathPoints[i]);
    const y = parseFloat(pathPoints[i + 1]);
    const xPercentage = ((x / svgWidth) * 100).toFixed(3);
    const yPercentage = ((y / svgHeight) * 100).toFixed(3);
    polygonPoints.push(`${xPercentage}% ${yPercentage}%`);
  }

  return polygonPoints.join(", ");
}

module.exports = { convertPathToPolygon };
