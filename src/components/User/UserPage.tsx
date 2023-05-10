import {userType} from "../../types/post";
import {useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import axios from "../../axios";
import {UserInfo} from "./UserInfo";
import {FriendsInfo} from "./FriendsInfo";
import {PostsInfo} from "./PostsInfo";
// @ts-ignore
import styles from "./userPage.module.css";
import {fetchAuthMe} from "../../slices/auth";
import {useDispatch, useSelector} from "react-redux";
import {ThunkDispatch} from "@reduxjs/toolkit";
import {RootState} from "../../redux/store";

export const UserPage = () => {

    const params = useParams();
    const _id = params.id;
    const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
    const me = useSelector((state: RootState) => state.auth.data);
    const [isFriends, setIsFriends] = useState(false);

    const checkFriend = () => {
        // @ts-ignore
        for (let i=0; i < me?.friends.length; i++) {
            // @ts-ignore
            if (me?.friends[i].id === _id) {
                setIsFriends(true);
            }
            else {
                setIsFriends(false);
            }
        }
        return false;
    }
    useEffect(() => {
        checkFriend();
    }, [me]);

    useEffect(() => {
        // @ts-ignore
        dispatch(fetchAuthMe());
    }, [])

    const onSubmit = async () => {
        checkFriend();
        try {
            const {data} = !isFriends
                ?
                await axios.post(`http://localhost:3000/users/${_id}/add`)
                :
                await axios.delete(`http://localhost:3000/users/${_id}/delete`)
            setIsFriends(!isFriends);
        }
        catch (error) {
            console.log(error);
        }
    }

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
        <div className={styles.content}>
            <h1 className={styles.username}>{accountInfo?.nickname}</h1>
            <img
                className={styles.avatar}
                src={
                    accountInfo?.avatarUrl
                        ?
                        "http://localhost:3000" + accountInfo?.avatarUrl
                        :
                        "https://medreg-help.ru/wp-content/uploads/2021/03/unnamed.jpg"
                }
                alt={"avatar"}
            />
            <UserInfo user={accountInfo}/>
            <FriendsInfo user={accountInfo} isFriends={isFriends}/>
            <PostsInfo />
            {
                //@ts-ignore
                me?._id === accountInfo?._id
                    ?
                    ""
                    :
                    <button onClick={onSubmit} className={styles.addToFriend}>
                        {
                            isFriends ?
                                "Удалить из друзей"
                                :
                                "Добавить в друзья"

                        }
                    </button>
            }
        </div>
    )
};