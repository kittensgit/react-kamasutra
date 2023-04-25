import { connect } from 'react-redux';
//@ts-ignore
import { actions } from '../../../redux/profile-reducer.ts';
//@ts-ignore
import MyPosts from './MyPosts.jsx';
import { PostType } from '../../../types/types.js';
//@ts-ignore
import { AppStateType } from "../../../redux/redux-store.ts";

type MapStatePropsType = {
    posts: Array<PostType>
}


type MapDispatchPropsType = {
    addPost: (newPostText: string) => void
}

type OwnPropsType = {

}


const mapStateToProps = (state: AppStateType) => {
    return {
        posts: state.profilePage.posts
    }
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        addPost: (newPostText: string) => {
            dispatch(actions.addPostActionCreator(newPostText))
        }
    }
}

const MyPostsContainer =
    connect<MapStatePropsType, MapDispatchPropsType, OwnPropsType, AppStateType>(mapStateToProps, mapDispatchToProps)
        (MyPosts)

export default MyPostsContainer;