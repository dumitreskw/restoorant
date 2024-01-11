import { Category } from "../models/category.js";
import { Product } from "../models/product.js";

export const getCategories = async (req, res) => {
  const categories = await Category.find();

  if (categories.length < 1) {
    return res.status(400).json({
      success: false,
      message: "No categories are existent",
    });
  }
  const categoriesByName = categories.map((c) => c.name);

  return res.status(200).json({
    success: true,
    categories: categoriesByName,
  });
};

export const addCategory = async (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({
      success: false,
      message: "Name should be specified",
    });
  }

  try {
    let category = await Category.findOne({ name });
    if (category) {
      return res.status(400).json({
        success: false,
        message: "Category already exists",
      });
    }

    category = await Category.create({
      name,
      products: [],
    });

    return res.status(200).json({
      success: true,
      message: "Category added",
    });
  } catch (error) {
    console.log("here");
    return res.status(500).json({
      success: false,
      message: error,
    });
  }
};

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find();

    if (!products) {
      return res.status(400).json({
        success: false,
        message: "No products are available, please add one",
      });
    }

    return res.status(200).json({
      success: true,
      products: products,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error,
    });
  }
};

export const getProductsWithCategories = async (req, res) => {
  try {
    const categories = await Category.find();

    if (categories.length < 1) {
      return res.status(400).json({
        success: false,
        message: "No categories are existent",
      });
    }
    let categoriesWithProducts = [];
    categories.forEach((c) => {
      categoriesWithProducts.push({
        category: c.name,
        products: c.products,
      });
    });

    return res.status(200).json({
      success: true,
      categories: categoriesWithProducts,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error,
    });
  }
};

export const getProductsByCategory = async (req, res) => {
  const { categoryName } = req.body;
  try {
    const category = await Category.findOne({ name: categoryName });
    if (!category) {
      return res.status(400).json({
        success: false,
        message: "Category does not exist",
      });
    }

    const products = category.products;

    return res.status(200).json({
      success: true,
      products: products,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error,
    });
  }
};

export const addProduct = async (req, res) => {
  const { name, price, description, quantity, categoryName } = req.body;
  console.log(req.body);
  if (!name || !price || !description || !categoryName) {
    return res.status(400).json({
      success: false,
      message: "All fields are required.",
    });
  }

  try {
    let category = await Category.findOne({ name: categoryName });

    if (!category) {
      category = await Category.create({
        name: categoryName,
        products: [],
      });
    }

    const id = await Product.countDocuments();

    const product = await Product.create({
      name: name,
      price: Number(price),
      description: description,
      quantity: 23,
      categoryName: categoryName,
      index: id,
    });

    category.products.push(product);
    await category.save();

    return res.status(200).json({
      success: true,
      message: "Product added successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error,
    });
  }
};

export const updateProduct = async (req, res) => {
  const { name, price, description, quantity, id } = req.body;

  if (!id) {
    return res.status(400).json({
      success: false,
      message: "Product does not exist",
    });
  }

  try {
    const product = await Product.findOne({ _id: id });

    if (name) {
      product.name = name;
    }

    if (price) {
      product.price = price;
    }

    if (description) {
      product.description = description;
    }

    let category = await Category.findOne({ name: product.categoryName });
    let productsInCategory = category.products;
    const productIndex = productsInCategory.findIndex((i) => i._id == id);
    productsInCategory[productIndex] = product;
    console.log(productsInCategory);

    await product.save();
    await category.save();

    return res.status(200).json({
      success: true,
      product: product,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error,
    });
  }
};

export const deleteProduct = async (req, res) => {
  const { id } = req.body;

  if (!id) {
    return res.status(400).json({
      success: false,
      message: "Product does not exist",
    });
  }

  try {
    const product = await Product.findOne({ _id: id });
    let category = await Category.findOne({ name: product.categoryName });
    await Product.deleteOne({ _id: id });

    let productsInCategory = category.products;
    const productIndex = productsInCategory.findIndex((i) => i._id == id);
    productsInCategory.splice(productIndex, 1);

    await category.save();

    return res.status(200).json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error,
    });
  }
};

export const getProductById = async (req, res) => {
  try {
    const { id } = req.body;
    const product = await Product.findOne({_id : id});

    if (!product) {
      return res.status(400).json({
        success: false,
        message: "Product not found",
      });
    }

    return res.status(200).json({
      success: true,
      product: product,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error,
    });
  }
};
