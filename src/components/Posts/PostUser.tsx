// @ts-ignore
import styles from "./post.module.css";
import React, {FC} from "react";

export const PostUser: FC<{username: string}> = ({username}) => {
    return (
        <div className={styles.postUserContainer}>
            <div className={styles.userAvatar}></div>
            <h3 className={styles.postUser}>{username}</h3>
        </div>
    );
};