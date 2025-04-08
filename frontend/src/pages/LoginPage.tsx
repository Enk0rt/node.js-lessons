import { SubmitHandler, useForm } from "react-hook-form";
import { IAuth } from "../interfaces/IAuth";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHooks";
import { authActions } from "../redux/slices/authSlice";
import { Navigate, useNavigate } from "react-router-dom";

export const LoginPage = () => {

    const { register, handleSubmit } = useForm<IAuth>();
    const { error } = useAppSelector(state => state.auth);
    const dispatch = useAppDispatch();
    const navigate = useNavigate()
    const login: SubmitHandler<IAuth> = async (user) => {
        const { meta: { requestStatus } } = await dispatch(authActions.login({ user }));

        if (requestStatus === "fulfilled") {
            navigate("/pizzas")
        }
    };

    return (
        <div>
            Login Page

            <form onSubmit={handleSubmit(login)}>
                <input type="text" placeholder={"email"} {...register("email")} />
                <input type="text" placeholder={"password"} {...register("password")} />
                <button>Login</button>
                {error && <div>Username or password are incorrect</div>}
            </form>
        </div>
    );

};


export default LoginPage;