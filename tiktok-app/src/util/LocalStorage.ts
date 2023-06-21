import jwt from 'jwt-decode'

class LOCAL {

    setToken(token: string) {
        localStorage.setItem('token', token)
    }

    getToken() {
        return localStorage.getItem('token')
    }

    removeToken() {
        localStorage.removeItem('token')
    }
}

export default new LOCAL