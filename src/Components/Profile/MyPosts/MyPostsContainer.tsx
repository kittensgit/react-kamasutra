import { connect } from 'react-redux';
import { addPostActionCreator } from '../../../redux/profile-reducer.ts';
import MyPosts from './MyPosts.tsx';
import { PostType } from '../../../types/types.js';
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
            dispatch(addPostActionCreator(newPostText))
        }
    }
}

const MyPostsContainer =
    connect<MapStatePropsType, MapDispatchPropsType, OwnPropsType, AppStateType>(mapStateToProps, mapDispatchToProps)
        (MyPosts)

export default MyPostsContainer;