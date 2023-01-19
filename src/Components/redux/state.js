const ADD_POST = "ADD-POST";
const UPDATE_NEW_POST_TEXT = "UPDATE-NEW-POST-TEXT";
const ADD_MESSAGE = "ADD-MESSAGE"
const UPDATE_NEW_MESSAGE_TEXT =  "UPDATE-NEW-MESSAGE-TEXT"

let store = {
    _state: {
        profilePage: {
            posts: [
                { id: 1, message: "hi, how are you?", likesCount: 12 },
                { id: 2, message: "it's my first post", likesCount: 10 },
            ],
            newPostText: 'first post'
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
            newMessageText: "Hi! It's my first message"
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
        } else if (action.type === ADD_MESSAGE) {
            let newMessage = {
                id: 6, 
                message: this._state.dialogsPage.newMessageText
            };
            this._state.dialogsPage.messages.push(newMessage);
            this._state.dialogsPage.newMessageText = ''
            this._callSubscriber(this._state)
        } else if (action.type === UPDATE_NEW_MESSAGE_TEXT){
            this._state.dialogsPage.newMessageText = action.newMessage
            this._callSubscriber(this._state)
        }
    }
}


export const addPostActionCreator = () => ({ type: ADD_POST })

export const updateNewPostTextActionCreator = (text) => ({
    type: UPDATE_NEW_POST_TEXT,
    newText: text
})

export const addMessageActionCreator = () => ({type: ADD_MESSAGE})

export const updateNewMessageTextActionCreator = (message) => ({
    type: UPDATE_NEW_MESSAGE_TEXT,
    newMessage: message
})


export default store;