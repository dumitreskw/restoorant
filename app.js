import express from "express";
import user from "./routers/user.js";
import cart from "./routers/cart.js";
import invoice from "./routers/invoice.js";
import cookieParser from "cookie-parser";
import cors from "cors";

export const app = express();

app.use(
  cors({
    origin: "http://localhost:4200",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use("/api/v1", user);
app.use("/api/v1/cart", cart);
app.use("/api/v1/invoice", invoice);
app.get("/", (req, res) => {
  res.send("Server is working");
});
