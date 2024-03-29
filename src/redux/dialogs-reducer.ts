import { InferActionsType } from "./redux-store"

export type DialogItem = {
    id: number,
    name: string
}

export type MessageType = {
    id: number,
    message: string
}

let initialState = {
    dialogs: [
        { id: 1, name: 'Noah' },
        { id: 2, name: 'Michael' },
        { id: 3, name: 'William' },
        { id: 4, name: 'Ethan' },
        { id: 5, name: 'Alexander' },
        { id: 6, name: 'Jacob' },
    ] as Array<DialogItem>,
    messages: [
        { id: 1, message: "Hi! It's my first message" },
        { id: 2, message: "call me" },
        { id: 3, message: "i'm eating right now" },
        { id: 4, message: "cucumber" },
        { id: 5, message: "potato" },
    ] as Array<MessageType>
}

export type InitialStateType = typeof initialState;

const dialogsReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case 'SEND_MESSAGE':
            let body = action.newMessageBody;
            return {
                ...state,
                messages: [...state.messages, { id: 6, message: body }]
            }
        default:
            return state;
    }
}

type ActionsTypes = InferActionsType<typeof actions>;

export const actions = {
    sendMessage: (newMessageBody: string) => (
        { type: 'SEND_MESSAGE', newMessageBody } as const
    )
}

export default dialogsReducer;