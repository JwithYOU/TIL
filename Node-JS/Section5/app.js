const express = require("express");

const app = express();

app.use((req, res, next) => {
  console.log("In the middleware");
  res.send("Hello");
});

app.listen(3000);
