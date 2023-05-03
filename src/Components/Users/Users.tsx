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
import { useSearchParams } from "react-router-dom";

type PropsType = {}

// const useNavigateSearch = () => {
//     const navigate = useNavigate();
//     return (pathname, params) =>
//         navigate(`${pathname}?${createSearchParams(params)}`);
// };


export const Users: FC<PropsType> = () => {

    const users = useSelector(getUsers)
    const currentPage = useSelector(getCurrentPage)
    const totalUsersCount = useSelector(getTotalUsersCount)
    const pageSize = useSelector(getPageSize)
    const filter = useSelector(getUsersFilter)
    const followingInProgress = useSelector(getFollowingInProgress)

    const dispatch = useDispatch()

    const [searchParams, setSearchParams] = useSearchParams()

    useEffect(() => {
        const result: any = {}
        // @ts-ignore
        for (const [key, value] of searchParams.entries()) {
            let value2: any = +value
            if (isNaN(value2)) {
                value2 = value
            }
            if (value === 'true') {
                value2 = true
            } else if (value === 'false') {
                value2 = false
            }
            result[key] = value2
        }

        let actualPage = result.page || currentPage
        let term = result.term || filter.term
        let friend = result.friend || filter.friend
        
        if (result.friend === false) {
            friend = result.friend
        }

        const actualFilter = { friend, term }
        dispatch(requestUsers(actualPage, pageSize, actualFilter) as unknown as AnyAction)
    }, [])

    useEffect(() => {

        const term = filter.term
        const friend = filter.friend

        let urlQuery =
            (term === '' ? '' : `&term=${term}`)
            + (friend === null ? '' : `&friend=${friend}`)
            + (currentPage === 1 ? '' : `&page=${currentPage}`)

        setSearchParams(urlQuery)

        // eslint-disable-next-line
    }, [filter, currentPage])


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