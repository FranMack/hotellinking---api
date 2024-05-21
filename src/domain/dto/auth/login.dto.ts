import { regularExps } from "../../../config";

export class LoginUserDto {
    private constructor(
        readonly email: string,
        readonly password: string,
    ) {}

    static create(object: { [key: string]: any }): [string?, LoginUserDto?] {
        const { email, password } = object;

        if (!email) {
            return ["Falta el correo electrónico", undefined];
        }
        if (!regularExps.email.test(email)) {
            return ["El correo electrónico no es válido", undefined];
        }
        if (!password) {
            return ["Falta la contraseña", undefined];
        }
        if (password.length < 6) {
            return ["La contraseña es demasiado corta", undefined];
        }

        return [undefined, new LoginUserDto(email, password)];
    }
}
