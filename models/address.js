import mongoose from "mongoose";

export const addressSchema = new mongoose.Schema({
    phoneNumber: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    addressLine1: {
        type: String,
        required: true,
    },
    addressLine2: {
        type: String
    },
    contactPerson: {
        type: String
    }
})

export const Address = mongoose.model('Address', addressSchema);