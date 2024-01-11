import { addItemToCart, addOne, deleteItem, deleteOne, getCart } from "../controllers/cart.js";
import express from "express";
import { isAuthenticated } from "../middleware/auth.js";


const cartRouter = express.Router();
cartRouter.route("/addItem").post(isAuthenticated, addItemToCart);
cartRouter.route("/addOne").post(isAuthenticated, addOne);
cartRouter.route("/deleteOne").post(isAuthenticated, deleteOne);
cartRouter.route("/deleteItem").post(isAuthenticated, deleteItem);
cartRouter.route("/").get(isAuthenticated, getCart);

export default cartRouter;