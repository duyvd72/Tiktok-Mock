import React from 'react'
import { IAccountItem } from '@/interfaces/interfaces'

const AccountItem: React.FC<IAccountItem> = ({ avatarUrl, nickname, fullname }) => {
    return (
        <article className='flex'>
            <div className='flex items-center'>
                {avatarUrl ?
                    <img className='h-[30px] w-[30px]' src={avatarUrl} />
                    :
                    <i className=" fa fa-user h-[30px] w-[30px] ring-1 rounded-full text-gray-300 flex justify-center items-center "></i>
                }
            </div>
            <div className='ms-3'>
                <p className='font-bold text-md'>{nickname}</p>
                <p className='text-sm'>{fullname}</p>
            </div>
        </article>
    )
}

export default AccountItem