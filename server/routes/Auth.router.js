const express = require("express");
const {
  register,
  login,
  test,
  updateProfile,
  addToCart,
  removeFromCart,
} = require("../controllers/Auth.controller.js");
const {
  requiresignIn,
  adminAccess,
} = require("../middlewares/Auth.middleware.js");

// setting up router object
const router = express.Router();

// POST : register route
router.post("/register", register);
// POST : login route
router.post("/login", login);
// POST : Update route
router.post("/update", requiresignIn, updateProfile);
// GET : test route
router.get("/test", requiresignIn, adminAccess, test);
// GET : user protected routes
router.get("/auth-user", requiresignIn, (req, res) => {
  res.status(200).send({ ok: true });
});
// GET : admin protected routes
router.get("/auth-admin", requiresignIn, adminAccess, (req, res) => {
  res.status(200).send({ ok: true });
});

// add to cart
router.post("/add-to-cart/:slug", requiresignIn, addToCart);
// remove from cart
router.post("/remove-from-cart/:slug", requiresignIn, removeFromCart);

module.exports = router;
