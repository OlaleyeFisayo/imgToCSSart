const createFile = require("../functions/createFile");
const { StatusCodes } = require("http-status-codes");
const CustomAPIError = require("../error/customAPIError");

const postSVG = async (req, res) => {
  const { encodedSVG } = req.body;
  res.status(StatusCodes.CREATED).json({ msg: "Upload was Successful" });
};

const getOutput = async (req, res) => {
  res.send("File is made");
};

module.exports = {
  postSVG,
  getOutput,
};
