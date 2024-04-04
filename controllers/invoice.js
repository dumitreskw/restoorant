import { User } from "../models/users.js";
import { Cart } from "../models/cart.js";
import { Invoice } from "../models/invoice.js";

export const createInvoice = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found." });
    }

    const cart = await Cart.findOne({ userId: user._id }).populate(
      "items",
      "name price"
    );
    if (!cart) {
      return res
        .status(404)
        .json({ success: false, message: "There was an error." });
    }

    let invoice = new Invoice({ userId: req.user._id });
    invoice.totalPrice = cart.totalPrice;
    invoice.items = cart.items;

    await invoice.save();

    await Cart.deleteOne(cart._id);
    return res.status(200).json({
      invoice: invoice,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error });
  }
};

export const getInvoices = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found." });
    }

    const invoices = await Invoice.find( {userId: req.user._id});
    if (!invoices) {
      return res
        .status(404)
        .json({ success: false, message: "No invoices found." });
    }

    return res.status(200).json({
      invoices
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error });
  }
};
