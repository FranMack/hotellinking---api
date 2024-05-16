import { ProductModel } from "../../data/mongo/models/products.model";
import { UserModel } from "../../data/mongo/models/user.model";
import { CreateProductDto } from "../../domain/dto/auth/product/create-product.dto";
import { CustomError } from "../../domain/errors/custom.errors";


export class ProductServices{

    constructor(){}

    createProduct=async(createProductDto:CreateProductDto,userEmail:string)=>{

        try{

           const user= await UserModel.findOne({email:userEmail})

            if(!user){
                throw CustomError.badRequest("User not found")
            }

            if(user?.role[0]!=="ADMIN_ROLE"){
                throw CustomError.unAuthorized("Only admin are allowed to add new products")
            }

          
                

            const product= await ProductModel.findOne({name:createProductDto.name})

            if(product){
                throw CustomError.badRequest("Product already exist")
            }

            const newProduct=await ProductModel.create({...createProductDto})

            return newProduct

        }

        catch(error){
            console.log(error)
            throw error
        }

    }

    listProducts=async ()=>{
        try{

            const products= await ProductModel.find();

            return products

        }
        catch(error){
            console.log(error)
            throw error
        }
    }
}