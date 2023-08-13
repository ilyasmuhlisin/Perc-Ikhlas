const express = require("express");
const router = express.Router();
const {
  verifyIsLoggedIn,
  verifyIsAdmin,
} = require("../middleware/verifyAuthToken");
const {
  getUserOrders,
  getOrder,
  createOrder,
  updateOrderToPaid,
  updateOrderToProcess,
  getOrders,
  getOrderForAnalysis,
} = require("../controllers/orderController");

// user routes
router.use(verifyIsLoggedIn);
router.get("/", getUserOrders);
router.get("/user/:id", getOrder);
router.post("/", createOrder);
router.put("/paid/:id", updateOrderToPaid);

// admin routes
router.use(verifyIsAdmin);
router.put("/process/:id", updateOrderToProcess);
router.get("/admin", getOrders);
router.get("/analysis/:date", getOrderForAnalysis);

module.exports = router;
