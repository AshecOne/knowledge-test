import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import User from "../models/User";
import { userToResponse } from "../types/authTypes";
import { validateUserInput } from "../validators/userValidator";

export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, password, gender } = req.body;

    const nameError = validateUserInput.name(name);
    if (nameError) {
      res.status(400).json({ message: nameError });
      return;
    }

    const emailError = validateUserInput.email(email);
    if (emailError) {
      res.status(400).json({ message: emailError });
      return;
    }

    const passwordError = validateUserInput.password(password);
    if (passwordError) {
      res.status(400).json({ message: passwordError });
      return;
    }

    const genderError = validateUserInput.gender(gender);
    if (genderError) {
      res.status(400).json({ message: genderError });
      return;
    }

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      res.status(400).json({ message: "Email already registered" });
      return;
    }

    const user = await User.create({ name, email, password, gender });
    res.status(201).json({
      message: "User registered successfully",
      user: userToResponse(user),
    });
  } catch (error) {
    res.status(500).json({ message: "Error registering user" });
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });
    if (!user || !(await user.comparePassword(password))) {
      res.status(401).json({ message: "Invalid credentials" });
      return;
    }

    const token = jwt.sign(
      { id: user.id },
      process.env.JWT_SECRET || "fallback-secret",
      { expiresIn: "24h" }
    );

    res.json({
      message: "Login successful",
      user: userToResponse(user),
      token,
    });
  } catch (error) {
    res.status(500).json({ message: "Error logging in" });
  }
};

export const getProfile = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const user = req.user;
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    res.json(userToResponse(user));
  } catch (error) {
    res.status(500).json({ message: "Error fetching profile" });
  }
};

export const updateProfile = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { name, email, gender } = req.body;
    const userId = req.user?.id;

    const nameError = validateUserInput.name(name);
    if (nameError) {
      res.status(400).json({ message: nameError });
      return;
    }

    const emailError = validateUserInput.email(email);
    if (emailError) {
      res.status(400).json({ message: emailError });
      return;
    }

    const genderError = validateUserInput.gender(gender);
    if (genderError) {
      res.status(400).json({ message: genderError });
      return;
    }

    const user = await User.findByPk(userId);
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    if (email !== user.email) {
      const existingUser = await User.findOne({ where: { email } });
      if (existingUser) {
        res.status(400).json({ message: "Email already in use" });
        return;
      }
    }

    await user.update({ name, email, gender });
    res.json({
      message: "Profile updated successfully",
      user: userToResponse(user),
    });
  } catch (error) {
    res.status(500).json({ message: "Error updating profile" });
  }
};
