import { Request, Response } from "express";
import { upload } from "../config/uploadConfig";

export const handleUpload = (
  req: Request,
  res: Response
): Promise<string | null> => {
  return new Promise((resolve, reject) => {
    upload.single("image")(req, res, (err) => {
      if (err) {
        reject(err);
      }
      resolve(req.file ? `/uploads/${req.file.filename}` : null);
    });
  });
};
