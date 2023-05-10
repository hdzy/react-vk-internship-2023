// @ts-ignore
import styles from './register.module.css';
// @ts-ignore
import {useForm} from "react-hook-form";
import {useDispatch, useSelector } from "react-redux";
import {fetchRegister, selectIsAuthenticated} from "../../slices/auth";
import React, {useEffect} from "react";
import { Navigate } from "react-router-dom";


export const RegisterPage = () => {

    const isAuthenticated = useSelector(selectIsAuthenticated);

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
        return <Navigate to="/account" />
    }

    return (
        <div className={styles.content}>
            <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
                <h2 className={styles.title}>Регистрация</h2>
                <label className={styles.label} htmlFor={'nickname'}>Никнейм:</label>
                <input className={styles.input} id={'nickname'} {...register('nickname', { required: "Укажите полное имя"})} />
                <label className={styles.label} htmlFor={'name'}>Имя:</label>
                <input className={styles.input} id={'name'} {...register('name', { required: "Укажите полное имя"})} />
                <label className={styles.label} htmlFor={'surname'}>Фамилия:</label>
                <input className={styles.input} id={'surname'} {...register('surname', { required: "Укажите полное имя"})} />
                <label className={styles.label} htmlFor={'email'}>Почта:</label>
                <input className={styles.input} id={'email'} {...register('email', { required: "Укажите почту"})} />
                <label className={styles.label} htmlFor={'email'}>Пароль:</label>
                <input className={styles.input} id={'password'} {...register('password', { required: "Укажите пароль" })} />
                <label className={styles.label} htmlFor={'city'}>Город:</label>
                <input className={styles.input} id={'city'} {...register('city', { required: "Укажите почту"})} />
                <label className={styles.label} htmlFor={'education'}>Образование:</label>
                <input className={styles.input} id={'education'} {...register('education', { required: "Укажите пароль" })} />
                <button className={styles.button} type={'submit'}>Зарегистрироваться</button>
            </form>
        </div>
    );
};