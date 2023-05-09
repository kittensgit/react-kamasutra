export type ChatMessageAPIType = {
    message: string
    userId: number
    photo: string
    userName: string
}
export type StatusType = 'pending' | 'ready' | 'error'
type MessagesReceivedSubscriberType = (messages: ChatMessageAPIType[]) => void
type StatusChangedSubscriberType = (status: StatusType) => void
type EventsNamesType = 'messages-received' | 'status-changed'

let ws: WebSocket | null = null
const closeHandler = () => {
    notifySubscribersAboutStatus('pending')
    setTimeout(createChannel, 3000)
}

const cleanUp = () => {
    ws?.removeEventListener('close', closeHandler)
    ws?.removeEventListener('message', messageHandler)
    ws?.removeEventListener('open', openHandler)
    ws?.removeEventListener('error', errorHandler)
}

const notifySubscribersAboutStatus = (status: StatusType) => {
    subscribers['status-changed'].forEach(s => s(status))
}

function createChannel() {
    cleanUp()
    ws?.close()
    ws = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx')
    notifySubscribersAboutStatus('pending')
    ws.addEventListener('close', closeHandler)
    ws.addEventListener('message', messageHandler)
    ws.addEventListener('open', openHandler)
    ws.addEventListener('error', errorHandler)
}

let messageHandler = (e: MessageEvent) => {
    let newMessages = JSON.parse(e.data)
    subscribers['messages-received'].forEach(s => s(newMessages))
}

let openHandler = () => {
    notifySubscribersAboutStatus('ready')
}

let errorHandler = () => {
    notifySubscribersAboutStatus('error')
    console.error('refresh page')
}

let subscribers = {
    'messages-received': [] as MessagesReceivedSubscriberType[],
    'status-changed': [] as StatusChangedSubscriberType[]
}

export const chatAPI = {
    start() {
        createChannel()
    },
    stop() {
        subscribers['messages-received'] = []
        subscribers['status-changed'] = []
        cleanUp()
        ws?.close()
    },
    subscribe(eventName: EventsNamesType, callback: MessagesReceivedSubscriberType | StatusChangedSubscriberType) {
        //@ts-ignore
        subscribers[eventName].push(callback)
        return () => {
            //@ts-ignore
            subscribers[eventName] = subscribers[eventName].filter(s => s !== callback)
        }
    },
    unsubscribe(eventName: EventsNamesType, callback: MessagesReceivedSubscriberType | StatusChangedSubscriberType) {
        //@ts-ignore
        subscribers[eventName] = subscribers[eventName].filter(s => s !== callback)
    },
    sendMessage(message: string) {
        ws?.send(message)
    }
}