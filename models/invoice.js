import mongoose from "mongoose";
import { cartItemSchema, cartSchema } from "./cart.js";
import { InvoiceStatus } from "../constants/invoice.js";

const invoiceSchema = new mongoose.Schema({
    userId: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'User',
        required: true
    },
    items: [cartItemSchema], 
    totalPrice: {
        type: Number,
        default: 0
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    status: {
        type: String,
        default: InvoiceStatus.Paid
    }
})

export const Invoice = mongoose.model("Invoice", invoiceSchema);