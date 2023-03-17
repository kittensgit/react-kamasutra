import React from 'react';
import { NavLink } from 'react-router-dom';
import s from "./Header.module.css";

function Header(props) {
	return (
		<header className={s.header}>
			<img src='https://upload.wikimedia.org/wikipedia/commons/d/db/Zeronet_logo.png' alt='header-img' />
			<div className={s.loginBlock}>
				{props.isAuth 
				? <div>{props.login} - <button onClick={props.logout}>log out</button></div> 
				: <NavLink to={'/login'}>login</NavLink>}
			</div>
		</header>
	)
}

export default Header;