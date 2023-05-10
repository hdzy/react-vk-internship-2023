import React from "react";
import {Navigate, NavLink, useNavigate, useParams} from "react-router-dom";
import axios from "../../axios";
import {postType} from "../../types/post";
// @ts-ignore
import styles from "./postPage.module.css";
import {useDispatch, useSelector} from "react-redux";
import {selectIsAuthenticated} from "../../slices/auth";
import ReactMarkdown from "react-markdown";
import {fetchRemovePost} from "../../slices/posts";
export const PostPage = () => {
    const params = useParams();
    const _id = params.id;
    const userData = useSelector((state: any) => state.auth.data);

    const isAuthenticated = useSelector(selectIsAuthenticated);

    const [data, setData] = React.useState<postType>();

    const dispatch = useDispatch();

    React.useEffect(() => {
        axios.get(`http://localhost:3000/posts/${_id}`)
            .then (res => {
            setData(res.data);
        })
            .catch (err => {
                console.log(err);
            })
    }, []);

    const navigate = useNavigate();
    const removePost = () => {
        if (window.confirm("Вы действительно хотите удалить статью?")) {
            // @ts-ignore
            dispatch(fetchRemovePost(_id));
            navigate("/posts");
        }
    }

    if (!window.localStorage.getItem('token') && !isAuthenticated) {
        return <Navigate to="/" />;
    }

    return (
        <div className={styles.content}>
            <img
                src= {
                !data?.imageUrl
                    ?
                    "https://plantahim.com/storage/images/IazYSkKkCK7m8VMkvPjbM7t7wuHAZYxKZGeSzhdp.jpeg"
                    :
                    `http://localhost:3000${data?.imageUrl}`}
                 className={styles.image}
                alt={"postImage"}
            />
            <h2 className={styles.postTitle}>{data?.title}</h2>
            <div className={styles.postUserContainer}>
                <img
                    className={styles.userAvatar}
                    src={
                    data?.user.avatarUrl
                        ?
                        "http://localhost:3000" + data?.user.avatarUrl
                        :
                        "https://medreg-help.ru/wp-content/uploads/2021/03/unnamed.jpg"}
                    alt={"userAvatar"}
                />
                <NavLink
                    style={{ textDecoration: 'none', color: '#000' }}
                    to={'/users/'+data?.user._id}
                    className={styles.postUser}>{data?.user.nickname}</NavLink>
            </div>
            <div className={styles.tagsContainer}>{data?.tags.map((tag) => (<p>{'#' + tag}</p>))}
            </div>
            <p className={styles.date}>{data?.createdAt.substring(0, 10)}</p>
            <ReactMarkdown children={data?.content || ""} className={styles.description} />
            <p className={styles.views}>Просмотры: {data?.viewsCount}</p>
            <div className={styles.postFooter} style={{display: userData?._id === data?.user._id ? 'flex' : 'none'}}>
                <a className={styles.edit} href={`${_id}/edit`}>Редактировать</a>
                <p className={styles.delete} onClick={removePost}>Удалить</p>
            </div>
        </div>
    );
};