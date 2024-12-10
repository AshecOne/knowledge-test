import { Request, Response } from "express";
import Product from "../models/Product";
import { productToResponse } from "../types/productTypes";
import { validateProductInput } from "../validators/productValidator";
import { handleUpload } from "../helpers/uploadHandler";

export const createProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.user?.id;

    if (!userId) {
      res.status(401).json({ message: "User not authenticated" });
      return;
    }

    // Proses upload dulu
    let imagePath: string | null = null;
    try {
      imagePath = await handleUpload(req, res);
    } catch (err) {
      res.status(400).json({
        message: err instanceof Error ? err.message : "Upload error",
      });
      return;
    }

    // Setelah upload, baru akses req.body karena data form baru tersedia
    const { name, description, price } = req.body;
    console.log("Data after upload:", { name, description, price });

    // Validasi setelah dapat data
    if (!name || name.trim().length < 3) {
      res
        .status(400)
        .json({ message: "Name must be at least 3 characters long" });
      return;
    }

    if (!description) {
      res.status(400).json({ message: "Description is required" });
      return;
    }

    if (!price || isNaN(parseFloat(price)) || parseFloat(price) <= 0) {
      res.status(400).json({ message: "Price must be a positive number" });
      return;
    }

    const product = await Product.create({
      name: name.trim(),
      description: description.trim(),
      price: parseFloat(price),
      image: imagePath,
      userId,
    });

    res.status(201).json({
      message: "Product created successfully",
      product: productToResponse(product),
    });
  } catch (error) {
    console.error("Create product error:", error);
    res.status(500).json({ message: "Error creating product" });
  }
};

export const updateProduct = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const { name, description, price } = req.body;
    const userId = req.user?.id;

    if (!userId) {
      res.status(401).json({ message: "User not authenticated" });
      return;
    }

    const product = await Product.findOne({ where: { id, userId } });
    if (!product) {
      res.status(404).json({ message: "Product not found" });
      return;
    }

    let imagePath: string | null = null;
    try {
      imagePath = await handleUpload(req, res);
    } catch (err) {
      res
        .status(400)
        .json({ message: err instanceof Error ? err.message : "Upload error" });
      return;
    }

    if (name) {
      const nameError = validateProductInput.name(name);
      if (nameError) {
        res.status(400).json({ message: nameError });
        return;
      }
    }

    if (price) {
      const priceError = validateProductInput.price(price);
      if (priceError) {
        res.status(400).json({ message: priceError });
        return;
      }
    }

    const updateData: Partial<typeof product> = {};
    if (name) updateData.name = name.trim();
    if (description) updateData.description = description.trim();
    if (price) updateData.price = parseFloat(price);
    if (imagePath) updateData.image = imagePath;

    await product.update(updateData);

    res.json({
      message: "Product updated successfully",
      product: productToResponse(product),
    });
  } catch (error) {
    console.error("Update product error:", error);
    res.status(500).json({ message: "Error updating product" });
  }
};

export const getProducts = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      res.status(401).json({ message: "User not authenticated" });
      return;
    }

    const products = await Product.findAll({
      where: { userId },
      order: [["createdAt", "DESC"]],
    });

    res.json(products.map(productToResponse));
  } catch (error) {
    console.error("Fetch products error:", error);
    res.status(500).json({ message: "Error fetching products" });
  }
};

export const deleteProduct = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const userId = req.user?.id;

    if (!userId) {
      res.status(401).json({ message: "User not authenticated" });
      return;
    }

    const product = await Product.findOne({ where: { id, userId } });
    if (!product) {
      res.status(404).json({ message: "Product not found" });
      return;
    }

    await product.destroy();
    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error("Delete product error:", error);
    res.status(500).json({ message: "Error deleting product" });
  }
};