import React from 'react';
//@ts-ignore
import Header, { MapPropsType, DispatchPropsType } from './Header.tsx';
import { connect } from 'react-redux';
//@ts-ignore
import { logout } from '../../redux/auth-reducer.ts';
//@ts-ignore
import { AppStateType } from '../../redux/redux-store.ts';

class HeaderContainer extends React.Component<MapPropsType & DispatchPropsType> {
	render() {
		return (
			<Header {...this.props} />
		)
	}
}

let mapStateToProps = (state: AppStateType) => ({
	login: state.auth.login,
	isAuth: state.auth.isAuth
})

export default connect<MapPropsType, DispatchPropsType, {}, AppStateType>(mapStateToProps, { logout })(HeaderContainer);