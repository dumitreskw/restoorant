import express from "express";
import user from "./routers/user.js";
import cart from "./routers/cart.js";
import cookieParser from "cookie-parser";
import cors from "cors";

export const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use("/api/v1", user);
app.use("/api/v1/cart", cart)
app.get("/", (req, res) => {
  res.send("Server is working");
});
