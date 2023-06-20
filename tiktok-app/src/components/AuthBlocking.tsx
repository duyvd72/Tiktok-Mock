import React, { useState, useEffect } from "react"
import LOCALSTORAGE from "@/util/LocalStorage"
import axios from "axios"

interface IAuthBlocking {
    children: React.ReactNode
}

const AuthBlocking: React.FC<IAuthBlocking> = ({ children }) => {

    const [auth, setAuth] = useState(false)

    const validateToken = (token: string) => {
        axios.get('/accounts/validatetoken', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(res => {
                if (res.data.id) {
                    setAuth(true)
                }
            })
            .catch(err => {
                console.log('err', err)
            })

    }

    useEffect(() => {
        const token = LOCALSTORAGE.getToken()
        if (token) {
            validateToken(token)
        }
    })

    if (!auth) {
        return <div>...You need to login first</div>
    }

    return <main>{children}</main>
}

export default AuthBlocking