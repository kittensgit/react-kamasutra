import React, { FC, useEffect } from 'react';
//@ts-ignore
import Paginator from '../common/Paginator/Paginator.tsx';
//@ts-ignore
import User from './User.tsx';
//@ts-ignore
import UsersSearchForm from './UsersSearchForm.tsx';
//@ts-ignore
import { FilterType, requestUsers, } from '../../redux/users-reducer.ts';
//@ts-ignore
import { follow as followT } from '../../redux/users-reducer.ts';
//@ts-ignore
import { unfollow as unfollowT } from '../../redux/users-reducer.ts';
import { useDispatch, useSelector } from 'react-redux';
//@ts-ignore
import { getCurrentPage, getPageSize, getTotalUsersCount, getUsers, getUsersFilter, getFollowingInProgress } from '../../redux/users-selectors.ts';
import { AnyAction } from 'redux';

type PropsType = {}


export const Users: FC<PropsType> = (props) => {

    const users = useSelector(getUsers)
    const currentPage = useSelector(getCurrentPage)
    const totalUsersCount = useSelector(getTotalUsersCount)
    const pageSize = useSelector(getPageSize)
    const filter = useSelector(getUsersFilter)
    const followingInProgress = useSelector(getFollowingInProgress)

    const dispatch = useDispatch()



    useEffect(() => {
        dispatch(requestUsers(currentPage, pageSize, filter) as unknown as AnyAction)
    }, [])

    const onPageChanged = (pageNumber: number) => {
        dispatch(requestUsers(pageNumber, pageSize, filter) as unknown as AnyAction)
    }

    const onFilterChanged = (filter: FilterType) => {
        dispatch(requestUsers(1, pageSize, filter) as unknown as AnyAction)
    }

    const follow = (userId: number) => {
        dispatch(followT(userId) as unknown as AnyAction)
    }

    const unfollow = (userId: number) => {
        dispatch(unfollowT(userId) as unknown as AnyAction)
    }

    return (<div>

        <UsersSearchForm onFilterChanged={onFilterChanged} />

        <Paginator currentPage={currentPage} onPageChanged={onPageChanged}
            totalItemsCount={totalUsersCount} pageSize={pageSize} />
        {
            users.map(u => <User user={u} key={u.id} followingInProgress={followingInProgress}
                follow={follow} unfollow={unfollow} />)
        }
    </div>
    )
}