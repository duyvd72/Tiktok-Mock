import { ChangeEvent, useState } from 'react';
import VideoTableItem from './VideoTableItem';
import LikeModal from './LikeModal';
import { IVideo } from '@/interfaces/interfaces';

interface IProps {
  videoList?: IVideo[];
}

const VideoTable = (props: IProps) => {
  const { videoList } = props;
  const [isLikeModalOpen, setIsLikeModalOpen] = useState(false);

  const defaultFormQuantity = 2;
  const [quantity, setQuantity] = useState(defaultFormQuantity);

  const [activePage, setActivePage] = useState(1);

  const handlePageClick = (pageQuantity: number) => {
    setActivePage(pageQuantity);
  };

  const startIndex = (activePage - 1) * quantity;
  const endIndex = startIndex + quantity;
  const customList = videoList?.slice(startIndex, endIndex);

  const pageQuantity = Math.ceil(Number(videoList?.length) / quantity);
  const renderPageItems = () => {
    return Array.from({ length: pageQuantity }, (_, index) => {
      const pageNumber = index + 1;
      const isActive = pageNumber === activePage;

      return (
        <button
          key={pageNumber}
          className={`${
            isActive ? 'bg-blue-500 text-white' : 'text-black'
          } font-bold px-2 rounded-sm border`}
          onClick={() => handlePageClick(pageNumber)}
        >
          {pageNumber}
        </button>
      );
    });
  };

  const handlePreBtn = () => {
    if (activePage !== 1) {
      setActivePage(activePage - 1);
    }
  };

  const handleNextBtn = () => {
    if (activePage !== pageQuantity) {
      setActivePage(activePage + 1);
    }
  };

  const hanldeChangeQuantity = (e: ChangeEvent<HTMLSelectElement>) => {
    setQuantity(Number(e.target.value));
    setActivePage(1);
  };

  return (
    <div className="relative">
      {isLikeModalOpen && <LikeModal />}
      <table className="w-full border border-gray-300 p-3">
        <thead>
          <tr className="table-success bg-gray-300">
            <th className="text-center border w-[25%]">Video</th>
            <th className="text-center border w-[25%]">Id</th>
            <th className="text-center border w-[25%]">Ngày đăng</th>
            <th className="text-center border w-[25%]">Số like (Ấn để xem)</th>
          </tr>
        </thead>
        <tbody>
          {customList?.map((video) => {
            return (
              <VideoTableItem
                key={video._id}
                video={video}
                setIsLikeModalOpen={setIsLikeModalOpen}
              />
            );
          })}
        </tbody>
      </table>

      <div className="flex mt-5 justify-center items-center gap-5">
        <div className="mb-0 flex gap-2">
          <button
            disabled={activePage === 1}
            onClick={handlePreBtn}
            className="border px-1 rounded-sm disabled:bg-gray-300 disabled:text-white"
          >
            Trang trước
          </button>
          {renderPageItems()}
          <button
            className="border px-1 rounded-sm disabled:bg-gray-300 disabled:text-white"
            disabled={activePage === pageQuantity}
            onClick={handleNextBtn}
          >
            Trang tiếp
          </button>
        </div>
        <div className="flex items-center gap-2">
          <select
            className="border rounded-md me-3"
            id="select-quantity"
            style={{ width: '5rem' }}
            value={quantity}
            onChange={hanldeChangeQuantity}
          >
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={4}>4</option>
            <option value={6}>6</option>
          </select>
          <label htmlFor="select-quantity">Video/Trang</label>
        </div>
      </div>
    </div>
  );
};

export default VideoTable;
