const express = require("express");
const router = express.Router();

const { postSVG, getOutput } = require("../controller/output.controller");

router.route("/convert-to-css").get(getOutput).post(postSVG);

module.exports = router