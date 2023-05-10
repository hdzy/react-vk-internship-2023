// @ts-ignore
import styles from './register.module.css';
// @ts-ignore
import {useForm} from "react-hook-form";
import {useDispatch, useSelector } from "react-redux";
import {fetchRegister, selectIsAuthenticated} from "../../slices/auth";
import React from "react";
import { Navigate } from "react-router-dom";
import axios from "../../axios";
import {Avatar, Button, Paper, TextField, Typography} from "@mui/material";


export const RegisterPage = () => {

    const isAuthenticated = useSelector(selectIsAuthenticated);
    const [imageUrl, setImageUrl] = React.useState("");


    const {
        register,
        handleSubmit,
        setError,
        formState: { errors, isValid }
    } = useForm({
        defaultValues: {
            name: '',
            surname: '',
            nickname: '',
            education: '',
            city: '',
            email: '',
            password: '',
        },
        values: {
            avatarUrl: imageUrl,
        },
        mode: "onSubmit",
    });

    const dispatch = useDispatch();

    const onSubmit = async (values: any) => {
        // @ts-ignore
        const data = await dispatch(fetchRegister(values));
        if ('token' in data.payload) {
            window.localStorage.setItem('token', data.payload.token);
        } else {
            alert('Не удалось зарегистрироваться');
        }
    };

    if (isAuthenticated) {
        return <Navigate to="/" />
    }

    const handleChangeFile = async (event: any) => {
        try {
            const formData = new FormData();
            formData.append('image', event.target.files[0]);
            const {data} = await axios.post('/upload', formData);
            setImageUrl(data.url);
        }
        catch (error) {
            console.log(error);
            alert('Ошибка при загрузке файла');
        }
    };

    return (
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <Paper classes={{ root: styles.root }}>
            <Typography classes={{ root: styles.title }} variant="h5">
                Создание аккаунта
            </Typography>
            <div className={styles.avatar}>
                <input id={'image'} type={"file"} onChange={handleChangeFile}/>
            </div>
            <TextField className={styles.field}
                       label="Никнейм"
                       error={Boolean(errors.nickname?.message)}
                       helperText={"*обязательное поле"}
                       {...register('nickname', {
                           required: "Укажите E-Mail",
                       })}
                       fullWidth
            />
            <TextField className={styles.field}
                       label="Имя"
                       error={Boolean(errors.nickname?.message)}
                       helperText={"*обязательное поле"}
                       {...register('name', {
                           required: "Укажите имя",
                       })}
                       fullWidth />
            <TextField className={styles.field}
                       label="Фамилия"
                       error={Boolean(errors.nickname?.message)}
                       helperText={"*обязательное поле"}
                       {...register('surname', {
                           required: "Укажите фамилию",
                       })}
                       fullWidth />
            <TextField className={styles.field}
                       label="Город"
                       error={Boolean(errors.nickname?.message)}
                       helperText={"*обязательное поле"}
                       {...register('city', {
                           required: "Укажите город",
                       })}
                       fullWidth />
            <TextField className={styles.field}
                       label="Образование"
                       error={Boolean(errors.nickname?.message)}
                       helperText={"*обязательное поле"}
                       {...register('education', {
                           required: "Укажите образование",
                       })}
                       fullWidth />
            <TextField className={styles.field}
                       label="Электронная почта"
                       error={Boolean(errors.nickname?.message)}
                       helperText={"*обязательное поле"}
                       {...register('email', {
                           required: "Укажите электронную почту",
                           pattern: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                       })}
                       fullWidth />
            <TextField className={styles.field}
                       label="Пароль"
                       error={Boolean(errors.nickname?.message)}
                       helperText={"*обязательное поле"}
                       {...register('password', {
                           required: "Укажите пароль",
                       })}
                       fullWidth />
            <Button classes={{root: styles.button}} type={"submit"} size="large" variant="contained" fullWidth>
                Зарегистрироваться
            </Button>
        </Paper>
        </form>
    );
};