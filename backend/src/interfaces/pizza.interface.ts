import { BaseInterface } from "./base.interface";

interface IPizza extends BaseInterface {
    _id: string;
    name: string;
    price: number;
    diameter: number;
}

interface IPizzaQuery {
    pageSize: number;
    page: number;
    name?: string;
    price?: number;
    diameter?: number;
    order?: string;
}
type IPizzaCreateDTO = Pick<IPizza, "name" | "price" | "diameter">;

export type { IPizza, IPizzaCreateDTO, IPizzaQuery };
