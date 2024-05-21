import { Router } from 'express';
import { AuthServices } from '../services/auth.services';
import { EmailService } from '../services/email.services';
import { envs } from '../../config';
import { ProductControllers } from './product.scontrollers';
import { ProductServices } from '../services/product.services';
import { AuthMiddleware } from '../midlewares/auth.midleware';





export class ProductRoutes {

    


  static get routes(): Router {
      const router = Router();

     // const emailService= new EmailService(envs.MAILER_SERVICE,envs.MAILER_EMAIL,envs.MAILER_SECRET_KEY)
      const services= new ProductServices()
     
      const controller= new ProductControllers(services)
    
    // Definir las rutas
  
    router.post('/add',AuthMiddleware.validateJWT, controller.createProduct );
    router.get('/list', controller.listProducts );
    router.get('/list', controller.listProducts );

    router.post('/edit', controller.createProduct );
    router.post('/delete', controller.createProduct );




    return router;
  }


}

