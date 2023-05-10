// @ts-ignore
import styles from "./userPage.module.css";
import {FC} from "react";
import {NavLink} from "react-router-dom";

export const Friend: FC<{ avatar: string, id: string, nickname: string }> = ({ avatar, id, nickname }) => {
    return (
        <NavLink style={{textDecoration: "none"}} to={`/users/${id}`} className={styles.friendBlock} reloadDocument>
            <img className={styles.friendAvatar} src={
                avatar ?
                `http://localhost:3000${avatar}`
                    :
                    "https://medreg-help.ru/wp-content/uploads/2021/03/unnamed.jpg"
            } alt={nickname} />
            <span className={styles.nickname}>{nickname}</span>
        </NavLink>
    );
};