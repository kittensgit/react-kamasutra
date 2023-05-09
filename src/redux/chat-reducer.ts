import { Dispatch } from "redux";
//@ts-ignore
import { ChatMessageAPIType, StatusType, chatAPI } from "../api/chat-api.ts";
//@ts-ignore
import { BaseThunkType, InferActionsType } from "./redux-store.ts";
import { v1 } from 'uuid'

type ChatMessageType = ChatMessageAPIType & { id: string }

let initialState = {
    messages: [] as ChatMessageType[],
    status: 'pending' as StatusType
}

const chatReducer = (state = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'MESSAGES_RECEIVED':
            return {
                ...state,
                messages: [...state.messages, ...action.payload.messages.map(m => ({ ...m, id: v1() }))]
                .filter((m, index, array) => index >= array.length - 100)
            }
        case 'STATUS_CHANGED':
            return {
                ...state,
                status: action.payload.status
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
    } as const),
    statusChanged: (status: StatusType) => ({
        type: 'STATUS_CHANGED',
        payload: { status }
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

let _statusChangedHandler: ((status: StatusType) => void) | null = null
const statusChangeHandlerCreater = (dispatch: Dispatch) => {
    if (_statusChangedHandler === null) {
        _statusChangedHandler = (status) => {
            dispatch(actions.statusChanged(status))
        }
    }
    return _statusChangedHandler
}

export const startMessagesListening = (): ThunkType => async (dispatch) => {
    chatAPI.start()
    chatAPI.subscribe('messages-received', newMessageHandlerCreater(dispatch))
    chatAPI.subscribe('status-changed', statusChangeHandlerCreater(dispatch))
}

export const stopMessagesListening = (): ThunkType => async (dispatch) => {
    chatAPI.unsubscribe('messages-received', newMessageHandlerCreater(dispatch))
    chatAPI.unsubscribe('status-changed', statusChangeHandlerCreater(dispatch))
    chatAPI.stop()
}

export const sendMessage = (message: string): ThunkType => async (dispatch) => {
    chatAPI.sendMessage(message)
}


export default chatReducer;