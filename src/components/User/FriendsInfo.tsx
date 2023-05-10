// @ts-ignore
import styles from "./userPage.module.css";
import React, {FC, useEffect} from "react";
import {postType, userType} from "../../types/post";
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {ThunkDispatch} from "@reduxjs/toolkit";
import {RootState} from "../../redux/store";
import {fetchCurrentUser} from "../../slices/user";
import {fetchAuthMe} from "../../slices/auth";
import {Friend} from "./Friend";


export const FriendsInfo: FC<{user: userType | null, isFriends: boolean}> = ({user, isFriends}) => {
    const params = useParams()


    const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
    const friends: {avatar: string, nickname: string, id: string}[] = useSelector((state: RootState) => state.user.user.friends.items?.friends);

    React.useEffect(() => {
        dispatch(fetchAuthMe());
    }, [])

    React.useEffect(() => {
        // @ts-ignore
        dispatch(fetchCurrentUser(params.id));
    }, [isFriends])

    return (
        // @ts-ignore
        <div className={styles.friendsContainer}>
            <h2 className={styles.friendsTitle}>Список друзей:</h2>
            <>

            {// @ts-ignore
                !!friends ?
                    // @ts-ignore
                    friends?.map((user) => {
                        return <Friend
                            id={user.id}
                            key={user.id}
                            avatar={user.avatar}
                            nickname={user.nickname}
                        />
                    })
                    :
                    <h2>Нет друзей :(</h2>
            }
            </>
        </div>
    );
};