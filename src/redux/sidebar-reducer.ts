let initialState = {}

type InitialStateType = typeof initialState;

const sidebarReduser = (state = initialState, action: any):InitialStateType =>{
    return state;
}

export default sidebarReduser;