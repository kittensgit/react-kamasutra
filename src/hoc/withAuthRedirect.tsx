import React from 'react'
import { Navigate } from 'react-router-dom'
import { connect } from 'react-redux'
import { AppStateType } from '../redux/redux-store'


export function withAuthRedirect(Component: React.ComponentType<mapStateToPropsforRedirectPropsType>) {
    class RedirectComponent extends React.Component<mapStateToPropsforRedirectPropsType> {
        render() {
            if (!this.props.isAuth) return <Navigate to={"/login"} />;
            return <Component {...this.props} />;
        }
    }
    let ConnectedAuthRedirectComponent = connect(mapStateToPropsforRedirect)(
        RedirectComponent
    );
    return ConnectedAuthRedirectComponent;
};

type mapStateToPropsforRedirectPropsType = {
    isAuth: boolean
}

let mapStateToPropsforRedirect = (state: AppStateType): mapStateToPropsforRedirectPropsType => {
    return {
        isAuth: state.auth.isAuth,
    };
};