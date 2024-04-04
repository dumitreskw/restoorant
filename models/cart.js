import mongoose from "mongoose";

export const cartItemSchema = new mongoose.Schema({
    product: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Product',
        required: true
    },
    quantity: {
        type: Number,
        required: true,
        min: 1
    },
    totalPrice: {
        type: Number,
        required: true
    }
});

export const cartSchema = new mongoose.Schema({
    userId: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'User',
        required: true
    },
    items: [cartItemSchema], 
    totalItems: {
        type: Number,
        default: 0
    },
    totalPrice: {
        type: Number,
        default: 0
    }
})

cartSchema.pre('save', async function (next) {
    this.totalItems = 0;
    this.totalPrice = 0;

    for (const item of this.items) {
        this.totalItems += item.quantity;
        this.totalPrice += item.totalPrice;
    }

    next();
});

export const Cart = mongoose.model('Cart', cartSchema);
