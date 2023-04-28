//@ts-ignore
import { profileAPI } from "../api/profile-api.ts";
import { PhotosType, PostType, ProfileType } from "../types/types";
import { BaseThunkType, InferActionsType } from "./redux-store.js";

let initialState = {
    posts: [
        { id: 1, message: "hi, how are you?", likesCount: 12 },
        { id: 2, message: "it's my first post", likesCount: 10 },
    ] as Array<PostType>,
    profile: null as ProfileType | null,
    status: ''
}

export type InitialStateType = typeof initialState;

const profileReducer = (state = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'ADD_POST': {
            let newPost = {
                id: 5,
                message: action.newPostText,
                likesCount: 0
            };
            return {
                ...state,
                posts: [...state.posts, newPost]
            };
        }
        case 'SET_STATUS': {
            return {
                ...state,
                status: action.status
            }
        }
        case 'SET_USER_PROFILE': {
            return {
                ...state,
                profile: action.profile
            }
        }
        case 'DELETE_POST': {
            return {
                ...state,
                posts: state.posts.filter(p => p.id !== action.postId)
            }
        }
        case 'SAVE_PHOTO_SUCCESS': {
            return { ...state, profile: { ...state.profile, photos: action.photos } as ProfileType };
        }
        default:
            return state;
    }
}

export type ActionsType = InferActionsType<typeof actions>;
type ThunkType = BaseThunkType<ActionsType>;

export const actions = {
    addPostActionCreator: (newPostText: string) => ({
        type: 'ADD_POST',
        newPostText
    } as const),
    setUserProfile: (profile: ProfileType) => ({
        type: 'SET_USER_PROFILE',
        profile
    } as const),
    setStatus: (status: string) => ({
        type: 'SET_STATUS',
        status
    } as const),
    deletePost: (postId: number) => ({
        type: 'DELETE_POST',
        postId
    } as const),
    savePhotoSuccess: (photos: PhotosType) => ({
        type: 'SAVE_PHOTO_SUCCESS',
        photos
    } as const)
}

export const getUserProfile = (userId: number): ThunkType => async (dispatch) => {
    const data = await profileAPI.getProfile(userId)
    dispatch(actions.setUserProfile(data));
}

export const getStatus = (userId: number): ThunkType => async (dispatch) => {
    let statusData = await profileAPI.getStatus(userId);
    dispatch(actions.setStatus(statusData));

}

export const updateStatus = (status: string): ThunkType => async (dispatch) => {
    let updateData = await profileAPI.updateStatus(status)
    if (updateData.resultCode === 0) {
        dispatch(actions.setStatus(status));
    }
}


export const savePhoto = (file: File): ThunkType => async (dispatch) => {
    let saveData = await profileAPI.savePhoto(file)
    if (saveData.resultCode === 0) {
        dispatch(actions.savePhotoSuccess(saveData.data.photos));
    }
}

export const saveProfile = (profile: ProfileType): ThunkType => async (dispatch, getState) => {
    const userId = getState().auth.userId;
    const data = await profileAPI.saveProfile(profile)
    if (data.resultCode === 0) {
        if (userId != null) {
            dispatch(getUserProfile(userId));
        } else {
            throw new Error("userId can't be null")
        }
    }
}


export default profileReducer;