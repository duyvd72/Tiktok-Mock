import CircleButton from '@/components/CircleButton';
import { IVideo } from '@/interfaces/interfaces';
import { useEffect, useState } from 'react';
import useModal from '@/hooks/useModal';
import { handleLike } from '@/api/userAPIs';
interface INavigateProps {
  handleNavigate: () => void;
  video: IVideo;
}

const ButtonGroup = (props: INavigateProps) => {
  const { handleNavigate, video } = props;
  const { currentUser, setModalIsOpen } = useModal()
  const [isLike, setIsLike] = useState(currentUser ? video.like.includes(currentUser._id) : false)
  const [numberLike, setNumberLike] = useState(video.like.length)
  const [isLoading, setIsLoading] = useState(false)

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
          if (currentUser && currentUser._id) {
            if (isLike) {
              setNumberLike((prev: number) => prev - 1)
            } else {
              setNumberLike((prev: number) => prev + 1)
            }
            setIsLike(!isLike)
            setIsLoading(true)
            await handleLike(video._id, currentUser._id)
            setIsLoading(false)
          } else {
            setModalIsOpen(true)
          }
        }}
        isLoading={isLoading}
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
