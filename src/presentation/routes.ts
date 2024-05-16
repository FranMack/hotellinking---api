import { Router } from 'express';
import { AuthRoutes } from './auth/auth.routes';
import { ProductRoutes } from './product/product.routes';
import { UserRoutes } from './user/user.routes';
import { FileUploadRoutes } from './file-upload/file-upload.routes';


export class AppRoutes{
    static get routes(): Router {

        const router = Router();

        //aca van todas las rutas
        router.use('/auth', AuthRoutes.routes );
        router.use('/product', ProductRoutes.routes );
        router.use('/user', UserRoutes.routes );
        router.use("/upload",FileUploadRoutes.routes)

        return router}

}