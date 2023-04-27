import { connect } from "react-redux";
//@ts-ignore
import { DialogItem, actions, MessageType } from "../../redux/dialogs-reducer.ts";
//@ts-ignore
import Dialogs from "./Dialogs.tsx";
//@ts-ignore
import { withAuthRedirect } from "../../hoc/withAuthRedirect.tsx";
import { compose } from "redux";
//@ts-ignore
import { AppStateType } from "../../redux/redux-store.ts";


type MapStatePropsType = {
    dialogsPage: {
        dialogs: Array<DialogItem>,
        messages: Array<MessageType>
    }
}


let mapStateToProps = (state: AppStateType):MapStatePropsType => {
    return {
        dialogsPage: state.dialogsPage
    }
}

export default compose<React.ComponentType>(
    connect(mapStateToProps, {...actions}),
    withAuthRedirect
)(Dialogs)