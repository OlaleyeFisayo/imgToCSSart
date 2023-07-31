require("express-async-errors");
const express = require("express");
const app = express();

const notFoundMiddleware = require("./middleware/notFound");
const errorHandlerMiddleware = require("./middleware/error-handler");
const router = require("./routes/output.route");

app.use(express.json());
app.use(express.static('./public'))

app.use("/api", router);
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = 3000 || process.env.PORT;
app.listen(port, () => {
  console.log(`server running on port http://localhost:${port}`);
});
