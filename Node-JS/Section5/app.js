const express = require("express");

const app = express();

app.use("/add-product", (req, res) => {
  console.log("In another middleware");
  res.send("add-product");
});

app.use("/", (req, res) => {
  console.log("In the middleware");
  res.send("Hello");
});

app.listen(3000);
