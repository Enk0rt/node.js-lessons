import { Pizzas } from "../components/pizzas/Pizzas";
import { PizzaCreate } from "../components/pizzas/PizzaCreate";


export const PizzasPage = () => {

    return (
        <div>
            <PizzaCreate/>
            <hr/>
           <Pizzas />
        </div>
    );
};

export default PizzasPage;