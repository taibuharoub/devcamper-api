const path = require("path")
const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const colors = require("colors");
const fileupload = require("express-fileupload")
const cookieParser = require("cookie-parser");
const mongoSanitize = require("express-mongo-sanitize");
const helmet = require("helmet");
const xss = require("xss-clean");
const rateLimit = require("express-rate-limit");
const hpp = require("hpp");
const cors = require("cors")
const errorHandler = require("./middleware/error")
const connectDB = require("./config/db");

//load env vars
dotenv.config({ path: "./config/config.env" });

//Connect to DB
connectDB();

//Route files
const bootcacampRoutes = require("./routes/bootcamps");
const courseRoutes = require("./routes/courses")
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/users");
const reviewRoutes = require("./routes/reviews");

const app = express();
const PORT = process.env.PORT || 3000;

//Body Parser
// app.use(express.urlencoded({extended: true}));
app.use(express.json())

//Cookie Parser
app.use(cookieParser());

//Dev logging middleware
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

//File Uploading
app.use(fileupload());

//Sanitize data
app.use(mongoSanitize());

//Set security headers
app.use(helmet());

const scriptSrcUrls = [
  "https://mighty-lowlands-40859.herokuapp.com/"
]

app.use(
  helmet.contentSecurityPolicy({
      directives: {
          defaultSrc: [],
          connectSrc: ["'self'"],
          scriptSrc: ["'unsafe-inline'", "'self'", ...scriptSrcUrls],
          styleSrc: ["'self'", "'unsafe-inline'"],
          workerSrc: ["'self'", "blob:"],
          objectSrc: [],
          imgSrc: [
              "'self'",
              "blob:",
              "data:"
          ],
          fontSrc: ["'self'"],
      },
  })
);

//Prevent XSS attacks
app.use(xss());

//Rate Limiting
const limiter = rateLimit({
  windowMs: 10 * 60 * 1000, //10mins
  max: 100 // 1 for testing
})
app.use(limiter);

//Prevent http params pollution
app.use(hpp());

//Enable CORS
app.use(cors());

//Set static folder
app.use(express.static(path.join(__dirname, "public")))

//Mount routers
app.use("/api/v1/bootcamps", bootcacampRoutes);
app.use("/api/v1/courses", courseRoutes)
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/reviews", reviewRoutes);

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
