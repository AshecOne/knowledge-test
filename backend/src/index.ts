import app from "./config/app";
import sequelize from "./config/database";
import authRoutes from "./routes/authRoutes";
import productRoutes from "./routes/productRoutes";
import express from "express";
import path from "path";

const PORT = process.env.PORT || 3001;
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);

const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log("Database connection has been established successfully.");

    if (process.env.NODE_ENV !== "production") {
      await sequelize.sync({ alter: true });
      console.log("Database synced");
    }

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Unable to connect to the database:", error);
    process.exit(1);
  }
};

startServer();
