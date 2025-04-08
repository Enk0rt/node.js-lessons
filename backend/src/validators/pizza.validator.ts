import joi from "joi";

import { RegexEnum } from "../enums/regex.enum";

export class PizzaValidator {
    private static name = joi.string().trim();
    private static price = joi.string().regex(RegexEnum.PASSWORD);
    private static diameter = joi.string().regex(RegexEnum.PASSWORD);

    public static createPizza = joi.object({
        name: this.name.required(),
        price: this.price.required(),
        diameter: this.diameter.required(),
    });
}
