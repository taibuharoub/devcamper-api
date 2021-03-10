const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const colors = require("colors");
const errorHandler = require("./middleware/error")
const connectDB = require("./config/db");

//load env vars
dotenv.config({ path: "./config/config.env" });

//Connect to DB
connectDB();

//Route files
const bootcacampRoutes = require("./routes/bootcamps");

const app = express();
const PORT = process.env.PORT || 3000;

//Body Parser
// app.use(express.urlencoded({extended: true}));
app.use(express.json())


//Dev logging middleware
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

//Mount routers
app.use("/api/v1/bootcamps", bootcacampRoutes);

app.use(errorHandler)

const server = app.listen(PORT, () => {
  console.log(
    `Server Started in ${process.env.NODE_ENV} mode at http://localhost:${PORT}`
      .yellow.bold
  );
});

//Hnadle unhandled promise ejections
process.on("unhandledRejection", (err, promise) => {
  console.log(`Error: ${err.message}`.red.bold);
  //Close server & exit process
  server.close(() => {
    process.exit(1);
  });
});
