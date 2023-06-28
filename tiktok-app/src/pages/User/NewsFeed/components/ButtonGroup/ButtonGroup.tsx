import CircleButton from '@/components/CircleButton';
import { IVideo } from '@/interfaces/interfaces';
import { useEffect, useState } from 'react';
import axiosInstance from '@/libs/axios/axiosConfig';
import useModal from '@/hooks/useModal';
import useDebounce from '@/hooks/useDebounce'
interface INavigateProps {
  handleNavigate: () => void;
  video: IVideo;
}

const ButtonGroup = (props: INavigateProps) => {
  const { handleNavigate, video } = props;
  const { currentUser } = useModal()
  const [isLike, setIsLike] = useState(currentUser ? video.like.includes(currentUser._id) : false)
  const [numberLike, setNumberLike] = useState(video.like.length)
  const debounce = useDebounce((video, currentUser) => {
    axiosInstance.put('/accounts/like', {
      likedVideoId: video._id,
      userLikeId: currentUser._id
    })
  }, 500)

  useEffect(() => {
    if (currentUser) {
      if (video.like.includes(currentUser._id)) {
        setIsLike(true)
      }
    }
  }, [currentUser])

  return (
    <div className="flex flex-col gap-4">
      <CircleButton
        numberOfAction={numberLike}
        onClick={async () => {
          if (isLike) {
            setNumberLike((prev: number) => prev - 1)
          } else {
            setNumberLike((prev: number) => prev + 1)
          }
          debounce(video, currentUser)
          setIsLike(!isLike)

        }}
      >
        <i className={`fas fa-heart ${isLike ? 'text-red-500' : ''}`}></i>
      </CircleButton>
      <CircleButton
        numberOfAction={video.comment.length}
        onClick={handleNavigate}
      >
        <i className="fas fa-comment-dots"></i>
      </CircleButton>
      {/* <CircleButton numberOfAction={20}>
        <i className="fas fa-bookmark"></i>
      </CircleButton>
      <CircleButton numberOfAction={20}>
        <i className="fas fa-share"></i>
      </CircleButton> */}
    </div>
  );
};

export default ButtonGroup;
