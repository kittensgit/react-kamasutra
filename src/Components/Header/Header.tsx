import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
//@ts-ignore
import { selectCurrentUserLogin, selectIsAuth } from '../../redux/auth-selectors.ts';
//@ts-ignore
import { logout } from '../../redux/auth-reducer.ts';
import { AnyAction } from 'redux';
import {
	UserOutlined
} from '@ant-design/icons';

import { MenuProps, Tooltip } from 'antd';

import { Layout, Menu } from 'antd';
import { Avatar, Button, Col, Row } from 'antd';
const { Header } = Layout;

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
	label: React.ReactNode,
	key: React.Key,
	icon?: React.ReactNode,
	children?: MenuItem[]
): MenuItem {
	return {
		key,
		icon,
		children,
		label,
	} as MenuItem;
}


const items2: MenuItem[] = [
	getItem('Dev', 'dev', <UserOutlined />, [
		getItem(<Link to='/developers'>Developers</Link>, '4')
	])
];

export const AppHeader: React.FC = () => {

	const isAuth = useSelector(selectIsAuth);
	const login = useSelector(selectCurrentUserLogin);

	const dispatch = useDispatch();

	const logoutCallBack = () => {
		dispatch(logout() as unknown as AnyAction)
	}

	return (
		<Header className="header">
			<Row>
				<Col span={18}>
					<Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']} items={items2} />
				</Col>
				{isAuth
					?
					<>
						<Col span={1}>
							<Tooltip title={login} placement="bottom">
								<Avatar alt={login || ''} style={{ backgroundColor: '#87d068' }} icon={<UserOutlined />} />
							</Tooltip>
						</Col>
						<Col span={5}>
							<Button onClick={logoutCallBack}>log out</Button>
						</Col>
					</>
					:
					<Col span={6}>
						<Button>
							<Link to={'/login'}>login</Link>
						</Button>
					</Col>
				}
			</Row>

		</Header>
		// <header className={s.header}>
		// 	<img src='https://upload.wikimedia.org/wikipedia/commons/d/db/Zeronet_logo.png' alt='header-img' />
		// 	<div className={s.loginBlock}>
		// 		{props.isAuth 
		// 		? <div>{props.login} - <button onClick={props.logout}>log out</button></div> 
		// 		: <NavLink to={'/login'}>login</NavLink>}
		// 	</div>
		// </header>
	)
}

export { Header };

