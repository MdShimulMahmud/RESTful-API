const Product = require("../../models/Product");
const { default: mongoose } = require("mongoose");

exports.get_all_products = (req, res, next) => {
  Product.find()
    .select("name price _id productImage")
    .exec()
    .then((docs) => {
      const response = {
        count: docs.length,
        products: docs.map((doc) => {
          return {
            name: doc.name,
            price: doc.price,
            _id: doc._id,
            productImage: doc.productImage,
            request: {
              type: "GET",
              url: "http://localhost:3000/products/" + doc._id,
            },
          };
        }),
      };

      res.status(200).json(response);
    })
    .catch((err) => {
      console.log(err);
      res.status(401).json({
        error: err,
      });
    });
};

exports.create_products = (req, res, next) => {
  const product = new Product({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    price: req.body.price,
    productImage: req.file.path,
  });

  product
    .save()
    .then((result) => {
      res.status(201).json({
        message: "Products created successfully",
        createdProduct: {
          name: result.name,
          price: result.price,
          _id: result._id,
          productImage: result.productImage,
          request: {
            type: "POST",
            url: "http://localhost:3000/products/" + result._id,
          },
        },
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
};
exports.get_products = (req, res, next) => {
  const id = req.params.productId;

  Product.findById({ _id: id })
    .select("name price _id productImage")
    .exec()
    .then((doc) => {
      if (doc) {
        console.log(doc);
        res.status(200).json({
          product: doc,
          request: {
            type: "GET",
            url: "http://localhost:3000/products/" + doc._id,
          },
        });
      } else {
        res.status(404).json({
          message: "Not Valid ID , no products found by this id!",
        });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
};
exports.delete_products = (req, res, next) => {
  const id = req.params.productId;

  Product.deleteOne({ _id: id })
    .exec()
    .then((result) => {
      console.log(result);
      res.status(200).json({
        message: "Product Deleted Successfully!",
        request: {
          type: "DELETE",
          url: "http://localhost:3000/products/" + result._id,
          data: {
            name: "String",
            price: "Number",
          },
        },
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json({
        error: err,
      });
    });
};
exports.update_products = (req, res, next) => {
  const id = req.params.productId;
  const updateOps = [];
  for (const ops of req.body) {
    updateOps[ops.propName] = ops.value;
  }

  Product.updateOne({ _id: id }, { $set: { name: "MyOne HD" } })
    .exec()
    .then((result) => {
      console.log(result);
      res.status(201).json({
        message: "Product updated Successfully!",
        updatedProduct: result,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(404).json({
        error: err,
      });
    });
};
