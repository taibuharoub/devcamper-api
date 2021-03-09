const express = require("express");
const dotenv = require("dotenv");

//load env vars
dotenv.config({ path: "./config/config.env" });

const app = express();
const PORT = process.env.PORT || 3000;

app.get("/api/v1/bootcamps", (req, res, next) => {
  res.status(200).json({
    success: true,
    msg: "Show all Bootcamps",
  });
});

app.get("/api/v1/bootcamps/:id", (req, res, next) => {
    res.status(200).json({
      success: true,
      msg: `Show Bootcamp ${req.params.id}`,
    });
  });

app.post("/api/v1/bootcamps", (req, res, next) => {
  res.status(200).json({
    success: true,
    msg: "Create new Bootcamps",
  });
});

app.put("/api/v1/bootcamps/:id", (req, res, next) => {
    res.status(200).json({
      success: true,
      msg: `Update Bootcamp ${req.params.id}`,
    });
  });

app.delete("/api/v1/bootcamps/:id", (req, res, next) => {
  res.status(200).json({
    success: true,
    msg: `Delete Bootcamp ${req.params.id}`,
  });
});

app.listen(PORT, () => {
  console.log(
    `Server Started in ${process.env.NODE_ENV} mode at http://localhost:${PORT}`
  );
});
