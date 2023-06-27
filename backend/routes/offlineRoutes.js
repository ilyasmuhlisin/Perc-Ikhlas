const express = require("express");
const router = express.Router();
const {
  verifyIsLoggedIn,
  verifyIsAdmin,
} = require("../middleware/verifyAuthToken");
const {
  adminDeleteFamily,
  adminUpdateUserFamily,
  getFamilyById,
  createUserFamily,
} = require("../controllers/familyController");

const {
  adminDeleteOffline,
  adminUpdateOfflineOrders,
  getOfflineOrdersById,
  adminGetOfflineOrders,
  adminCreateOfflineOrders,
} = require("../controllers/offlineController");

// user routes
router.use(verifyIsLoggedIn);
router.post("/:userId", createUserFamily);
router.get("/get-one/:id", getFamilyById);

// admin routes
router.use(verifyIsAdmin);
router.delete("/admin/:id", adminDeleteOffline);
router.get("/admin", adminGetOfflineOrders);
router.get("/admin/get-one/:id", getOfflineOrdersById);
router.post("/create/admin", adminCreateOfflineOrders);

module.exports = router;
