import { IsNotEmpty, Length } from "class-validator";

export default class ProductDTO {
    @IsNotEmpty()
    @Length(3, 255)
    name: string;

    @IsNotEmpty()
    @Length(3, 255)
    description: string;
}
