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

    let imagePath: string | null = null;
    try {
      imagePath = await handleUpload(req, res);
    } catch (err) {
      res.status(400).json({
        message: err instanceof Error ? err.message : "Upload error",
      });
      return;
    }

    const { name, description, price } = req.body;

    const nameError = validateProductInput.name(name);
    if (nameError) {
      res.status(400).json({ message: nameError });
      return;
    }

    const descError = validateProductInput.description(description);
    if (descError) {
      res.status(400).json({ message: descError });
      return;
    }

    const priceError = validateProductInput.price(price);
    if (priceError) {
      res.status(400).json({ message: priceError });
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
    res.status(500).json({ message: "Error creating product" });
  }
};

export const updateProduct = async (
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

    let imagePath: string | null = null;
    try {
      imagePath = await handleUpload(req, res);
    } catch (err) {
      res.status(400).json({
        message: err instanceof Error ? err.message : "Upload error",
      });
      return;
    }

    const { name, description, price } = req.body;

    const updateData: Partial<typeof product> = {};

    if (name) {
      const nameError = validateProductInput.name(name);
      if (nameError) {
        res.status(400).json({ message: nameError });
        return;
      }
      updateData.name = name.trim();
    }

    if (description) {
      const descError = validateProductInput.description(description);
      if (descError) {
        res.status(400).json({ message: descError });
        return;
      }
      updateData.description = description.trim();
    }

    if (price) {
      const priceError = validateProductInput.price(price);
      if (priceError) {
        res.status(400).json({ message: priceError });
        return;
      }
      updateData.price = parseFloat(price);
    }

    if (imagePath) {
      updateData.image = imagePath;
    }

    await product.update(updateData);

    res.json({
      message: "Product updated successfully",
      product: productToResponse(product),
    });
  } catch (error) {
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
    res.status(500).json({ message: "Error deleting product" });
  }
};