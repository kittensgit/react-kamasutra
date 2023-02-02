const SEND_MESSAGE = "SEND-MESSAGE"
const UPDATE_NEW_MESSAGE_BODY = "UPDATE-NEW-MESSAGE-TEXT"

let initialState = {
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
}

const dialogsReducer = (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_NEW_MESSAGE_BODY:
            return {
                ...state,
                newMessageBody: action.body
            }
        case SEND_MESSAGE:
            let body = state.newMessageBody;
            return {
                ...state,
                newMessageBody: '',
                messages: [...state.messages, { id: 6, message: body }]
            }
        default:
            return state;
    }
}

export const sendMessageCreator = () => ({ type: SEND_MESSAGE })

export const updateNewMessageBodyCreator = (body) => ({
    type: UPDATE_NEW_MESSAGE_BODY,
    body: body
})

export default dialogsReducer;