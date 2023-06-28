import React from 'react';
import video from '@/assets/video/Download.mp4';

interface IProps {
  setIsLikeModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const VideoTableItem = (props: IProps) => {
  const { setIsLikeModalOpen } = props;
  // const [isCommentModalOpen, setIsCommentModalOpen] = useState(false);

  const handleLikeModal = () => {
    setIsLikeModalOpen(true);
  };

  return (
    <tr className="w-full text-center h-12">
      <td className="border flex justify-center">
        <div className="w-[200px] h-auto">
          <video src={video}></video>
        </div>
      </td>
      <td className="border">2134</td>
      <td className="border">28/06/2023</td>
      <td className="border">
        <button
          className="hover:border-b-[1px] border-gray-500"
          onClick={handleLikeModal}
        >
          100
        </button>
      </td>
      <td className="border">
        <button className="hover:border-b-[1px] border-gray-500">200</button>
      </td>
    </tr>
  );
};

export default VideoTableItem;
