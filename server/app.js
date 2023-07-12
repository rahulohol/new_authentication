const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const { connection } = require("./dbconfig/db");
const { userRouter } = require("./routes/user.route");

const app = express();

app.use(express.json());
app.use(cors());
app.use(cookieParser());

app.get("/", (req, res) => {
  res.status(201).json({ msg: "server created successfully" });
});

app.use(userRouter);

app.listen(process.env.port, async () => {
  try {
    await connection;
    console.log("Connected to database successfully");
  } catch (err) {
    console.log("error while connecting to database");
    console.log(err);
  }
  console.log(`Server listening on port ${process.env.port}`);
});
