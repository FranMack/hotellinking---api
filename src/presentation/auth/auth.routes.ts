import { Router } from 'express';
import { AuthControllers } from './auth.controllers';
import { AuthServices } from '../services/auth.services';
import { EmailService } from '../services/email.services';
import { envs } from '../../config';





export class AuthRoutes {

    


  static get routes(): Router {
      const router = Router();

      const emailService= new EmailService(envs.MAILER_SERVICE,envs.MAILER_EMAIL,envs.MAILER_SECRET_KEY)
      const services= new AuthServices(emailService)
     
      const controller= new AuthControllers(services)
    
    // Definir las rutas
  
    router.post('/register', controller.register );
    router.post('/login', controller.login );
    router.get('/validate-email/:token', controller.validateEmail );




    return router;
  }


}

