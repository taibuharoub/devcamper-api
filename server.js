const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan")

//Route files
const bootcacampRoutes = require("./routes/bootcamps");

//load env vars
dotenv.config({ path: "./config/config.env" });

const app = express();
const PORT = process.env.PORT || 3000;

//Dev logging middleware
if (process.env.NODE_ENV === "development") {
    app.use(morgan("dev"));
}

//Mount routers
app.use("/api/v1/bootcamps", bootcacampRoutes);

app.listen(PORT, () => {
  console.log(
    `Server Started in ${process.env.NODE_ENV} mode at http://localhost:${PORT}`
  );
});
