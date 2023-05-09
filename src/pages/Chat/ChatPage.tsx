import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
//@ts-ignore
import { sendMessage, startMessagesListening, stopMessagesListening } from '../../redux/chat-reducer.ts'
import { AnyAction } from 'redux'
//@ts-ignore
import { AppStateType } from '../../redux/redux-store.ts'

export type ChatMessageType = {
    message: string
    userId: number
    photo: string
    userName: string
}

const ChatPage: React.FC = () => {
    return (
        <Chat />
    )
}

const Chat: React.FC = () => {

    const dispatch = useDispatch()

    const status = useSelector((state: AppStateType) => state.chat.status)

    useEffect(() => {
        dispatch(startMessagesListening() as unknown as AnyAction)
        return () => {
            dispatch(stopMessagesListening() as unknown as AnyAction)
        }
    }, [])

    return (
        <div>
            {status === 'error' && <div>Error. pls refresh page</div>}
            <>
                <Messages />
                <AddMessageForm />
            </>
        </div>
    )
}

const Message: React.FC<{ message: ChatMessageType }> = React.memo(({ message }) => {
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
})

const Messages: React.FC = () => {

    const messages = useSelector((state: AppStateType) => state.chat.messages)
    const messagesAnchorRef = useRef<HTMLDivElement>(null)
    const [isAutoScroll, setIsAutoScroll] = useState(false)

    const scrollHandler = (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
        const element = e.currentTarget;
        if (Math.abs((element.scrollHeight - element.scrollTop) - element.clientHeight) < 300) {
            !isAutoScroll && setIsAutoScroll(true)
        } else {
            isAutoScroll && setIsAutoScroll(false)
        }
    }

    useEffect(() => {
        if (isAutoScroll) {
            messagesAnchorRef.current?.scrollIntoView({ behavior: 'smooth' })
        }
    }, [messages])

    return (
        <div style={{ height: '400px', overflowY: 'auto' }} onScroll={scrollHandler}>
            {messages.map((m) => <Message key={m.id} message={m} />)}
            <div ref={messagesAnchorRef}></div>
        </div>
    )
}

const AddMessageForm: React.FC = () => {

    const [message, setMessage] = useState('')
    const dispatch = useDispatch()

    const status = useSelector((state: AppStateType) => state.chat.status)


    const sendMessageHandler = () => {
        if (!message) {
            return;
        }
        dispatch(sendMessage(message) as unknown as AnyAction)
        setMessage('')
    }

    return (
        <div>
            <div>
                <textarea onChange={(e) => setMessage(e.currentTarget.value)} value={message}></textarea>
            </div>
            <div>
                <button disabled={status !== 'ready'} onClick={sendMessageHandler}>send</button>
            </div>
        </div>
    )
}



export default ChatPage;