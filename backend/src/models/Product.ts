import { Model, DataTypes } from "sequelize";
import sequelize from "../config/database";
import User from "./User";
import { ProductAttributes } from "../types/models";

class Product extends Model<ProductAttributes> {
  declare id: number;
  declare name: string;
  declare description: string;
  declare price: number;
  declare image: string | null;
  declare userId: number;
}

Product.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: null,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: "id",
      },
    },
  },
  {
    sequelize,
    modelName: "Product",
  }
);

export default Product;
