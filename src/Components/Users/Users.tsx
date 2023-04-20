import React, { FC } from 'react';
import Paginator from '../common/Paginator/Paginator.tsx';
import User from './User.tsx';
import { UserType } from '../../types/types';

type PropsType = {
    currentPage: number
    totalUsersCount: number
    pageSize: number
    onPageChanged: (pageNumber: number) => void
    users: Array<UserType>
    followingInProgress: Array<number>
    follow: (userId: number) => void
    unfollow: (userId: number) => void
}

const Users: FC<PropsType> = ({ currentPage, totalUsersCount, pageSize, onPageChanged, users, ...props}) => {

    return (<div>
        <Paginator currentPage={currentPage} onPageChanged={onPageChanged}
            totalItemsCount={totalUsersCount} pageSize={pageSize} />
        {
            users.map(u => <User user={u} key={u.id} followingInProgress={props.followingInProgress} 
                follow={props.follow} unfollow={props.unfollow} />)
        }
    </div>
    )
}

export default Users;