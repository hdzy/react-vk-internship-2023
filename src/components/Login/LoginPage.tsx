// @ts-ignore
import styles from '../Register/register.module.css';
// @ts-ignore
import {useForm} from "react-hook-form";
import {useDispatch, useSelector } from "react-redux";
import {fetchUserData, selectIsAuthenticated} from "../../slices/auth";
import React, {useEffect} from "react";
import { Navigate } from "react-router-dom";
import {Button, Paper, TextField, Typography } from '@mui/material';


export const LoginPage = () => {

    const isAuthenticated = useSelector(selectIsAuthenticated);

    const {
        register,
        handleSubmit,
        setError,
        formState: { errors, isValid }
    } = useForm({
        defaultValues: {
            email: '',
            password: '',
        },
        mode: "onSubmit",
    });

    const dispatch = useDispatch();

    const onSubmit = async (values: any) => {
        // @ts-ignore
        const data = await dispatch(fetchUserData(values));
        if (!data.payload) {
            alert("Неверный логин или пароль");
            return;
        }
        if ('token' in data.payload) {
            window.localStorage.setItem('token', data.payload.token);
        } else {
            alert('Не удалось авторизоваться');
        }
    };

    if (isAuthenticated) {
        return <Navigate to="/" />
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
                <Paper classes={{  root: styles.root }}>
                    <Typography classes={{ root: styles.title }} variant="h5">
                        Вход в аккаунт
                    </Typography>
                    <TextField
                        className={styles.field}
                        label="E-Mail"
                        error={Boolean(errors.email?.message)}
                        helperText={"*обязательное поле"}
                        {...register('email', {
                            required: "Укажите E-Mail",
                            pattern: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                        })}
                        fullWidth
                    />
                    <TextField
                        className={styles.field}
                        label="Пароль"
                        error={Boolean(errors.password?.message)}
                        helperText={"*обязательное поле"}
                        {...register('password', {
                            required: true,
                        })}
                        fullWidth
                    />
                    <Button classes={{root: styles.button}} size="large" variant="contained" type={"submit"} fullWidth>
                        Войти
                    </Button>
                </Paper>
</form>

    );
};