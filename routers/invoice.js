import express from "express";
import { isAuthenticated } from "../middleware/auth.js";
import { createInvoice, getInvoices } from "../controllers/invoice.js";


const invoiceRouter = express.Router();
invoiceRouter.route("/createInvoice").post(isAuthenticated, createInvoice);
invoiceRouter.route("/getInvoices").get(isAuthenticated, getInvoices);

export default invoiceRouter;