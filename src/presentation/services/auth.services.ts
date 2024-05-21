import { bcryptAdapter, envs } from "../../config";
import { UserModel } from "../../data/mongo/models/user.model";
import { RegisterUserDto } from "../../domain/dto/auth/register.dto";
import { CustomError } from "../../domain/errors/custom.errors";
import { JWTadapter } from "../../config";
import { LoginUserDto } from "../../domain/dto/auth/login.dto";
import { EmailService } from "./email.services";

export class AuthServices {
  constructor(private readonly emailService: EmailService) {}

  regiter = async (registerUserDto: RegisterUserDto) => {
    try {
      const existUser = await UserModel.findOne({
        email: registerUserDto.email,
      });

      if (existUser) {
        throw CustomError.badRequest("Email already exist");
      }

      const newUser = await new UserModel(registerUserDto);
      //Encriptar la contraseña
      newUser.password = bcryptAdapter.hash(registerUserDto.password);
      await newUser.save();

      const token = await JWTadapter.generateJWT({
        id: newUser.id,
        email: newUser.email,
      });

      this.sendEmailValidationLink(newUser.email);

      return {
        email: newUser.email,
        name: newUser.name,
        role: newUser.role,
        id: newUser.id,
        token,
      };
    } catch (error) {
      console.log(error);

      throw error;
    }
  };

  login = async (loginDto: LoginUserDto) => {
    try {
      const user = await UserModel.findOne({
        email: loginDto.email,
      });

      if (!user) {
        throw CustomError.badRequest("Credenciales erroneas");
      }

      if (!user.emailValidated) {
        throw CustomError.badRequest("Su correo no ha sido validado");
      }

      const userValidated = await bcryptAdapter.compare(
        loginDto.password,
        user.password
      );

      if (!userValidated) {
        throw CustomError.badRequest("Credenciales erroneas");
      }

      const token = await JWTadapter.generateJWT({
        id: user.id,
        email: user.email,
      });
      if (!token) {
        throw CustomError.internalServer("Token erroneo");
      }

      return {
        email: user.email,
        name: user.name,
        role: user.role,
        id: user.id,
        token,
      };
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  private sendEmailValidationLink = async (email: string) => {
    const token = await JWTadapter.generateJWT({ email });
    if (!token) {
      throw CustomError.internalServer("Error obteniendo el token");
    }

    const link = `${envs.WEBSERVICE_URL}/auth/validate-email/${token}`;

    const html = `

    <h1>Validate your Email</h1>
    <p>Click the followieng link to validate your email</p>
    <a href="${link}">Validate your email: ${email}</a>
    
    `;

    const options = {
      to: email,
      subject: "Validate email",
      htmlBody: html,
    };

    const isSent = await this.emailService.sendEmail(options);

    if (!isSent) {
      throw CustomError.internalServer("Error al enviar el email");
    }
    return true;
  };

  public async validateEmail(token:string){


    try{
    const payload= await JWTadapter.validateJWT(token)

    if(!payload){throw CustomError.unAuthorized("Token invalido")}

    const {email}=payload as {email:string};
    if(!email){
      throw CustomError.internalServer("Email is not implemented in the token payload")
    }
    const user= await UserModel.findOne({email})

    if(!user){
      throw CustomError.internalServer("Usuario no encontrado");
    }

    user.emailValidated=true;
    await user.save();

    return user;
  }

  catch(error){
    console.log(error)
    throw error;
  }

  }

  
}
