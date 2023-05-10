import React, {FC} from "react";

import {postType} from "../../types/post";
// @ts-ignore
import styles from "./post.module.css";
import {NavLink} from "react-router-dom";
import {PostTitle} from "./PostTitle";
import {PostUser} from "./PostUser";
import {PostTags} from "./PostTags";
import {PostDate} from "./PostDate";


export const Post: FC<{post: postType}> = ({post}) => {

    return (
        <NavLink style={{ textDecoration: 'none' }} to={'/post/'+post._id} className={styles.postContainer}>
            <PostTitle>{post.title}</PostTitle>
            <PostUser username={post.user?.nickname} userID={post.user?._id} avatarUrl={post.user?.avatarUrl}/>
            <img
                className={styles.image}
                src= {
                    !post?.imageUrl
                        ?
                        "https://plantahim.com/storage/images/IazYSkKkCK7m8VMkvPjbM7t7wuHAZYxKZGeSzhdp.jpeg"
                        :
                        `http://localhost:3000${post?.imageUrl}`
                }
                alt={"avatar"}
            />
            <PostTags tags={post.tags} key={post.toString()}/>
            <PostDate>{post.createdAt}</PostDate>
        </NavLink>
    );
};