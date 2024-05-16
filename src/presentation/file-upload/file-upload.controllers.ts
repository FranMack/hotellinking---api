import { Response, Request } from "express";

import { error } from "console";
import { UploadedFile } from "express-fileupload";
import { FileUploadService } from "../services/file-upload.services";
import { CustomError } from "../../domain/errors/custom.errors";

export class FileUploadControllers {
  constructor(private readonly fileUploadService: FileUploadService) {}

  private handleError = (error: unknown, res: Response) => {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({ error: error.message });
    }
    console.log(`${error}`);
    return res.status(500).json({ error: "Internal server error" });
  };

  uploadFile = async (req: Request, res: Response) => {
    const { colection, id } = req.params;
    const files = req.files;
    const userId = req.body.user.id;

    try {
      if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({ error: "Not file were selected" });
      }

      const file = req.files.file as UploadedFile;

      const fileUpload = await this.fileUploadService.uploadSingle(
        file,
        colection,
        id,
        userId
      );
      res.status(200).json(fileUpload);
    } catch (error) {
      if (error instanceof CustomError) {
        return res.status(error.statusCode).json({ error: error.message });
      }
      console.log(`${error}`);
      return res.status(500).json({ error: "Internal server error" });
    }
  };

  uploadMultipleFiles = async (req: Request, res: Response) => {
    res.json("Uploded files");
  };
}
