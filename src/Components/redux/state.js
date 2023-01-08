import { rerenderEntireTree } from "../../render";

let state = {
    profilePage: {
        posts: [
            {  id: 1, message: "hi, how are you?", likesCount: 12 },
            {  id: 2, message: "it's my first post", likesCount: 10 },
        ],
        newPostText: 'hello'
    },
    dialogsPage: {
        dialogs: [
            { id: 1, name: 'Noah'},
            { id: 2, name: 'Michael'},
            { id: 3, name: 'William'},
            { id: 4, name: 'Ethan'},
            { id: 5, name: 'Alexander'},
            { id: 6, name: 'Jacob'},
        ],
        messages: [
            {  id: 1, message: "Hi! It's my first message" },
            {  id: 2, message: "call me" },
            {  id: 3, message: "i'm eating right now" },
            {  id: 4, message: "cucumber" },
            {  id: 5, message: "potato" },
        ],
    }
}

export let addPost = () => {
    let newPost = {
        id: 5,
        message: state.profilePage.newPostText,
        likesCount: 0
    };

    state.profilePage.posts.push(newPost)
    state.profilePage.newPostText = '';
    rerenderEntireTree(state)
}

export let updateNewPostText = (newText) => {
    state.profilePage.newPostText = newText
    rerenderEntireTree(state)
}

export default state;