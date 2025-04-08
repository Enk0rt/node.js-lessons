import { pizzaRepository } from "../repositories/pizza.repository";
class PizzaService {
    getAll() {
        return pizzaRepository.getALl();
    }
    create(pizza) {
        return pizzaRepository.create(pizza);
    }
}
export const pizzaService = new PizzaService();
