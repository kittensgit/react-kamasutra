import React from 'react';
import s from "./NavBar.module.css"

function NavBar() {
  return (
    <nav className={s.nav}>
      <div className={`${s.item} ${s.active}`}>
        <a href='/profile'>Profile</a>
      </div>
      <div className={s.item}>
        <a href='/dialogs'>Messages</a>
      </div>
      <div className={s.item}>
        <a href='/news'>News</a>
      </div>
      <div className={s.item}>
        <a href='/music'>Music</a>
      </div>
      <div className={s.item}>
        <a href='/settings'>Settings</a>
      </div>
    </nav>
  )
}

export default NavBar;