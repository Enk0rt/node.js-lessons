import { SubmitHandler, useForm } from "react-hook-form";
import { IPizza } from "../../interfaces/IPizza";
import { useAppDispatch } from "../../hooks/reduxHooks";
import { pizzaActions } from "../../redux/slices/pizzaSlice";

export const PizzaCreate = () => {

    const {register, handleSubmit,reset} = useForm<IPizza>()
    const dispatch = useAppDispatch()
    const save:SubmitHandler<IPizza> = async (pizza) =>{
        dispatch(pizzaActions.create({ pizza }))
        reset()

    }

    return (
        <div>
            <form onSubmit={handleSubmit(save)}>
                <input type="text" placeholder="title" {...register('name')} />
                <input type="text" placeholder="price" {...register('price')} />
                <input type="text" placeholder="diameter" {...register('diameter')} />
                <button>Save</button>
            </form>
        </div>
    );
};

