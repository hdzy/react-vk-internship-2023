import React, {FC} from "react";

import {postType, userType} from "../../types/post";
// @ts-ignore
import styles from "./post.module.css";
import {Link, NavLink} from "react-router-dom";
import {PostTitle} from "./PostTitle";
import {PostUser} from "./PostUser";
import {PostTags} from "./PostTags";
import {PostDate} from "./PostDate";


export const Post: FC<{post: postType}> = ({post}) => {
    return (
        <NavLink style={{ textDecoration: 'none' }} to={'/post/'+post._id} className={styles.postContainer}>
            <PostTitle>{post.title}</PostTitle>
            <PostUser username={post.user?.nickname} userID={post.user?._id}/>
            <img
                className={styles.image}
                src= {
                    !post?.imageUrl
                        ?
                        "https://catherineasquithgallery.com/uploads/posts/2021-03/1614612233_137-p-fon-dlya-fotoshopa-priroda-209.jpg"
                        :
                        `http://localhost:3000${post?.imageUrl}`
                }
            />
            <PostTags tags={post.tags} key={post.toString()}/>
            <PostDate>{post.createdAt}</PostDate>
        </NavLink>
    );
};