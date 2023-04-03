const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const app = express();
const mongoose = require("mongoose");
const productsRoutes = require("./api/routes/products");
const ordersRoutes = require("./api/routes/orders");
const userRoutes = require("./api/routes/users");

mongoose.connect(
  `mongodb+srv://shimulmahmud:${process.env.MONGO_PASSWORD}@rest-node-shop.6bstge4.mongodb.net/?retryWrites=true&w=majority`
);

app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );

  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, GET, DELETE,PATCH,POST");

    return res.status(200).json({});
  }
  next();
});

// handling routes
app.use("/products", productsRoutes);
app.use("/orders", ordersRoutes);
app.use("/users", userRoutes);

/// global middleware
app.use((req, res, next) => {
  const error = new Error("404 Not Found!");
  next(error);
});

app.use((error, req, res, next) => {
  res.status(404).json({
    error: {
      message: error.message,
    },
  });
});

module.exports = app;
