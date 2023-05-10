// @ts-ignore
import styles from "./userPage.module.css";
import React, {FC} from "react";
import {userType} from "../../types/post";

export const UserInfo: FC<{user: userType | null}> = ({user}) => {

    return (
        <div className={styles.infoContainer}>
            <p className={styles.info}>{user?.surname} {user?.name}</p>
            <p className={styles.info}>{user?.email}</p>
            <p className={styles.info}>{user?.city}</p>
            <p className={styles.info}>{user?.education}</p>
        </div>
    );
};