import React from 'react';
import LikeItem from './LikeItem';

const LikeModal = () => {
  return (
    <div className="z-20 bg-white absolute w-[500px] h-[400px] overflow-y-auto border rounded-md">
      <div className="flex justify-between items-center px-5 py-2 border-b-[1px]">
        <h1 className="font-bold text-lg">Số like</h1>
        <button>Đóng</button>
      </div>
      <div className="p-5">
        <LikeItem />
      </div>
    </div>
  );
};

export default LikeModal;
