// @ts-ignore
import styles from "./userPage.module.css";
import {useDispatch, useSelector} from "react-redux";
import {ThunkDispatch} from "@reduxjs/toolkit";
import {postType} from "../../types/post";
import {RootState} from "../../redux/store";
import React from "react";
import {fetchUserPosts} from "../../slices/user";
import {useParams} from "react-router-dom";
import {PostInfoPost} from "./PostInfoPost";

export const PostsInfo = () => {
    const params = useParams();

    const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
    const posts: postType[] = useSelector((state: RootState) => state.user.user.posts.items);

    React.useEffect(() => {
        // @ts-ignore
        dispatch(fetchUserPosts(params.id));
    }, [])

    return (
        <div className={styles.postInfoContainer}>
            <h2 className={styles.postMainTitle}>Публикации:</h2>
            <div className={styles.postsContainer}>
                {
                    posts.map((post) => <PostInfoPost
                        key={post._id}
                        title={post.title}
                        imageUrl={post.imageUrl}
                        tags={post.tags}
                        date={post.createdAt}
                        id={post._id}
                    />)
                }
            </div>
        </div>

    );
};