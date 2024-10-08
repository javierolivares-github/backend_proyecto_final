import { Router } from "express";
import productsControllers from "../controllers/products.controllers.js";
import { authorization, passportCall } from "../middlewares/passport.middleware.js";

const router = Router();

// GET ALL PRODUCTS
router.get("/", productsControllers.getAll);

// GET A PRODUCT BY ID
router.get("/:pid", productsControllers.getById);

// CREATE A PRODUCT
router.post("/", passportCall("jwt"), authorization(["admin", "premium"]), productsControllers.create);

// UPDATE A PRODUCT
router.put("/:pid", passportCall("jwt"), authorization(["admin", "premium"]), productsControllers.update);

// DELETE A PRODUCT
router.delete("/:pid", passportCall("jwt"), authorization(["admin", "premium"]), productsControllers.deleteOne);

export default router;