import React, { ChangeEvent, useState } from 'react';
import { useNavigate } from 'react-router';
import UserTableItem from './UserTableItem';
import VideoTableItem from './VideoTableItem';
import LikeModal from './LikeModal';

const VideoTable = () => {
  const [searchKeyword, setSearchKeyword] = useState('');
  const [isLikeModalOpen, setIsLikeModalOpen] = useState(false);

  const defaultFormQuantity = 2;
  const [quantity, setQuantity] = useState(defaultFormQuantity);

  const [activePage, setActivePage] = useState(1);

  const handlePageClick = (pageQuantity: number) => {
    setActivePage(pageQuantity);
  };

  // const filteredFormList = covidFormList.filter((form: any) => {
  //   return (
  //     form.id?.toUpperCase().includes(searchKeyword.toUpperCase()) ||
  //     form.fullname.toUpperCase().includes(searchKeyword.toUpperCase()) ||
  //     form.object.toUpperCase().includes(searchKeyword.toUpperCase()) ||
  //     form.dateOfBirth.toUpperCase().includes(searchKeyword.toUpperCase()) ||
  //     form.gender.toUpperCase().includes(searchKeyword.toUpperCase()) ||
  //     form.province.toUpperCase().includes(searchKeyword.toUpperCase())
  //   );
  // });

  const startIndex = (activePage - 1) * quantity;
  const endIndex = startIndex + quantity;
  // const customList = filteredFormList.slice(startIndex, endIndex);

  // const pageQuantity = Math.ceil(filteredFormList.length / quantity);
  // const renderPageItems = () => {
  //   return Array.from({ length: pageQuantity }, (_, index) => {
  //     const pageNumber = index + 1;
  //     const isActive = pageNumber === activePage;

  //     return (
  //       <button
  //         key={pageNumber}
  //         // active={isActive}
  //         onClick={() => handlePageClick(pageNumber)}
  //       >
  //         {pageNumber}
  //       </button>
  //     );
  //   });
  // };

  const handlePreBtn = () => {
    if (activePage !== 1) {
      setActivePage(activePage - 1);
    }
  };

  // const handleNextBtn = () => {
  //   if (activePage !== pageQuantity) {
  //     setActivePage(activePage + 1);
  //   }
  // };

  const handleChangeSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchKeyword(e.target.value);
    setActivePage(1);
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
            <th className="text-center border w-[20%]">Video</th>
            <th className="text-center border w-[20%]">Id</th>
            <th className="text-center border w-[20%]">Ngày đăng</th>
            <th className="text-center border w-[20%]">Số like (Ấn để xem)</th>
            <th className="text-center border w-[20%]">
              Số comment (Ấn để xem)
            </th>
          </tr>
        </thead>
        <tbody>
          <VideoTableItem setIsLikeModalOpen={setIsLikeModalOpen} />
          <VideoTableItem setIsLikeModalOpen={setIsLikeModalOpen} />
          <VideoTableItem setIsLikeModalOpen={setIsLikeModalOpen} />
          <VideoTableItem setIsLikeModalOpen={setIsLikeModalOpen} />
          <VideoTableItem setIsLikeModalOpen={setIsLikeModalOpen} />
        </tbody>
      </table>

      <div className="flex mt-5 justify-center items-center gap-5">
        <div className="mb-0">
          <button disabled={activePage === 1} onClick={handlePreBtn}>
            Trang trước
          </button>
          {/* {renderPageItems()} */}
          <button

          // disabled={activePage === pageQuantity}
          // onClick={handleNextBtn}
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
