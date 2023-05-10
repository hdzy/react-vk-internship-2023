// @ts-ignore
import styles from "./post.module.css";
import React, {FC} from "react";
import {NavLink} from "react-router-dom";

export const PostUser: FC<{ username: string, userID: number, avatarUrl: string | undefined}> = ({ username, userID, avatarUrl}) => {
    return (
        <div className={styles.postUserContainer}>
            <img className={styles.userAvatar} src={avatarUrl ? "http://localhost:3000" + avatarUrl : "https://medreg-help.ru/wp-content/uploads/2021/03/unnamed.jpg"} alt={"avatar"}/>
            <NavLink style={{ textDecoration: 'none'}} to={'/users/'+userID} className={styles.postUser}>{username}</NavLink>
        </div>
    );
};