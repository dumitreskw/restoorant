import mongoose from "mongoose";
const productSchema = new mongoose.Schema({
    index: {
        type: Number
    },
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    categoryName: {
        type: String,
        required: true
    }
})

export default productSchema;
export const Product = mongoose.model("Product", productSchema);
