if (process.env.USER) require("dotenv").config();

const express = require("express");
const cors = require("cors");
const app = express();

// Routers
const moviesRouter = require("./movies/movies.router");
const theatersRouter = require("./theaters/theaters.router");
const reviewsRouter = require("./reviews/reviews.router");

const employeesRouter = require("./employees/employees.router");


// Error Handling
const notFound = require("./errors/notFound");
const errorHandler = require("./errors/errorHandler");

// Add cors
app.use(cors());
app.use(express.json());

// Setting Routers
app.use("/movies", moviesRouter);
app.use("/theaters", theatersRouter);
app.use("/reviews", reviewsRouter);

app.use("/employees", employeesRouter);


// Setting Error Handlers
app.use(notFound);
app.use(errorHandler);


module.exports = app;
