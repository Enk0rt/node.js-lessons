import { IPizza } from "../interfaces/IPizza";
import { IResponse } from "../types/IResponse";
import { apiService } from "./apiService";
import { urls } from "../constants/urls";

export const pizzaService = {
    create(data:IPizza):IResponse<IPizza>{
        return apiService.post<IPizza>(urls.pizzas, data )
    },
    getAll():IResponse<IPizza[]>{
        return apiService.get(urls.pizzas)
    }
}