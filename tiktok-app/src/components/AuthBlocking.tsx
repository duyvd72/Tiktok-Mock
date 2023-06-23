import React, { useState, useEffect } from "react"
import axios from "axios"
import { getAccessToken } from "@/utils/accessTokenLS"
import useModal from "@/hooks/useModal"
import jwt from 'jwt-decode'
import Navbar from "./Navbar"
import NewsFeed from "@/pages/User/NewsFeed/NewsFeed"
import SideBar from "./SideBar"
import LoginModal from "./LoginModal"

interface IAuthBlocking {
    children: React.ReactNode
}

const AuthBlocking: React.FC<IAuthBlocking> = ({ children }) => {

    const [auth, setAuth] = useState(false)
    const { setCurrentUser, modalIsOpen } = useModal()

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
        const token = getAccessToken()
        if (token) {
            setCurrentUser(jwt(token))
            setAuth(true)
        }
    }, [])


    if (!auth) {
        return <div>
            <Navbar />
            <div className="flex h-[calc(100vh-66px)] mt-[66px]">
                <SideBar />
                <div className="p-5 relative ms-[260px] w-full">
                    <NewsFeed />
                </div>
                {modalIsOpen && <LoginModal />}
            </div>

        </div>
    }

    return <main>{children}</main>
}

export default AuthBlocking