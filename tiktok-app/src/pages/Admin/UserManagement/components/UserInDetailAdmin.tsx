import React from 'react';
import defaultAva from '@/assets/images/default-ava.png';
import VideoTable from './VideoTable';

const UserInDetailAdmin = () => {
  return (
    <div>
      <div className="flex justify-between w-[50%] mx-auto">
        <div>
          <img src={defaultAva} alt="" className="w-[200px]" />
        </div>
        <div>
          <p>
            <strong>Id:</strong> 12321
          </p>
          <p>
            <strong>Nickname: </strong> duyvd0702
          </p>
          <p>
            <strong>FullName: </strong> Vũ Đức Duy
          </p>
          <p>
            <strong>Số người follow: </strong> 1000
          </p>
          <p>
            <strong>Đang follow: </strong> 200
          </p>
          <p>
            <strong>Số lượng like: </strong> 6868
          </p>
          <p>
            <strong>Ngày tạo tài khoản: </strong> 28/06/2023
          </p>
        </div>
      </div>
      <h1 className="mt-5 font-bold text-xl">Danh sách video</h1>
      <div className="p-5">
        <VideoTable />
      </div>
    </div>
  );
};

export default UserInDetailAdmin;
