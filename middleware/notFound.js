const { StatusCodes } = require("http-status-codes");

const notFound = async (req, res) =>
  res.status(StatusCodes.NOT_FOUND).send("Route does not exit");

module.exports = notFound;
