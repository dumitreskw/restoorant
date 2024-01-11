import mongoose from "mongoose";
import productSchema from "./product.js";
const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    products: [productSchema]
});

export const Category = mongoose.model("Category", categorySchema);
