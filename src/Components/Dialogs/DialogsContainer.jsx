import React from "react";
import StoreContext from "../../StoreContext";
import { sendMessageCreator, updateNewMessageBodyCreator } from "../redux/dialogs-reducer";
import Dialogs from "./Dialogs";

const DialogsContainer = () => {

    return <StoreContext.Consumer>{
        (store) => {
            let state = store.getState().dialogsPage;

            let onSendMessageClick = () => {
                store.dispatch(sendMessageCreator());
            }
        
            let onNewMessageChange = (body) => {
                store.dispatch(updateNewMessageBodyCreator(body));
            }
            return <Dialogs updateNewMessageBody={onNewMessageChange} sendMessage={onSendMessageClick}
                dialogsPage={state} />
        }
    }
    </StoreContext.Consumer>

}

export default DialogsContainer;