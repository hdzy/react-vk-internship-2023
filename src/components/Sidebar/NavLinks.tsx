// @ts-ignore
import styles from "./sidebar.module.css";
import {NavLink} from "react-router-dom";
import React, {FC} from "react";
import {SlBookOpen, SlPencil, SlBubbles, SlUser, SlClose, SlPeople, SlKey, SlPlus} from "react-icons/sl";

export const NavLinks: FC<{isAuthenticated: boolean, id: number | undefined, logoutUser: any}> = ({isAuthenticated, id, logoutUser}) => {
    return (
        <div className={styles.linkWrapper}>
            {
                isAuthenticated ? (
                    <>
                        <NavLink className={styles.navLink} to={`/users/${id}`}>
                            <SlUser className={styles.icon}/>
                            Мой профиль
                        </NavLink>
                        <NavLink className={styles.navLink} to={'/create'}>
                            <SlPencil className={styles.icon}/>
                            Опубликовать пост
                        </NavLink>
                        <NavLink className={styles.navLink} to={'/posts'}>
                            <SlBookOpen className={styles.icon}/>
                            Лента
                        </NavLink>
                        <NavLink className={styles.navLink} to={'/friends'}>
                            <SlPeople className={styles.icon}/>
                            Друзья [dev]
                        </NavLink>
                        <NavLink className={styles.navLink} to={'/messages'}>
                            <SlBubbles className={styles.icon}/>
                            Сообщения [dev]
                        </NavLink>
                        <NavLink to={"/register"} className={styles.navLink} style={{color: "red"}} onClick={logoutUser}>
                           <SlClose className={styles.icon}/>
                            Выйти из аккаунта
                        </NavLink>
                    </>
                ) : (
                    <>
                        <NavLink className={styles.navLink} to={'/login'}>
                        <SlKey className={styles.icon}/> Вход
                    </NavLink>
                        <NavLink className={styles.navLink} to={'/register'}>
                        <SlPlus className={styles.icon}/> Регистрация
                    </NavLink>
                    </>
                )
            }
        </div>
    );
};