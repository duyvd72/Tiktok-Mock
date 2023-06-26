import CircleButton from '@/components/CircleButton';
import { IVideo } from '@/interfaces/interfaces';

interface INavigateProps {
  handleNavigate: () => void;
  video: IVideo;
}

const ButtonGroup = (props: INavigateProps) => {
  const { handleNavigate, video } = props;

  return (
    <div className="flex flex-col gap-4">
      <CircleButton
        numberOfAction={video.like.length}
        onClick={() => console.log('like')}
      >
        <i className="fas fa-heart"></i>
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
