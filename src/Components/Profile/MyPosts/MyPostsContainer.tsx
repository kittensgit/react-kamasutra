import { connect } from 'react-redux';
//@ts-ignore
import { actions } from '../../../redux/profile-reducer.ts';
//@ts-ignore
import MyPosts from './MyPosts.tsx';
//@ts-ignore
import { PostType } from '../../../types/types.ts';
//@ts-ignore
import { AppStateType } from "../../../redux/redux-store.ts";

type MapStatePropsType = {
    posts: Array<PostType>
}


type MapDispatchPropsType = {
    addPost: (newPostText: string) => void
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
    connect<MapStatePropsType, MapDispatchPropsType, {}, AppStateType>(mapStateToProps, mapDispatchToProps)
        (MyPosts)

export default MyPostsContainer;