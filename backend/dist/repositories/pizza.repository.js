import { Pizza } from "../models/pizza.model";
class PizzaRepository {
    getALl() {
        return Pizza.find();
    }
    create(pizza) {
        return Pizza.create(pizza);
    }
}
export const pizzaRepository = new PizzaRepository();
