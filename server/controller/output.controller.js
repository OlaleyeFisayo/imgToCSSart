const createFile = require("../functions/createFile");
const { StatusCodes } = require("http-status-codes");
const CustomAPIError = require("../error/customAPIError");
const fs = require("fs");

const postSVG = async (req, res) => {
  const { data } = req.body;
  fs.writeFileSync("../assets/output.svg", data, (err) => {
    if (err) {
      throw new CustomAPIError(
        StatusCodes.INTERNAL_SERVER_ERROR,
        "Failed to sync files"
      );
    }
  });
  res.status(StatusCodes.ACCEPTED).json({ msg: "Upload was Successful" });
};

const getOutput = async (req, res) => {
  res.send("File is made");
};

module.exports = {
  postSVG,
  getOutput,
};
