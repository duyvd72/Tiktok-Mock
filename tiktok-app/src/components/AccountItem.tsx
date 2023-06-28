import React from 'react'
import { IAccountItem } from '@/interfaces/interfaces'
import { useNavigate } from 'react-router-dom'

const AccountItem: React.FC<IAccountItem> = ({ avatarUrl, nickname, fullname, userId, search }) => {
    const navigate = useNavigate()
    return (
        <article className={`flex ${search && 'hover:bg-slate-50'}  cursor-pointer`} onClick={() => navigate(`/${userId}`)}>
            <div className='flex items-center'>
                {avatarUrl ?
                    <img className={`${search ? 'm-2 h-[60px] w-[60px]' : 'h-[30px] w-[30px]'}  rounded-full`} src={avatarUrl} />
                    :
                    <i className={` fa fa-user ${search ? 'm-2 h-[60px] w-[60px]' : 'h-[30px] w-[30px]'}  ring-1 rounded-full text-gray-300 flex justify-center items-center `}></i>
                }
            </div>
            <div className='ms-3 flex flex-col justify-center'>
                <p className='font-bold text-md'>{nickname}</p>
                <p className='text-sm'>{fullname}</p>
            </div>
        </article>
    )
}

export default AccountItem