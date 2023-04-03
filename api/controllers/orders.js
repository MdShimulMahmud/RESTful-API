const Order = require("../../models/Order");
const Product = require("../../models/Product");
const { default: mongoose } = require("mongoose");
exports.get_all_orders = (req, res, next) => {
  Order.find()
    .select("product quantity _id")
    .populate("product", "name price")
    .exec()
    .then((docs) => {
      res.status(200).json({
        count: docs.length,
        orders: docs.map((doc) => {
          return {
            _id: doc._id,
            product: doc.product,
            quantity: doc.quantity,
            request: {
              type: "GET",
              url: "http://localhost:3000/orders" + doc._id,
            },
          };
        }),
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
};

exports.create_orders = (req, res, next) => {
  Product.findById(req.body.productId)
    .then((product) => {
      if (!product) {
        return res.status(404).json({
          message: "Product Not Found!",
        });
      }
      const order = new Order({
        _id: new mongoose.Types.ObjectId(),
        product: req.body.productId,
        quantity: req.body.quantity,
      });
      return order.save();
    })
    .then((result) => {
      console.log(result);
      res.status(201).json({
        message: "Order created successfully",
        createdProduct: {
          _id: result._id,
          product: result.product,
          quantity: result.quantity,
          request: {
            type: "POST",
            url: "http://localhost:3000/orders" + result._id,
          },
        },
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(203).json({
        message: "Product doesn't exist!",
        error: err,
      });
    });
};

exports.get_orders = (req, res, next) => {
  Order.findById(req.params.orderId)
    .select("product quantity _id")
    .populate("product", "name")
    .exec()
    .then((order) => {
      res.status(200).json({
        message: "Order Found!",
        order: order,
        request: {
          type: "GET",
          url: "http://localhost:3000/orders/" + order._orderId,
        },
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
};

exports.delete_orders = (req, res, next) => {
  Order.deleteOne({ _id: req.params.orderId })
    .exec()
    .then((order) => {
      if (!order) {
        return res.status(404).json({
          message: "order not found!",
        });
      }
      res.status(200).json({
        message: "Order Deleted Successfully",
        order: {
          product: "ID",
          quantity: "Number",
        },
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
};

exports.update_orders = (req, res, next) => {
  res.status(200).json({
    message: "order updated ",
    orderId: req.params.orderId,
  });
};
