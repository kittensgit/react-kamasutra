const ADD_POST = "ADD-POST";
const UPDATE_NEW_POST_TEXT = "UPDATE-NEW-POST-TEXT";

let store = {
    _state: {
        profilePage: {
            posts: [
                { id: 1, message: "hi, how are you?", likesCount: 12 },
                { id: 2, message: "it's my first post", likesCount: 10 },
            ],
            newPostText: 'hello'
        },
        dialogsPage: {
            dialogs: [
                { id: 1, name: 'Noah' },
                { id: 2, name: 'Michael' },
                { id: 3, name: 'William' },
                { id: 4, name: 'Ethan' },
                { id: 5, name: 'Alexander' },
                { id: 6, name: 'Jacob' },
            ],
            messages: [
                { id: 1, message: "Hi! It's my first message" },
                { id: 2, message: "call me" },
                { id: 3, message: "i'm eating right now" },
                { id: 4, message: "cucumber" },
                { id: 5, message: "potato" },
            ],
        }
    },
    getState() {
        return this._state;
    },
    _callSubscriber() {
        console.log("state was change")
    }, // уведомляет подпписчика(observer) из вне
    subscribe(observer) {
        this._callSubscriber = observer
    },

    dispatch(action) {
        if (action.type === ADD_POST) {
            let newPost = {
                id: 5,
                message: this._state.profilePage.newPostText,
                likesCount: 0
            };
            this._state.profilePage.posts.push(newPost)
            this._state.profilePage.newPostText = '';
            this._callSubscriber(this._state)
        } else if (action.type === UPDATE_NEW_POST_TEXT) {
            this._state.profilePage.newPostText = action.newText
            this._callSubscriber(this._state)
        }
    }
}


export const addPostActionCreator = () => ({ type: ADD_POST })

export const updateNewPostTextActionCreator = (text) => ({
    type: UPDATE_NEW_POST_TEXT,
    newText: text
})

export default store;