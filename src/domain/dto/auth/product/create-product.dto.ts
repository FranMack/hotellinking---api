export class CreateProductDto {
  private constructor(
      public readonly name: string,
      public readonly available: boolean,
      public readonly price: number,
      public readonly discount: number,
      public readonly description: string,
  ) {}

  static create(object: { [key: string]: any }): [string?, CreateProductDto?] {
      const { name, available = false, price, discount, description } = object;
      let availableBoolean = available;

      if (!name) {
          return ["Falta el nombre", undefined];
      }

      if (!price) {
          return ["Falta el precio", undefined];
      }

      if (!discount) {
          return ["Falta el descuento", undefined];
      }

      if (!description) {
          return ["Falta la descripción", undefined];
      }

      if (typeof available !== "boolean") {
          availableBoolean = true;
      }

      return [undefined, new CreateProductDto(name, availableBoolean, price, discount, description)];
  }
}