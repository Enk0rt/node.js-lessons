import joi from "joi";
export class PizzaValidator {
    static name = joi.string().min(2).max(255).trim();
    static price = joi.number().min(1).max(1_000_000);
    static diameter = joi.number().min(1).max(255);
    static createPizza = joi.object({
        name: this.name.required(),
        price: this.price.required(),
        diameter: this.diameter.required(),
    });
}
