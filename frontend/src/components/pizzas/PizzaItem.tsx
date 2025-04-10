import { IPizza } from "../../interfaces/IPizza";
import { FC } from "react";

type Props ={
    pizza: IPizza;
}

export const PizzaItem:FC<Props> = ({pizza}) => {
    return (
        <div>
            {pizza.name}
            {pizza.price}
            {pizza.diameter}
        </div>
    );
};

