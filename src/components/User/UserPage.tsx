import {useDispatch, useSelector} from "react-redux";
import {ThunkDispatch} from "@reduxjs/toolkit";
import {postType, userType} from "../../types/post";
import {RootState} from "../../redux/store";
import {useParams} from "react-router-dom";
import React, {useState} from "react";
import axios from "../../axios";
import {AccountInfo} from "../Account/AccountInfo";
import {FriendsInfo} from "../Account/FriendsInfo";
import {PostsInfo} from "../Account/PostsInfo";
// @ts-ignore
import styles from "./userPage.module.css";

export const UserPage = () => {

    const params = useParams();
    const _id = params.id;
    const userData = useSelector((state: any) => state.auth.data);

    const [accountInfo, setAccountInfo] = useState<userType | null>(null);

    React.useEffect(() => {
        axios.get(`http://localhost:3000/users/${_id}`)
            .then (res => {
                setAccountInfo(res.data);
            })
            .catch (err => {
                console.log(err);
            })
    }, []);

    return (
        <>
            <div className={styles.content}>
                <h1 className={styles.title}>Информация об аккаунте</h1>
                <div className={styles.avatar} />
                <AccountInfo user={accountInfo}/>
                <FriendsInfo />
                <PostsInfo />
            </div>
        </>
    );
};