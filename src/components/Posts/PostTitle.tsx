// @ts-ignore
import styles from "./post.module.css";
import React, {FC} from "react";

export const PostTitle: FC<{children: string}> = ({children}) => {
    return (
        <h2 className={styles.postTitle}>{children}</h2>
    );
};