
export class CreateProductDto {
    private constructor(
      public readonly name: string,
      public readonly available: boolean,
      public readonly price:number,
      public readonly description:string,
      

    ) {}
  
    static create(object:{[key:string]:any}):[string?,CreateProductDto?]{
      const {name,available=false,price,description}=object;
      let availableBoolean=available
  
      if(!name){
          return ["Missing name",undefined]
      }

      if(!price){
        return ["Missing price",undefined]
    }
    if(!description){
        return ["Missing description",undefined]
    }

      if(typeof available !== "boolean"){
          availableBoolean=true
      }

      return [undefined,new CreateProductDto(name,availableBoolean,price,description,)]
  }
  }
  