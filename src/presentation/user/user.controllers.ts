import { Request, Response } from "express";
import { CustomError } from "../../domain/errors/custom.errors";
import { CreateProductDto } from "../../domain/dto/auth/product/create-product.dto";
import { UserServices } from "../services/user.services";

export class UserControllers {
  constructor(private readonly userServices: UserServices) {}

  private handleError = (error: unknown, res: Response) => {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({ error: error.message });
    }
    console.log(`${error}`);
    return res.status(500).json({ error: "Internal server error" });
  };

  addDiscount = async (req: Request, res: Response) => {
    try {
      const { productId } = req.body;
      const userId = req.body.user.id;

      const productDiscountCode = await this.userServices.addDiscount(
        productId,
        userId
      );

      res.status(200).json(productDiscountCode);
    } catch (error) {
      if (error instanceof CustomError) {
        return res.status(error.statusCode).json({ error: error.message });
      }
      console.log(`${error}`);
      return res.status(500).json({ error: "Internal server error" });
    }
  };

  discountList= async (req: Request, res: Response) =>{
    try{
      const userId=req.body.user.id
      const userDisconts= await this.userServices.discountList(userId)
      res.status(200).json(userDisconts)
    }

    catch (error) {
      if (error instanceof CustomError) {
        return res.status(error.statusCode).json({ error: error.message });
      }
      console.log(`${error}`);
      return res.status(500).json({ error: "Internal server error" });
    }
    
  }

  useDiscount=async (req: Request, res: Response) =>{
    const userId=req.body.user.id;
    const promotionalCode=req.body.promotionalCode
    try{

      const useDiscount= await this.userServices.useDiscount(userId,promotionalCode)
      res.status(200).json("Discount aply")


    }
    catch (error) {
      if (error instanceof CustomError) {
        return res.status(error.statusCode).json({ error: error.message });
      }
      console.log(`${error}`);
      return res.status(500).json({ error: "Internal server error" });
    }
  }
}
