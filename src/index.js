const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

dotenv.config();

const app = express();

const PORT = process.env.PORT;

app.use(bodyParser.json());
app.use(cors());

mongoose.connect(process.env.CONNECTION_STRING);

const authenticateToken = require("./middlewares/authenticateToken");

const userRoutes = require("./routes/userRoute");

app.get("/", (req, res) => {
  res.send({
    message: "Connection established",
  });
});
app.use("/auth", userRoutes);

app.listen(PORT, () => {
  console.log(`Server listenig to: ${PORT}`);
});
