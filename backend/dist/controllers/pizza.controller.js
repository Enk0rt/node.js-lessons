import { StatusCodesEnum } from "../enums/status-codes.enums";
import { pizzaService } from "../services/pizza.service";
class PizzaController {
    async getAll(req, res, next) {
        try {
            const data = await pizzaService.getAll();
            res.status(StatusCodesEnum.OK).json(data);
        }
        catch (e) {
            next(e);
        }
    }
    async create(req, res, next) {
        try {
            const pizza = req.body;
            const data = await pizzaService.create(pizza);
            res.status(StatusCodesEnum.OK).json(data);
        }
        catch (e) {
            next(e);
        }
    }
}
export const pizzaController = new PizzaController();
