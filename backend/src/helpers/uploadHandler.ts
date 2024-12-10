import { Request, Response } from "express";
import { upload } from "../config/uploadConfig";

export const handleUpload = (
  req: Request,
  res: Response
): Promise<string | null> => {
  return new Promise((resolve, reject) => {
    console.log("Starting file upload...");
    upload.single("image")(req, res, (err) => {
      if (err) {
        console.log("Upload error:", err);
        reject(err);
      }
      console.log("File upload result:", req.file);
      resolve(req.file ? `/uploads/${req.file.filename}` : null);
    });
  });
};
