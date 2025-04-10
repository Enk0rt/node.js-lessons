import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IPizza } from "../../interfaces/IPizza";
import { pizzaService } from "../../services/pizzaService";
import RejectedValue = jest.RejectedValue;

interface IState {
    pizzas: IPizza[];
    trigger: boolean | null;
}

const initialState: IState = { pizzas: [], trigger:null };

const getAll = createAsyncThunk<IPizza[], void>(
    'pizzaSlice/getAll',
    async (_,thunkAPI):Promise<IPizza | RejectedValue<any>> => {
        try{
            const {data} =  await pizzaService.getAll()
            return data
        }catch(e){
            return thunkAPI.rejectWithValue(e)
        }
    }
);

const create = createAsyncThunk<IPizza, { pizza: IPizza }>(
    'pizzaSlice/create',
    async ({ pizza },thunkAPI):Promise<IPizza | RejectedValue<any>> => {
        try{
            const {data} =  await pizzaService.create(pizza)
            return data
        }catch(e){
            return thunkAPI.rejectWithValue(e)
        }
    }
);

export const pizzaSlice = createSlice({
    name: "pizzaSlice",
    initialState,
    reducers: {},
    extraReducers: builder => builder
        .addCase(getAll.fulfilled, (state, action) => {
            state.pizzas = action.payload;
        })
        .addCase(create.fulfilled, (state, action) => {
            state.trigger = !state.trigger
        })
});

const {reducer: pizzaReducer, actions, } = pizzaSlice;

const pizzaActions = {
    ...actions,
    getAll,
    create
}

export{
    pizzaActions,
    pizzaReducer
}