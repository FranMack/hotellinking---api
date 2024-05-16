import mongoose from "mongoose";

interface Options {
  mongoUrl: string;
  dbName: string;
}

export class MongoDataBase{
    static async conect(options:Options){
        const{mongoUrl,dbName}=options

        try{
            await mongoose.connect(mongoUrl,{dbName:dbName})
            console.log("Mongo conected")
            return 

        }

        catch(error){
            console.log(error)
        }

    }

    static async disconect(){

        await mongoose.disconnect()

    }
}