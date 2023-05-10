import React, {FC} from "react";
import { PostTags } from "../Posts/PostTags";
// @ts-ignore
import styles from "./userPage.module.css";
import {PostDate} from "../Posts/PostDate";
import {NavLink} from "react-router-dom";

export const PostInfoPost: FC<{imageUrl: string, title: string, tags: string[], date: string, id: number}> = ({imageUrl, title, tags, date, id}) => {
    return (
        <NavLink to={`/post/${id}`} style={{textDecoration: "none"}} className={styles.post}>
                <img className={styles.postImage} src= {
                    !imageUrl
                        ?
                        "https://plantahim.com/storage/images/IazYSkKkCK7m8VMkvPjbM7t7wuHAZYxKZGeSzhdp.jpeg"
                        :
                        `http://localhost:3000${imageUrl}`
                }
                      alt={title}
                />
                <h2 className={styles.postTitle}>{title}</h2>
                <PostTags tags={tags} />
                <p className={styles.date}>{date.substring(0, 10)}</p>
        </NavLink>
    );
};