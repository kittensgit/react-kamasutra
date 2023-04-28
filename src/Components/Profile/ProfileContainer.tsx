import React from "react";
import { connect } from "react-redux";
//@ts-ignore
import Profile from "./Profile.tsx";
//@ts-ignore
import { getUserProfile, getStatus, updateStatus, savePhoto, saveProfile } from "../../redux/profile-reducer.ts";
import {
    useParams,
} from "react-router-dom";
import { compose } from "redux";
import { AppStateType } from "../../redux/redux-store.js";
import { ProfileType } from "../../types/types.js";

type ParamsType = {
    userId: string | null
}

interface WithRouterProps {
    router: {
        navigate(arg0: string): unknown;
        params: Record<string, string>;
    }
}

const withRouter = <Props extends WithRouterProps>(Component: React.ComponentType<Props>) => {
    function ComponentWithRouterProp(props: Omit<Props, keyof WithRouterProps>) {
        let params = useParams<ParamsType>();
        return (
            <Component
                {...(props as Props)}
                router={{ params }}
            />
        );
    }
    return ComponentWithRouterProp;
}

type MapPropsType = ReturnType<typeof mapStateToProps>
type MapDispatchPropsType = {
    getUserProfile: (userId: number) => void
    getStatus: (userId: number) => void
    updateStatus: (status: string) => void
    savePhoto: (file: File) => void
    saveProfile: (profile: ProfileType) => Promise<any>
}

type PropsType = MapPropsType & MapDispatchPropsType & WithRouterProps;

class ProfileContainer extends React.Component<PropsType> {

    refreshProfile() {
        let userId: number | null = +this.props.router.params.userId;
        if (!userId) {
            userId = this.props.authorizedUserId;
            if (!userId) {
                // this.props.router.navigate('/login');
            }
        }
        if (!userId) {
            console.error('error auth')
        } else {
            this.props.getUserProfile(userId)
            this.props.getStatus(userId)
        }
    }

    componentDidMount() {
        this.refreshProfile();
    }


    componentDidUpdate(prevProps: PropsType, prevState: PropsType, prevShot: PropsType) {
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

export default compose<React.ComponentType>(
    connect(mapStateToProps, { getUserProfile, getStatus, updateStatus, savePhoto, saveProfile }),
    withRouter
)(ProfileContainer);