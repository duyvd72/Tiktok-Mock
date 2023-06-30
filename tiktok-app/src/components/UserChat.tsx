
import React, { memo, useMemo } from 'react'

interface IUserOnline {
    id: string,
    online: boolean,
    offline: number,
}

interface IUserChat {
    userData: { [key: string]: any }
    onlineUsers: IUserOnline[]
}

const UserChat: React.FC<IUserChat> = ({ userData, onlineUsers }) => {


    const isOnline = useMemo(() => {
        const foundIdx = onlineUsers.findIndex(item => item.id === userData._id && item.online === true)
        return foundIdx !== -1
    }, [JSON.stringify(onlineUsers)])

    const timeOffline: any = useMemo(() => {
        const foundIdx = onlineUsers.findIndex(item => item.id === userData._id && item.online === false)

        if (foundIdx >= 0) {
            return onlineUsers[foundIdx].offline
        }
    }, [JSON.stringify(onlineUsers)])

    return (
        <main className='flex cursor-pointer'>
            <div className="rounded-full bg-white m-3 flex justify-center items-center relative " >
                <div className={`rounded-full absolute right-[-5px] top-[-10px] w-[15px] h-[15px] ${isOnline ? `bg-green-600` : `bg-red-400`}`}></div>
                {userData && userData.avatarUrl ?
                    <p className='h-[50px] w-[50px]'>
                        <img src={userData.avatarUrl} className='h-[50px] w-[50px] rounded-full' alt="img" />
                    </p>
                    :
                    <i className="fa fa-user h-[50px] w-[50px] ring-1 rounded-full text-2xl text-gray-300 flex justify-center items-center "></i>
                }
            </div>
            <div className=' flex flex-col justify-center w-[190px]'>
                <p className='text-ellipsis whitespace-nowrap overflow-hidden font-bold'>{userData.fullname}</p>
                <p className='text-sm'>{isOnline ? 'Đang hoạt động' : (Date.now() - timeOffline) > 1000 * 60 * 60 * 24 ? 'Đang offline' : ((Date.now() - timeOffline) / 3600000) > 1 ? `${Math.floor((Date.now() - timeOffline) / 3600000)} giờ trước` : "Đang offline"}</p>
            </div>
        </main>
    )
}

const checkPrevProps = (prev: any, next: any) => {
    return prev.userData === next.userData && JSON.stringify(prev.onlineUsers) === JSON.stringify(next.onlineUsers)
}

export default memo(UserChat, checkPrevProps)