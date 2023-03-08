const express = require("express");
const router = express.Router();
const {
  verifyIsLoggedIn,
  verifyIsAdmin,
} = require("../middleware/verifyAuthToken");
const {
  adminDeleteOffline,
  adminDeleteFamily,
  adminUpdateOfflineOrders,
  adminUpdateUserFamily,
  getOfflineOrdersById, 
  createUserFamily,
  adminGetOfflineOrders,
  adminCreateOfflineOrders,
} = require("../controllers/familyController");

// user routes
router.use(verifyIsLoggedIn);
router.post("/", createUserFamily);

// admin routes
router.use(verifyIsAdmin);
router.delete("/admin/:id", adminDeleteOffline);
router.get("/admin", adminGetOfflineOrders);
router.get("/admin/get-one/:id", getOfflineOrdersById);
router.post("/admin", adminCreateOfflineOrders);

module.exports = router;
