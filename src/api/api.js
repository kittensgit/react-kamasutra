import axios from "axios"

const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {
        'API-KEY': 'af568e28-0281-4b25-a3db-271c594f4039'
    }
})

export const usersAPI = {
    getUsers(currentPage = 1, pageSize = 10) {
        return instance.get(`users?page=${currentPage}&count=${pageSize}`)
            .then(response => response.data)
    }
}

export const followAPI = {
    postFollow(id) {
        return instance.post(`follow/${id}`).then(response => response.data.resultCode)
    }
}


export const unfollowAPI = {
    deleteFollow(id) {
        return instance.delete(`follow/${id}`).then(response => response.data.resultCode)
    }
}

export const profileAPI = {
    getUserProfile(userId) {
        return instance.get(`profile/${userId}`).then(response => response.data);
    }
}

export const authAPI = {
    getAuthUserData(){
        return instance.get(`auth/me`).then(response => response.data)
    }
}
