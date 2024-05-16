import { regularExps } from "../../../config";

export class RegisterUserDto{

    private constructor(
        readonly name:string,
        readonly email:string,
        readonly password:string,
    ){

    }

    static create(object:{[key:string]:any}):[string?, RegisterUserDto?]{

        const {name,email,password}=object;

        //name
        if(!name){return ["Missing name",undefined]}
        if(!regularExps.only_letters.test(name)){return ["Name should contain letters and spaces",undefined]}
        //email
        if(!email){return ["Missing email",undefined]}
        if(!regularExps.email.test(email)){return ["Email is not valid",undefined]}
        //password
        if(!password){return ["Missing password",undefined]}
        if(!regularExps.contain_special_character.test(password)){return ["Password must contain at least one special character",undefined]}
        if(!regularExps.contain_letter.test(password)){return ["Password must contain at least one lowercase letter",undefined]}
        if(!regularExps.contain_Capital_leter.test(password)){return ["Password must contain at least one capital letter",undefined]}
        if(!regularExps.contain_number.test(password)){return ["Password must contain at least one number",undefined]}
        if(password.length<6){return ["Password is too short",undefined]}
        


        return [undefined, new RegisterUserDto(name,email,password)]

    }
}