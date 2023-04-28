import { connect } from 'react-redux';
//@ts-ignore
import { actions } from '../../../redux/profile-reducer.ts';
//@ts-ignore
import MyPosts, { DispatchPropsType, MapPropsType } from './MyPosts.tsx';
//@ts-ignore
import { AppStateType } from "../../../redux/redux-store.ts";

const mapStateToProps = (state: AppStateType) => {
    return {
        posts: state.profilePage.posts
    } 
}

const MyPostsContainer =
    connect<MapPropsType, DispatchPropsType, {}, AppStateType>(mapStateToProps, {
        addPost: actions.addPostActionCreator
    })(MyPosts)

export default MyPostsContainer;