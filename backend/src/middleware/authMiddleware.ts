import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import User from "../models/User";
import { JwtPayload } from "jsonwebtoken";

declare global {
  namespace Express {
    interface Request {
      user?: User;
    }
  }
}

export const authenticateToken = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
      res.status(401).json({ message: "No token provided" });
      return;
    }

    try {
      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET || "fallback-secret"
      ) as JwtPayload;

      const user = await User.findByPk(decoded.id);
      if (!user) {
        res.status(404).json({ message: "User not found" });
        return;
      }

      req.user = user;
      next();
    } catch (jwtError) {
      res.status(403).json({ message: "Invalid token" });
      return;
    }
  } catch (error) {
    res.status(500).json({ message: "Server error" });
    return;
  }
};
