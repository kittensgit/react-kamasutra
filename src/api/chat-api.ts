export type ChatMessageType = {
    message: string
    userId: number
    photo: string
    userName: string
}
type SubscriberType = (messages: ChatMessageType[]) => void


let ws: WebSocket | null = null
const closeHandler = () => {
    console.log('CLOSE WS')
    setTimeout(createChannel, 3000)
}

function createChannel() {
    ws?.removeEventListener('close', closeHandler)
    ws?.close()
    ws = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx')
    ws.addEventListener('close', closeHandler)
    ws.addEventListener('message', messageHandler)
}

let messageHandler = (e: MessageEvent) => {
    let newMessages = JSON.parse(e.data)
    subscribers.forEach(s => s(newMessages))
}

let subscribers = [] as SubscriberType[]

export const chatAPI = {
    start(){
        createChannel()
    },
    stop(){
        subscribers = []
        ws?.removeEventListener('close', closeHandler)
        ws?.removeEventListener('message', messageHandler)
        ws?.close()
    },
    subscribe(callback: SubscriberType) {
        subscribers.push(callback)
        return () => {
            subscribers = subscribers.filter(s => s !== callback)
        }
    },
    unsubscribe(callback: SubscriberType) {
        subscribers = subscribers.filter(s => s !== callback)
    },
    sendMessage(message: string) {
        ws?.send(message)
    }
}