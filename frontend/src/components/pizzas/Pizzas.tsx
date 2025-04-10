import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { useEffect } from "react";
import { pizzaActions } from "../../redux/slices/pizzaSlice";
import { PizzaItem } from "./PizzaItem";

export const Pizzas = () => {
    const { pizzas,trigger } = useAppSelector(state => state.pizzas)
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(pizzaActions.getAll())
    }, [trigger]);
    return (
        <div>
            {
                pizzas.map(pizza => <PizzaItem key={pizza._id} pizza={pizza}/>)
            }
        </div>
    );
};

