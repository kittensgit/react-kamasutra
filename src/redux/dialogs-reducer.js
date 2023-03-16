const SEND_MESSAGE = "SEND-MESSAGE"

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
    ]
}

const dialogsReducer = (state = initialState, action) => {
    switch (action.type) {
        case SEND_MESSAGE:
            let body = action.newMessageBody;
            return {
                ...state,
                messages: [...state.messages, { id: 6, message: body }]
            }
        default:
            return state;
    }
}

export const sendMessageCreator = (newMessageBody) => ({ type: SEND_MESSAGE, newMessageBody })

export default dialogsReducer;