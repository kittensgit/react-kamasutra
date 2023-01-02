import React from 'react'
import classes from './Post.module.css'

export default function Post() {
    return (
        <div className={classes.item}>
            <img src='https://cdn-icons-png.flaticon.com/512/147/147144.png' />
            post 1
            <div>
                <span>like</span>
            </div>
        </div>
    )
}
