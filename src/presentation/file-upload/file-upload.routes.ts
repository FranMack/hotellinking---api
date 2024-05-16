import { Router } from 'express';
import { AuthMiddleware } from '../midlewares/auth.midleware';
import { FileUploadService } from '../services/file-upload.services';
import { FileUploadControllers } from './file-upload.controllers';







export class FileUploadRoutes {


  static get routes(): Router {

    const services=new FileUploadService()

    const controller=new FileUploadControllers(services);

    const router = Router();
    
    // Definir las rutas
       router.post('/single/:colection/:id',AuthMiddleware.validateJWT,controller.uploadFile );
       router.post('/multiple/:type',AuthMiddleware.validateJWT,controller.uploadMultipleFiles );



    return router;
  }


}

