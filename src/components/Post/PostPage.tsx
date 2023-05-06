import React from "react";
import {useParams} from "react-router-dom";
import axios from "../../axios";
import {postType} from "../../types/post";
// @ts-ignore
import styles from "./postPage.module.css";
export const PostPage = () => {
    const params = useParams();
    const _id = params.id;

    const [data, setData] = React.useState<postType>();

    React.useEffect(() => {
        axios.get(`http://localhost:3000/posts/${_id}`)
            .then (res => {
            setData(res.data);
        })
            .catch (err => {
                console.log(err);
            })
    }, []);


    return (
        <div className={styles.content}>
            <img
                src= {
                data?.imageUrl
                    ?
                    "https://catherineasquithgallery.com/uploads/posts/2021-03/1614612233_137-p-fon-dlya-fotoshopa-priroda-209.jpg"
                    :
                    "https://catherineasquithgallery.com/uploads/posts/2021-03/1614612233_137-p-fon-dlya-fotoshopa-priroda-209.jpg"}
                 className={styles.image}
            />
            <h2 className={styles.postTitle}>{data?.title}</h2>
            <div className={styles.postUserContainer}>
                <div className={styles.userAvatar}></div>
                <h3 className={styles.postUser}>{data?.user.fullName}</h3>
            </div>
            <div className={styles.tagsContainer}>
                {
                    data?.tags.map((tag) =>
                        (
                            <p>
                                {
                                    '#' + tag
                                }
                            </p>
                        ))}
            </div>
            <p className={styles.date}>{data?.createdAt.substring(0, 10)}</p>
            <p className={styles.description}>{data?.content}</p>
            <p className={styles.views}>Просмотры: {data?.viewsCount}</p>
        </div>
    );
};