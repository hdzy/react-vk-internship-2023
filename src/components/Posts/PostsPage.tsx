// @ts-ignore
import styles from './posts.module.css';
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {ThunkDispatch} from "@reduxjs/toolkit";

import axios from "../../axios.js";

import { fetchPosts, fetchTags } from '../../slices/posts';
import {Post} from "./Post";

import { RootState } from "../../redux/store";
import {postType} from "../../types/post";
import {fetchAuthMe, selectIsAuthenticated} from "../../slices/auth";
import {Navigate} from "react-router-dom";

export const PostsPage = () => {
    const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
    let posts: postType[] = useSelector((state: RootState) => state.posts.posts.items);
    const tags: string[] = useSelector((state: RootState) => state.posts.tags.items);
    const me = useSelector((state: RootState) => state.auth.data);

    React.useEffect(() => {
        dispatch(fetchPosts());
        dispatch(fetchTags());
        dispatch(fetchAuthMe());
        }, []);

    const isAuthenticated = useSelector(selectIsAuthenticated);



    if (!window.localStorage.getItem('token') && !isAuthenticated) {
        return <Navigate to="/" />;
    }

    return (
        <div className={styles.content}>
            <div className={styles.contentContainer}>
                <div className={styles.tagsContainer}>
                    <h2 className={styles.tagsHeader}>Теги: </h2>
                    {tags.map((tag, index) => (
                        <div className={styles.tagLine} key={tag}>
                            <p className={styles.tagPrefix}>#</p>
                            <p className={styles.tag}>
                                {tag}
                            </p>
                        </div>

                    ))}
                </div>
                <div className={styles.postsContainer}>
                {
                    posts
                        ?
                        [...posts].reverse().map((post) => {
                            let friendsId: number[] = []
                            // @ts-ignore
                            post.user.friends.forEach((user) => friendsId.push(user.id));
                            // @ts-ignore
                            if (me && friendsId.includes(me._id)) {
                                return <Post key={post._id} post={post}/>
                            }
                        })
                        :
                        <h1>Нет постов</h1>
                }
            </div>
            </div>
        </div>
    );
};