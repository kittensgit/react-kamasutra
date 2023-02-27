import React from 'react'
import styles from './Users.module.css'
import userPhoto from '../../assets/images/user.png'
import { NavLink } from 'react-router-dom';
import { followAPI, unfollowAPI } from '../../api/api';

export default function Users(props) {

    let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize);
    let pages = [];
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i);
    }

    return (<div>
        <div>
            {pages.map(p => {
                return <span className={props.currentPage === p && styles.selectedPage}
                    onClick={(e) => { props.onPageChanged(p) }}>{p}</span>
            })}
        </div>
        {
            props.users.map(u => <div key={u.id}>
                <span>
                    <div>
                        <NavLink to={'/profile/' + u.id}>
                            <img src={u.photos.small != null ? u.photos.small : userPhoto} className={styles.userPhoto} alt="user" />
                        </NavLink>
                    </div>
                </span>
                <span>
                    {u.followed
                        ? <button onClick={() => {

                            unfollowAPI.deleteFollow(u.id)
                                .then(resultCode => {
                                    if (resultCode === 0) {
                                        props.unfollow(u.id)
                                    }
                                });

                        }}>Unfollow</button>
                        : <button onClick={() => {

                            followAPI.postFollow(u.id)
                            .then(resultCode => {
                                if (resultCode === 0) {
                                    props.follow(u.id)
                                }
                            });


                        }}>Follow</button>}
                </span>
                <span>
                    <span>
                        <div>{u.name}</div>
                        <div>{u.status}</div>
                    </span>
                    <span>
                        <div>{"u.location.country"}</div>
                        <div>{"u.location.city"}</div>
                    </span>
                </span>
            </div>)
        }
    </div>
    )
}
