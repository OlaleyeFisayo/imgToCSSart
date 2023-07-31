const postSVG = async (req, res) => {
  res.send("SVG Uploaded");
};

const getOutput = async (req, res) => {
  res.send("File is made");
};

module.exports = {
  postSVG,
  getOutput,
};
