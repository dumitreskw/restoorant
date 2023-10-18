import express from "express";
import user from "./routers/user.js";

export const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/v1", user);
