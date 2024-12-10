import { Request, Response } from "express";
import { upload } from "../config/uploadConfig";

export const handleUpload = (
  req: Request,
  res: Response
): Promise<string | null> => {
  return new Promise((resolve, reject) => {
    console.log("Starting upload process, body:", req.body);

    upload.single("image")(req, res, (err) => {
      if (err) {
        console.error("Upload error:", err);
        reject(err);
        return;
      }

      console.log("Upload completed, body after upload:", req.body);
      console.log("File details:", req.file);

      resolve(req.file ? `/uploads/${req.file.filename}` : null);
    });
  });
};
