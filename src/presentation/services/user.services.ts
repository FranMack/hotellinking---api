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
        throw CustomError.badRequest("Product not found");
      }
      if (!user) {
        throw CustomError.badRequest("User not found");
      }

      if (
        user.myDiscounts.find((product) => {
          return product.productId === productId;
        })
      ) {
        throw CustomError.badRequest("User have already request that discount");
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
        throw CustomError.badRequest("User not found");
      }

      return user.myDiscounts;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  useDiscount = async (userId: string, promotionalCode: string) => {
    try {
      const user = await UserModel.findById(userId);
      if (!user) {
        throw CustomError.badRequest("User not found");
      }

      console.log("xxxxxxxxxxxxxxx", promotionalCode);
      console.log("yyyyyyyyyyyyyyy", user.myDiscounts[0].promotionalCode);

      console.log(
        "zzzzzzzzzzzzzzzz",
        promotionalCode === user.myDiscounts[0].promotionalCode
      );

      if (
        !user.myDiscounts.find((item) => {
          return item.promotionalCode === promotionalCode;
        })
      ) {
        throw CustomError.badRequest("Wrong promotional code");
      }


      if ( user.myDiscounts.find((item) => {
          if (item.promotionalCode === promotionalCode && item.used===true){
            return item
            
          };
        })
      ) {
        throw CustomError.badRequest("The promotional code has already been used");
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
