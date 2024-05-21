import { ProductModel } from "../../data/mongo/models/products.model";
import { UserModel } from "../../data/mongo/models/user.model";
import { CustomError } from "../../domain/errors/custom.errors";
import { Uuid } from "../../config";

export class UserServices {
  constructor() {}

  addDiscount = async (productId: string, userId: string) => {
    try {
      const product = await ProductModel.findById(productId);
      const user = await UserModel.findById(userId);
      if (!product) {
        throw CustomError.badRequest("Producto no encontrado");
      }
      if (!user) {
        throw CustomError.badRequest("Usuario no encontrado");
      }

      if (
        user.myDiscounts.find((product) => {
          return product.productId === productId;
        })
      ) {
        throw CustomError.badRequest("El usuario ya ha adquirido ese descuento");
      }

      const promotionalCode = Uuid.v4();

      user.myDiscounts.push({ productId, promotionalCode });

      await user.save();

      return { productId, promotionalCode };
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  discountList = async (userId: string) => {
    try {
      const user = await UserModel.findById(userId);
      if (!user) {
        throw CustomError.badRequest("Usuario no encontrado");
      }

        const userProductsCupons = await Promise.all(
          user.myDiscounts.map(async (item) => {
            const product = await ProductModel.findById(item.productId);
            return {
              product,
              promotionalCode: item.promotionalCode,
              used:item.used

            };
          })
        );
       


      return userProductsCupons
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  useDiscount = async (userId: string, promotionalCode: string) => {
    try {
      const user = await UserModel.findById(userId);
      if (!user) {
        throw CustomError.badRequest("Usuario no encontrado");
      }

    

      if (
        !user.myDiscounts.find((item) => {
          return item.promotionalCode === promotionalCode;
        })
      ) {
        throw CustomError.badRequest("Codigo promocional erroneo");
      }


      if ( user.myDiscounts.find((item) => {
          if (item.promotionalCode === promotionalCode && item.used===true){
            return item
            
          };
        })
      ) {
        throw CustomError.badRequest("El codigo promocional ya ha sido usado");
      }




      const discountIndex = user.myDiscounts.findIndex(
        (item) => item.promotionalCode === promotionalCode
      );
      if (discountIndex === -1) {
        throw CustomError.badRequest("Wrong promotional code");
      }

      user.myDiscounts[discountIndex].used = true;

      await user.save();

      return;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
}
