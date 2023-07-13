const express = require("express");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const userRouter = require("./routes/userRoutes");
const jobRouter = require("./routes/jobRoutes");
const app = express();
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);
app.use(helmet());

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: "Too many requests from this IP, please try again in an hour!",
});

app.use("/api", limiter);
app.use(cookieParser());
app.use(mongoSanitize());
app.use(xss());

app.use(express.json());

app.use("/api/v1/users", userRouter);
app.use("/api/v1/jobs", jobRouter);
module.exports = app;
