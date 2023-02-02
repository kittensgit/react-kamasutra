import React from "react";
import styles from "./Users.module.css"

let Users = (props) => {
    if (props.users.length === 0) {
        props.setUsers(
            [
                { id: 1, photoUrl: 'https://cdn-icons-png.flaticon.com/512/147/147144.png', followed: false, fullName: 'nika', status: 'i am human', location: { city: 'Dnipro', country: 'Ukraine' } },
                { id: 2, photoUrl: 'https://cdn-icons-png.flaticon.com/512/147/147144.png', followed: true, fullName: 'kurumi', status: 'i love sacura', location: { city: 'Tokyo', country: 'Japan' } },
                { id: 3, photoUrl: 'https://cdn-icons-png.flaticon.com/512/147/147144.png', followed: false, fullName: 'cyao', status: 'i am worker', location: { city: 'Phenyan', country: 'China' } }
            ],
        )

    }

    return <div>
        {
            props.users.map(u => <div key={u.id}>
                <span>
                    <div>
                        <img src={u.photoUrl} className={styles.userPhoto} />
                    </div>
                </span>
                <span>
                    {u.followed
                        ? <button onClick={() => { props.unfollow(u.id) }}>Unfollow</button>
                        : <button onClick={() => { props.follow(u.id) }}>Follow</button>}
                </span>
                <span>
                    <span>
                        <div>{u.fullName}</div>
                        <div>{u.status}</div>
                    </span>
                    <span>
                        <div>{u.location.country}</div>
                        <div>{u.location.city}</div>
                    </span>
                </span>
            </div>)
        }
    </div>
}

export default Users;