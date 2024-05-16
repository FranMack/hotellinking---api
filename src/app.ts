import { MongoDataBase } from "./data";
import { envs } from "./config/envs";
import { Server } from "./presentation/server";
import { AppRoutes } from "./presentation/routes";

(async()=> {
    main();
  })();

async function main(){

    await MongoDataBase.conect({mongoUrl:envs.MONGO_URL,dbName:envs.MONGO_DB_NAME})
   const server= new Server({port:envs.PORT,routes:AppRoutes.routes})

    server.start()
  }