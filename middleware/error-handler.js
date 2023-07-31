const { StatusCodes } = require("http-status-codes");
const CustomAPIError = require("../error/customAPIError");

const errorHandler = async (err, req, res, next) => {
  if (err instanceof CustomAPIError) {
    return res.send(err.status).json({ msg: err.message });
  }
  return res
    .send(StatusCodes.INTERNAL_SERVER_ERROR)
    .json({ msg: "Something went wrong, please try again" });
};

module.exports = errorHandler;
