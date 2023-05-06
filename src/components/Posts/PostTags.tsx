// @ts-ignore
import styles from "./post.module.css";
import React, {FC} from "react";

export const PostTags: FC<{tags: string[]}> = ({tags}) => {
    return (
        <div className={styles.tagsContainer}>
            {
                tags.map((tag) =>
                    (
                        <p style={{textTransform: "lowercase"}}>
                            {
                                '#' + tag
                            }
                        </p>
                    ))}
        </div>
    );
};