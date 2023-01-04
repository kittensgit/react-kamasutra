import React from 'react';
import s from "./Header.module.css";

function Header() {
	return (
		<header className={s.header}>
			<img src='https://upload.wikimedia.org/wikipedia/commons/d/db/Zeronet_logo.png' />
		</header>
	)
}

export default Header;