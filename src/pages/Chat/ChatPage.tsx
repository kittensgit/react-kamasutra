import React from 'react'

const ChatPage: React.FC = () => {
    return (
        <Chat />
    )
}

const Chat: React.FC = () => {
    return (
        <div>
            <Messages />
            <AddMessageForm />
        </div>
    )
}

const Message: React.FC = () => {
    const message = {
        url: 'https://w7.pngwing.com/pngs/941/692/png-transparent-black-small-apple-logo-logo-material-apple-logo-black-thumbnail.png',
        author: 'nika',
        text: 'hello'
    }
    return (
        <div>
            <img src={message.url} />
            <b>{message.author}</b>
            <br />
            <p>{message.text}</p>
            <hr />
        </div>
    )
}

const Messages: React.FC = () => {
    const messages = [1, 2, 3, 4]
    return (
        <div>
            {messages.map((m: any) => <Message />)}
        </div>
    )
}

const AddMessageForm: React.FC = () => {
    return (
        <div>
            <div>
                <textarea></textarea>
            </div>
            <div>
                <button>send</button>
            </div>
        </div>
    )
}



export default ChatPage;