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

export const PostsPage = () => {
    const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
    const posts: postType[] = useSelector((state: RootState) => state.posts.posts.items);
    const tags: string[] = useSelector((state: RootState) => state.posts.tags.items);

    React.useEffect(() => {
        dispatch(fetchPosts());
        dispatch(fetchTags());
    }, [])

    return (
        <div className={styles.content}>
            <div className={styles.contentContainer}>
                <div className={styles.tagsContainer}>
                    <h2 className={styles.tagsHeader}>Теги: </h2>
                    {tags.map(tag => (
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
                        posts.map((post) => <Post key={post._id} post={post}/>)
                        :
                        <h1>Нет постов</h1>
                }
            </div>
            </div>
        </div>
    );
};