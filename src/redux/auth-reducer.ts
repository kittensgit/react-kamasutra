//@ts-ignore
import { ResultCodeEnumForCaptcha, ResultCodesEnum } from "../api/api.ts";
//@ts-ignore
import { authAPI } from "../api/auth-api.ts";
//@ts-ignore
import { securityAPI } from "../api/security-api.ts";
import { ThunkAction } from "redux-thunk";
import { AppStateType, InferActionsType } from "./redux-store";

export type InitialStateType2 = {
    userId: number | null,
    email: string | null,
    login: string | null,
    isAuth: boolean,
    captchaUrl: string | null
}

let initialState = {
    userId: null as number | null,
    email: null as string | null,
    login: null as string | null,
    isAuth: false,
    captchaUrl: null as string | null
}

export type InitialStateType = typeof initialState;

const authReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case 'SET_USER_DATA':
            return {
                ...state,
                ...action.payload
            }
        case 'GET_CAPTCHA_URL_SUCCESS':
            return {
                ...state,
                ...action.payload
            }
        default:
            return state;
    }
}

type ActionsTypes = InferActionsType<typeof actions>;
type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes>

export const actions = {
    setAuthUserData: (userId: number | null, email: string | null, login: string | null, isAuth: boolean): any => ({
        type: 'SET_USER_DATA',
        payload: { userId, email, login, isAuth }
    } as const),
    getCaptchaUrlSuccess: (captchaUrl: string): any => ({
        type: 'GET_CAPTCHA_URL_SUCCESS',
        payload: { captchaUrl }
    } as const)
}

export const getAuthUserData = (): ThunkType => async (dispatch) => {
    let meData = await authAPI.me()
    if (meData.resultCode === ResultCodesEnum.Success) {
        let { id, email, login } = meData.data;
        dispatch(actions.setAuthUserData(id, email, login, true))
    }

}

export const login = (email: string, password: string, rememberMe: boolean, captcha: string | null, setStatus: any): ThunkType => async (dispatch) => {
    let loginData = await authAPI.login(email, password, rememberMe, captcha);
    if (loginData.resultCode === ResultCodesEnum.Success) {
        dispatch(getAuthUserData())
    } else {
        if (loginData.resultCode === ResultCodeEnumForCaptcha.CaptchaIsRequired) {
            dispatch(getCaptchaUrl())
        }
        setStatus(loginData.messages)
    }
}

export const getCaptchaUrl = (): ThunkType => async (dispatch) => {
    const captchaData = await securityAPI.getCaptchaUrl();
    dispatch(actions.getCaptchaUrlSuccess(captchaData.url))
}

export const logout = (): ThunkType => async (dispatch) => {
    let logoutData = await authAPI.logout();
    if (logoutData.resultCode === ResultCodesEnum.Error) {
        dispatch(actions.setAuthUserData(null, null, null, false))
    }
}

export default authReducer;