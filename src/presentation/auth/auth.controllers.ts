import { Request, Response } from "express";
import { RegisterUserDto } from "../../domain/dto/auth/register.dto";
import { AuthServices } from "../services/auth.services";
import { CustomError } from "../../domain/errors/custom.errors";
import { LoginUserDto } from "../../domain/dto/auth/login.dto";


export class AuthControllers{


  constructor(public readonly authService: AuthServices) {}

    private handleError = (error: unknown, res: Response) => {
        if (error instanceof CustomError) {
          return res.status(error.statusCode).json({ error: error.message });
        }
        console.log(`${error}`);
        return res.status(500).json({ error: "Internal server error" });
      };

  register= async(req: Request, res: Response)=>{

    try{

        const [error, registerDto] = RegisterUserDto.create(req.body);

    if (error) {
      return res.status(400).json({ error });
    }

    const user= await this.authService.regiter(registerDto!)

    

        return res.status(200).json(user)
    }

    catch (error) {
        if (error instanceof CustomError) {
          return res.status(error.statusCode).json({ error: error.message });
        }
        console.log(`${error}`);
        return res.status(500).json({ error: "Internal server error" });
      }

    }

    login=async(req: Request, res: Response)=>{

      try{

        const [error, loginDto] = LoginUserDto.create(req.body);
        

        if (error) {
          return res.status(400).json({ error });
        }
    
        const loggedUser= await this.authService.login(loginDto!)

        res.status(200).json(loggedUser)



      }

      catch (error) {
        if (error instanceof CustomError) {
          return res.status(error.statusCode).json({ error: error.message });
        }
        console.log(`${error}`);
        return res.status(500).json({ error: "Internal server error" });
      }

    }

    validateEmail = (req: Request, res: Response) => {
      const { token } = req.params;
  
      try {
        
          this.authService.validateEmail(token);
  
        res.json("validateEmail");
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