import express from "express";
import { login, logout, register, verify } from "../controllers/user.js";
import { isAuthenticated } from "../middleware/auth.js";
import { getCategories, addCategory, getProductsByCategory, addProduct, updateProduct, deleteProduct, getProducts, getProductsWithCategories, getProductById } from "../controllers/product.js";

const router = express.Router();
router.route("/register").post(register);
router.route("/verify").post(isAuthenticated, verify);
router.route("/login").post(login);
router.route("/logout").post(logout);
router.route("/category").get(getCategories);
router.route("/category").post(addCategory);
router.route("/products").get(getProductsByCategory);
router.route("/products-with-categories").get(getProductsWithCategories);
router.route("/all-products").get(getProducts);
router.route("/product-by-id").post(getProductById);
router.route("/products").post(addProduct);
router.route("/products").put(updateProduct);
router.route("/delete-product").post(deleteProduct);

export default router;