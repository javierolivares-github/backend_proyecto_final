import { Router } from "express";

import { authorization, passportCall } from "../middlewares/passport.middleware.js";
import { checkProductAndCart } from "../middlewares/checkProductAndCart.middleware.js";
import cartsControllers from "../controllers/carts.controllers.js";
import { isUserCart } from "../middlewares/isUserCart.js";
const router = Router();

// ADD PRODUCT TO CART
router.post("/:cid/product/:pid", passportCall("jwt"), authorization(["user", "premium"]), checkProductAndCart, isUserCart, cartsControllers.addProductToCart);

// UPDATE QUANTITY PRODUCT IN CART
router.put(
  "/:cid/product/:pid",
  passportCall("jwt"),
  authorization("user"),
  checkProductAndCart,
  cartsControllers.updateQuantityProductInCart
);

// DELETE PRODUCT IN CART
router.delete("/:cid/product/:pid", passportCall("jwt"), authorization(["user", "premium"]), checkProductAndCart, cartsControllers.deleteProductInCart);

// GET CART BY ID
router.get("/:cid", passportCall("jwt"), authorization(["user", "premium"]), cartsControllers.getCartById);

// DELETE CART BY ID
router.delete("/:cid", passportCall("jwt"), authorization(["user", "premium"]), cartsControllers.deleteAllProductsInCart);

// PURCHASE CART
router.get("/:cid/purchase", passportCall("jwt"), authorization(["user", "premium"]), cartsControllers.purchaseCart);

export default router;