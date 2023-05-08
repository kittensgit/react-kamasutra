import { Dispatch } from "redux";
//@ts-ignore
import { chatAPI } from "../api/chat-api.ts";
//@ts-ignore
import { ChatMessageType } from "../pages/Chat/ChatPage.tsx";
//@ts-ignore
import { BaseThunkType, InferActionsType } from "./redux-store.ts";

let initialState = {
    messages: [] as ChatMessageType[]
}

const chatReducer = (state = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'MESSAGES_RECEIVED':
            return {
                ...state,
                messages: [...state.messages, ...action.payload.messages]
            }
        default:
            return state;
    }
}
export type InitialStateType = typeof initialState;
type ActionsType = InferActionsType<typeof actions>;
type ThunkType = BaseThunkType<ActionsType>;

export const actions = {
    messagesReceived: (messages: ChatMessageType[]) => ({
        type: 'MESSAGES_RECEIVED',
        payload: { messages }
    } as const)
}

let _newMessageHandler: ((messages: ChatMessageType[]) => void) | null = null

const newMessageHandlerCreater = (dispatch: Dispatch) => {
    if (_newMessageHandler === null) {
        _newMessageHandler = (messages) => {
            dispatch(actions.messagesReceived(messages))
        }
    }
    return _newMessageHandler
}

export const startMessagesListening = (): ThunkType => async (dispatch) => {
    chatAPI.start()
    chatAPI.subscribe(newMessageHandlerCreater(dispatch))
}

export const stopMessagesListening = (): ThunkType => async (dispatch) => {
    chatAPI.unsubscribe(newMessageHandlerCreater(dispatch))
    chatAPI.stop()
}

export const sendMessage = (message: string): ThunkType => async (dispatch) => {
    chatAPI.sendMessage(message)
}


export default chatReducer;