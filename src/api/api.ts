import axios from "axios"
import { ProfileType } from "../types/types"

const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {
        'API-KEY': 'af568e28-0281-4b25-a3db-271c594f4039'
    }
});

export const usersAPI = {
    getUsers(currentPage = 1, pageSize = 10) {
        return instance.get(`users?page=${currentPage}&count=${pageSize}`)
            .then(response => response.data)
    },
    follow(id: number) {
        return instance.post(`follow/${id}`).then(response => response.data.resultCode)
    },
    unfollow(id: number) {
        return instance.delete(`follow/${id}`).then(response => response.data.resultCode)
    },
    getProfile(userId: number) {
        console.warn('obs method. pls use profileAPI')
        return profileAPI.getProfile(userId)
    }
}

export const profileAPI = {
    getProfile(userId: number) {
        return instance.get(`profile/${userId}`).then(response => response.data);
    },
    getStatus(userId: number) {
        return instance.get(`profile/status/` + userId)
    },
    updateStatus(status: string) {
        return instance.put(`profile/status`, { status: status })
    },
    savePhoto(photoFile: any) {
        const formData = new FormData();
        formData.append("image", photoFile)
        return instance.put('profile/photo', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
    },
    saveProfile(profile: ProfileType) {
        return instance.put(`profile`, profile)
    }
}

export enum ResultCodesEnum {
    Success = 0,
    Error = 1
}

export enum ResultCodeEnumForCaptcha {
    CaptchaIsRequired = 10
}

type MeResponseType = {
    data: {
        id: number
        email: string
        login: string
    }
    resultCode: ResultCodesEnum
    messages: Array<string>
}

type LoginResponseType = {
    data: {
        userId: number
    }
    resultCode: ResultCodesEnum | ResultCodeEnumForCaptcha
    messages: Array<string>
}

type LogoutResponseType = {
    data: {}
    resultCode: ResultCodesEnum
    messages: Array<string>
}

type CaptchaResponseType = {
    url: string
}

export const authAPI = {
    me() {
        return instance.get<MeResponseType>(`auth/me`).then(res => res.data);
    },
    login(email: string, password: string, rememberMe = false, captcha: null | string = null) {
        return instance.post<LoginResponseType>(`auth/login`, { email, password, rememberMe, captcha }).then(res => res.data)
    },
    logout() {
        return instance.delete<LogoutResponseType>(`auth/login`).then(res => res.data)
    }
}

export const securityAPI = {
    getCaptchaUrl() {
        return instance.get<CaptchaResponseType>(`security/get-captcha-url`).then(res => res.data);
    }
}
