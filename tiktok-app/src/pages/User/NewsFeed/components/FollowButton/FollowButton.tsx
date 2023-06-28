
import { IVideo } from '@/interfaces/interfaces'
import useModal from '@/hooks/useModal'
import axiosInstance from '@/libs/axios/axiosConfig'
import { useEffect, useState } from 'react'

function FollowButton({ video }: { video: IVideo }) {

    const { currentUser } = useModal()
    const [followed, setFollowed] = useState(video.ownerVideo.follow.includes(currentUser && currentUser._id))

    useEffect(() => {
        if (currentUser) {
            if (video.ownerVideo.follow.includes(currentUser._id)) {
                setFollowed(true)
            }
        }
    }, [currentUser])
    const handleFollow = () => {
        axiosInstance.put('/accounts/follow', {
            followedUser: video.ownerVideo._id,
            userFollow: currentUser._id
        })
        setFollowed(!followed)
    }
    return (
        <button
            onClick={() => handleFollow()}
            className={`${currentUser && currentUser._id == video.ownerVideo._id ? "" : followed
                ? `font-bold border border-[rgba(22, 24, 35, 0.12)] hover:bg-[#f8f8f8] rounded-[4px] px-4`
                : `border border-[#fe2c55] px-1 text-[#fe2c55] font-bold rounded-[4px] px-8 hover:bg-[#fe2c550f]`}
            `}
        >
            {currentUser && currentUser._id == video.ownerVideo._id ? <p className='pe-28'></p> : followed ? 'Following' : 'Follow'}
        </button>
    )
}

export default FollowButton