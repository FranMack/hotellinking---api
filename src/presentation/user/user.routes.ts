import { Router } from 'express';
import { AuthServices } from '../services/auth.services';
import { EmailService } from '../services/email.services';
import { envs } from '../../config';

import { AuthMiddleware } from '../midlewares/auth.midleware';
import { UserControllers } from './user.controllers';

import { ProductControllers } from '../product/product.scontrollers';
import { UserServices } from '../services/user.services';





export class UserRoutes {

    


  static get routes(): Router {
      const router = Router();

   
      const services= new UserServices()
     
      const controller= new UserControllers(services)
    
    // Definir las rutas
  
    router.post('/add-discount',AuthMiddleware.validateJWT, controller.addDiscount );
    router.get('/discounts',AuthMiddleware.validateJWT, controller.discountList );
    router.patch('/use-discount',AuthMiddleware.validateJWT, controller.useDiscount );
  




    return router;
  }


}

