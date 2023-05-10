// @ts-ignore
import styles from "./post.module.css";
import React, {FC} from "react";
import {Simulate} from "react-dom/test-utils";
import click = Simulate.click;
import {NavLink} from "react-router-dom";

export const PostUser: FC<{ username: string, userID: number }> = ({ username, userID}) => {
    return (
        <div className={styles.postUserContainer}>
            <div className={styles.userAvatar}></div>
            <NavLink style={{ textDecoration: 'none', color: '#000' }} to={'/users/'+userID} className={styles.postUser}>{username}</NavLink>
        </div>
    );
};