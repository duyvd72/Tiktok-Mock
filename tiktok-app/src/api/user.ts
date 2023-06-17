import axios from '@/config/index'
import { AxiosResponse } from 'axios'

const fetchAPI = async (apiCall: AxiosResponse) => {
    try {
        return await apiCall
    } catch (error) {
        throw new Error(`${error}`)
    }
}

export default class USER {

    static REGISTER = async (data: { username: string, password: string }) => await fetchAPI(axios.post('accounts/register', data))

}
