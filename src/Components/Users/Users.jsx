import React from 'react';
import Paginator from '../common/Paginator/Paginator';
import User from './User';

export default function Users({ currentPage, totalUsersCount, pageSize, onPageChanged, users, follow, unfollow, followingInProgress }) {

    return (<div>
        <Paginator currentPage={currentPage} onPageChanged={onPageChanged}
            totalUsersCount={totalUsersCount} pageSize={pageSize} />
        {
            users.map(u => <User user={u} key={u.id} followingInProgress={followingInProgress} 
                follow={follow} unfollow={unfollow} />)
        }
    </div>
    )
}
