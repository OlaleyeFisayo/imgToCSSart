const { createFile } = require("../functions/createFile");
const { StatusCodes } = require("http-status-codes");
const fs = require("fs");

const uploadSVG = async (req, res) => {
  const { originalName, path } = req.file;
  const newFileName = `${originalName}.svg`;

  const newPath = `uploads/${newFileName}`;
  fs.renameSync(path, newPath);

  res
    .status(StatusCodes.OK)
    .json({ message: "SVG file uploaded and processed successfully" });
};

const getOutput = async (req, res) => {
  const svgPath = "./uploads/undefined.svg";
  createFile(svgPath, res);
};

module.exports = {
  uploadSVG,
  getOutput,
};
