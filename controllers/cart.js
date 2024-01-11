import { User } from "../models/users.js";
import { Product } from "../models/product.js";
import { Cart } from "../models/cart.js";

export const addItemToCart = async (req, res) => {
  const { productId, userId } = req.body;
  const quantity = 1;
  console.log();
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    console.log("here");
    const product = await Product.findById(productId);
    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product doesn't exist." });
    }

    const totalPrice = product.price * quantity;

    let cart = await Cart.findOne({ userId: userId });
    if (!cart) {
      cart = new Cart({ userId: userId });
    }

    const existingCartItem = cart.items.find(
      (item) => item.product._id == productId
    );
    if (existingCartItem) {
      existingCartItem.quantity += quantity;
      existingCartItem.totalPrice += totalPrice;
    } else {
      cart.items.push({
        product: product._id,
        quantity,
        totalPrice,
      });
    }

    await cart.save();
    return res.status(200).json({
      success: true,
      message: "Item added to cart successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error });
  }
};

export const getCart = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "You must be authenticated." });
    }

    const cart = await Cart.findOne({ userId: user._id }).populate(
      "items.product",
      "name price"
    );

    if (!cart) {
      return res.status(404).json({ success: false, message: "Cart empty." });
    }

    return res.status(200).json(cart);
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error });
  }
};

export const addOne = async (req, res) => {
  try {
    const { productId } = req.body;
    const user = await User.findById(req.user._id);
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "You must be authenticated." });
    }

    let cart = await Cart.findOne({ userId: user._id }).populate(
      "items.product",
      "name price"
    );

    if (!cart) {
      return res.status(404).json({ success: false, message: "Cart empty." });
    }

    let item = cart.items.find((i) => i.product._id == productId);
    console.log(item);
    item.quantity++;
    item.totalPrice = item.quantity * item.product.price;

    await cart.save();
    res.status(200).json(item);
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error });
  }
};

export const deleteOne = async (req, res) => {
  try {
    const { productId } = req.body;
    const user = await User.findById(req.user._id);
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "You must be authenticated." });
    }

    let cart = await Cart.findOne({ userId: user._id }).populate(
      "items.product",
      "name price"
    );

    if (!cart) {
      return res.status(404).json({ success: false, message: "Cart empty." });
    }

    let item = cart.items.find((i) => i.product._id == productId);
    if (item.quantity == 1) {
      cart.items.remove(item);
    } else {
      console.log(item.product.price);
      item.quantity--;
      item.totalPrice = item.quantity * item.product.price;
    }

    await cart.save();
    res.status(200).json(item);
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error });
  }
};

export const deleteItem = async (req, res) => {
    try {
      const { productId } = req.body;
      const user = await User.findById(req.user._id);
      if (!user) {
        return res
          .status(400)
          .json({ success: false, message: "You must be authenticated." });
      }
  
      let cart = await Cart.findOne({ userId: user._id });
  
      if (!cart) {
        return res.status(404).json({ success: false, message: "Cart empty." });
      }
  
      let item = cart.items.find((i) => i.product._id == productId);
      cart.items.remove(item);
  
      await cart.save();
      res.status(200).json(item);
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: error });
    }
  };