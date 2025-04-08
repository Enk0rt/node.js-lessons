import joi from "joi";
import { RegexEnum } from "../enums/regex.enum";
export class PizzaValidator {
    static name = joi.string().trim();
    static price = joi.string().regex(RegexEnum.PASSWORD);
    static diameter = joi.string().regex(RegexEnum.PASSWORD);
    static createPizza = joi.object({
        name: this.name.required(),
        price: this.price.required(),
        diameter: this.diameter.required(),
    });
}
