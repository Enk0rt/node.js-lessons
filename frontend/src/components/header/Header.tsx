import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { authActions } from "../../redux/slices/authSlice";
import { authService } from "../../services/authService";
// @ts-ignore
import css from "./Header.module.css";
import { Link } from "react-router-dom";

export const Header = () => {
    const me = useAppSelector(state => state.auth.me);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (authService.getAccessToken() && !me) {
            dispatch(authActions.me());
        }

    }, []);

    return (
        <div className={css.header}>
            {
                me ?
                <div>
                    <p>{me.name}</p>
                </div>
                :
                (<div>
                    <Link to={'/login'}>Login</Link>
                    <Link to={'/register'}>Register</Link>
                </div>)
            }
        </div>
    );
};

