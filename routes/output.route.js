const express = require("express");
const router = express.Router();

const { uploadSVG, getOutput } = require("../controller/output.controller");

const multer = require("multer");
const upload = multer({ dest: "uploads/" });

router
  .route("/convert-to-css")
  .get(getOutput)
  .post(upload.single("svgFile"), uploadSVG);

module.exports = router;
