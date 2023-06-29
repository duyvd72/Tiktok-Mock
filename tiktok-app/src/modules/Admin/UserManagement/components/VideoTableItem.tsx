import React from 'react';
import { IVideo } from '@/interfaces/interfaces';
import { convertDateFormat } from '@/utils/formateDate';

interface IProps {
  video: IVideo;
  setIsLikeModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const VideoTableItem = (props: IProps) => {
  const { video, setIsLikeModalOpen } = props;
  // const [isCommentModalOpen, setIsCommentModalOpen] = useState(false);

  const handleLikeModal = () => {
    setIsLikeModalOpen(true);
  };

  return (
    <tr className="w-full text-center h-12">
      <td className="border flex justify-center">
        <div className="w-[200px] h-auto">
          <video src={video.videoUrl}></video>
        </div>
      </td>
      <td className="border">{video._id}</td>
      <td className="border">{convertDateFormat(video.createdAt)}</td>
      <td className="border">
        <button
          className="hover:border-b-[1px] border-gray-500"
          onClick={handleLikeModal}
        >
          {video.like.length}
        </button>
      </td>
    </tr>
  );
};

export default VideoTableItem;
