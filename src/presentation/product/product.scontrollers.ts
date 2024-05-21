import { Request, Response } from "express";
import { CustomError } from "../../domain/errors/custom.errors";
import { ProductServices } from "../services/product.services";
import { CreateProductDto } from "../../domain/dto/auth/product/create-product.dto";

export class ProductControllers {
  constructor(private readonly productService: ProductServices) {}


  createProduct = async (req: Request, res: Response) => {
    try {
      const userEmail = req.body.user.email;

      const [error, createProductDto] = CreateProductDto.create(req.body);

      if (error) {
        return res.status(400).json({ error });
      }

      const product = await this.productService.createProduct(
        createProductDto!,
        userEmail
      );

      res.status(200).json(product);
    } catch (error) {
      if (error instanceof CustomError) {
        return res.status(error.statusCode).json({ error: error.message });
      }
      console.log(`${error}`);
      return res.status(500).json({ error: "Internal server error" });
    }
  };

  editProduct = (req: Request, res: Response)  => {
    res.json("Product edited");
  };
  deleteProduct = (req: Request, res: Response)  => {
    res.json("Product deleted");
  };

  listProducts = async (req: Request, res: Response)  => {
    try {
      const products = await this.productService.listProducts();
      res.status(200).json(products);
    } catch (error) {
      if (error instanceof CustomError) {
        return res.status(error.statusCode).json({ error: error.message });
      }
      console.log(`${error}`);
      return res.status(500).json({ error: "Internal server error" });
    }
  };




}
