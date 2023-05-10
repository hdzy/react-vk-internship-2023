// @ts-ignore
import styles from './sidebar.module.css';
import {NavLink} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {selectIsAuthenticated} from "../../slices/auth";
import { logout } from "../../slices/auth";
import React from "react";
import {userType} from "../../types/post";
import axios from "../../axios";
// @ts-ignore
import Logo from "./Logo.svg";
import {NavLinks} from "./NavLinks";
export function Sidebar() {
    const isAuthenticated = useSelector(selectIsAuthenticated);

    const [data, setData] = React.useState<userType>();

    const dispatch = useDispatch();

    React.useEffect(() => {
        axios.get(`http://localhost:3000/auth/me`)
            .then (res => {
                setData(res.data);
            })
            .catch (err => {
                console.log(err);
            })
    }, []);
    const logoutUser = () => {
        if (window.confirm("Вы действительно хотите выйти?")) {
            // @ts-ignore
            dispatch(logout());
            window.localStorage.removeItem("token");
        }
    }

    return (
        <div className={styles.sidebar}>
            <img src={Logo} alt="logo" className={styles.logo}/>
                <NavLinks id={data?._id} logoutUser={logoutUser} isAuthenticated={isAuthenticated}/>
        </div>
    );
}