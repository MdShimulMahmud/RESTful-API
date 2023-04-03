const express = require("express");
const { default: mongoose } = require("mongoose");
const multer = require("multer");
const router = express.Router();

const productController = require("../controllers/products");

const checkAuth = require("../middleware/check-auth");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, new Date().toDateString() + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
  fileFilter: fileFilter,
});

router.get("/", productController.get_all_products);

router.post(
  "/",
  checkAuth,
  upload.single("productImage"),
  productController.create_products
);

router.get("/:productId", productController.get_products);

router.patch("/:productId", checkAuth, productController.update_products);

router.delete("/:productId", checkAuth, productController.delete_products);

module.exports = router;
