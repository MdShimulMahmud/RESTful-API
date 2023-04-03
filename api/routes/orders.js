const express = require("express");
const { default: mongoose } = require("mongoose");

const router = express.Router();
const checkAuth = require("../middleware/check-auth");
const orderController = require("../controllers/orders");

router.get("/", checkAuth, orderController.get_all_orders);

router.post("/", checkAuth, orderController.create_orders);

router.get("/:orderId", checkAuth, orderController.get_orders);

router.delete("/:orderId", checkAuth, orderController.delete_orders);

router.patch("/:orderId", checkAuth, orderController.update_orders);

module.exports = router;
