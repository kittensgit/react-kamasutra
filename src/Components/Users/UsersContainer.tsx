import React from "react";
import { useSelector } from "react-redux";
//@ts-ignore
import Preloader from "../common/Preloader/Preloader.tsx";
//@ts-ignore
import { getIsFetching } from "../../redux/users-selectors.ts";
//@ts-ignore 
import { Users } from "./Users.tsx";


type UsersPagePropsType = {
    pageTitle: string
}

export const UsersPage: React.FC<UsersPagePropsType> = (props) => {

    const isFetching = useSelector(getIsFetching)

    return <>
        <h2>{props.pageTitle}</h2>
        {isFetching ? <Preloader /> : null}
        <Users />
    </>
}