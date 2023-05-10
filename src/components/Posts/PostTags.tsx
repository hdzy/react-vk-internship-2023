// @ts-ignore
import styles from "./post.module.css";
import React, {FC} from "react";

type Props = {
    onChangeText: (tag: string) => void;
    tag?: string;
}

export const PostTags: FC<{tags: string[]}> = ({tags}) => {
    return (
        <div className={styles.tagsContainer}>
            {
                tags.map((tag, index) =>
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