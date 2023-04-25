import { connect } from "react-redux";
//@ts-ignore
import { actions } from "../../redux/dialogs-reducer.ts";
//@ts-ignore
import Dialogs from "./Dialogs.tsx";
import { withAuthRedirect } from "../../hoc/withAuthRedirect";
import { compose } from "redux";
//@ts-ignore
import { AppStateType } from "../../redux/redux-store.ts";

let mapStateToProps = (state: AppStateType) => {
    return {
        dialogsPage: state.dialogsPage
    }
}

export default compose(
    connect(mapStateToProps, {...actions}),
    withAuthRedirect
)(Dialogs)