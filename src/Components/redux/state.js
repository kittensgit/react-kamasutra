import dialogsReducer from "./dialogs-reducer";
import profileReducer from "./profile-reducer";
import sidebarReduser from "./sidebar-reducer";

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
            newMessageBody: ""
        },
        sidebar: {}
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

        this._state.profilePage = profileReducer( this._state.profilePage, action);
        this._state.dialogsPage = dialogsReducer(this._state.dialogsPage, action);
        this._state.sidebar = sidebarReduser(this._state.sidebar, action);

        this._callSubscriber(this._state)
    }
}

export default store;