import { UploadedFile } from "express-fileupload";
import path from "path";
import fs from "fs";
import { Uuid } from "../../config";
import { CustomError } from "../../domain/errors/custom.errors";
import { UserModel } from "../../data/mongo/models/user.model";
import { ProductModel } from "../../data/mongo/models/products.model";
import * as cloudinary from 'cloudinary';
import { UploadApiResponse } from 'cloudinary';
import { envs } from '../../config';

// Configura Cloudinary con tu información de cuenta
cloudinary.v2.config(envs.CLOUDINARY_URL);







export class FileUploadService {
  constructor(private readonly uuid = Uuid.v4) {}

  private checkFolder(folderPath: string) {
    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath);
    }
  }
  async uploadSingle(
    file: UploadedFile,
    colection: string,
    id: string,
    userId:string,
    validExtensions: string[] = ["png", "jpg", "jpeg", "gif"]
  ) {
    try {
      let modelo;
      const user=await UserModel.findById(userId)
      if(user?.role[0]!=="ADMIN_ROLE"){
        throw CustomError.unAuthorized("Only admin are allowed to add new products")
    }

      switch (colection) {
        case "user":
          modelo = await UserModel.findById(id);
          if (!modelo) {
            throw CustomError.badRequest("User not exist");
          }

          break;

        case "product":
          modelo = await ProductModel.findById(id);
          if (!modelo) {
            throw CustomError.badRequest("Product not exist");
          }

          break;

          break;

        default:
            throw CustomError.badRequest("Wrong colection")
      }


      const fileExtension = file.mimetype.split("/").at(1) ?? "";
      if (!validExtensions.includes(fileExtension)) {
        throw CustomError.badRequest(`invalid extension ${fileExtension}`);
      }

      
      

// Sube la imagen a Cloudinary
const result:UploadApiResponse = await new Promise((resolve, reject) => {
    cloudinary.v2.uploader.upload_stream({ resource_type: "auto" }, (error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve(result!);
      }
    }).end(file.data);
  });

  if(modelo.img){
    const nombreArr=modelo.img.split("/")
    const public_id=nombreArr[nombreArr.length-1].split(".")[0]
    cloudinary.v2.uploader.destroy(public_id);
  }
  



  modelo.img= result?.secure_url

  await modelo.save()

  return result?.secure_url


 
    } catch (error) {
        console.log(error);
      throw error;
    }
  }
  uploadMultiple(
    file: any,
    folder: string = "uploads",
    validExtensions: string[] = ["png", "jpg", "jpeg", "gif"]
  ) {}
}
