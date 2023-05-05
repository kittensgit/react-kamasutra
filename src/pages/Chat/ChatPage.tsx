import React, { useEffect, useState } from 'react'

const wsChannel = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx')

const ChatPage: React.FC = () => {
    return (
        <Chat />
    )
}

export type ChatMessageType = {
    message: string
    userId: number
    photo: string
    userName: string
}

const Chat: React.FC = () => {
    return (
        <div>
            <Messages />
            <AddMessageForm />
        </div>
    )
}

const Message: React.FC<{ message: ChatMessageType }> = ({ message }) => {
    return (
        <div>
            <img alt='auth' src={message.photo} style={{
                width: '30px'
            }} />
            <b>{message.userName}</b>
            <br />
            <p>{message.message}</p>
            <hr />
        </div>
    )
}

const Messages: React.FC = () => {
    const [messages, setMessages] = useState([])
    useEffect(() => {
        wsChannel.addEventListener('message', (e: MessageEvent) => {
            let newMessages = JSON.parse(e.data)
            setMessages((prevMessages) => [...prevMessages, ...newMessages])
        })
    }, [])
    return (
        <div style={{ height: '400px', overflowY: 'auto' }}>
            {messages.map((m, index) => <Message key={index} message={m} />)}
        </div>
    )
}

const AddMessageForm: React.FC = () => {

    const [message, setMessage] = useState('')
    const [readyStatus, setReadyStatus] = useState<'pending' | 'ready'>('pending')

useEffect(()=>{
    wsChannel.addEventListener('open', ()=> {
        setReadyStatus('ready')
    })
}, [])


    const sendMessage = () => {
        if (!message) {
            return;
        }
        wsChannel.send(message)
        setMessage('')
    }

    return (
        <div>
            <div>
                <textarea onChange={(e) => setMessage(e.currentTarget.value)} value={message}></textarea>
            </div>
            <div>
                <button disabled={readyStatus !== 'ready'} onClick={sendMessage}>send</button>
            </div>
        </div>
    )
}



export default ChatPage;