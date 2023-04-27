import React from "react";
import { connect } from "react-redux";
//@ts-ignore
import Profile from "./Profile.tsx";
//@ts-ignore
import { getUserProfile, getStatus, updateStatus, savePhoto, saveProfile } from "../../redux/profile-reducer.ts";
import {
    useLocation,
    useNavigate,
    useParams,
} from "react-router-dom";
import { compose } from "redux";
import { AppStateType } from "../../redux/redux-store.js";

type ParamsType = {
    userId: string
}

interface WithRouterProps {
    params: Record<string, string>;
}

const withRouter = <Props extends WithRouterProps>(Component: React.ComponentType<Props>)=> {
    function ComponentWithRouterProp(props: Omit<Props, keyof WithRouterProps>) {
        let params = useParams<ParamsType>();
        return (
            <Component
                {...props}
                router={{ params }}
            />
        );
    }
    return ComponentWithRouterProp;
}

type MapPropsType = ReturnType<typeof mapStateToProps>
type MapDispatchPropsType = {
    getUserProfile: () => void
    getStatus: () => void
    updateStatus: () => void
    savePhoto: () => void
    saveProfile: () => void
}

class ProfileContainer extends React.Component<MapPropsType> {

    refreshProfile() {
        let userId = this.props.router.params.userId;
        if (!userId) {
            userId = this.props.authorizedUserId;
            if (!userId) {
                this.props.router.navigate('/login');
            }
        }
        this.props.getUserProfile(userId)
        this.props.getStatus(userId)
    }

    componentDidMount() {
        this.refreshProfile();
    }


    componentDidUpdate(prevProps, prevState, prevShot) {
        if (this.props.router.params.userId !== prevProps.router.params.userId) {
            this.refreshProfile();
        }
    }


    render() {
        return (
            <Profile {...this.props}
                isOwner={!this.props.router.params.userId}
                profile={this.props.profile}
                status={this.props.status}
                updateStatus={this.props.updateStatus}
                savePhoto={this.props.savePhoto}
                saveProfile={this.props.saveProfile}
            />
        )
    }
}

let mapStateToProps = (state: AppStateType) => ({
    profile: state.profilePage.profile,
    status: state.profilePage.status,
    authorizedUserId: state.auth.userId,
    isAuth: state.auth.isAuth
})

export default compose(
    connect(mapStateToProps, { getUserProfile, getStatus, updateStatus, savePhoto, saveProfile }),
    withRouter
)(ProfileContainer);