// @ts-ignore
import styles from "./post.module.css";
import React, {FC} from "react";

export const PostDate: FC<{children: string}> = ({children}) => {
    return (
        <p className={styles.date}>{children.substring(0, 10)}</p>
    );
};