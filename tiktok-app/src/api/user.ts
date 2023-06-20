import axios from '@/config/index'
import { AxiosResponse } from 'axios'

interface User {
    username: string
    password: string
    avatarUrl: string
    bio: string,
    fullname: string,
    nickname: string
}
const fetchAPI = async (apiCall: AxiosResponse) => {
    try {
        return await apiCall
    } catch (error) {
        throw new Error(`${error}`)
    }
}

export default class USER {

    static REGISTER = async (data: Partial<User>) => await fetchAPI(axios.post('accounts/register', data))
    static LOGIN = async (data: Partial<User>) => await fetchAPI(axios.post('accounts/login', data))
    // // static VALIDATE_TOKEN = async (token: string) => await fetchAPI(axios.get('/accounts/validatetoken',
    //     {
    //         headers: {
    //             'Authorization': `Bearer ${token}`
    //         }
    //     }))

}
