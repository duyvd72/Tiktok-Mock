import React from 'react';
import UserTable from './UserTable';

const UserManagement = () => {
  return (
    <div>
      <div className="flex justify-between">
        <div className="flex">
          <input
            className="rounded-s-full py-1.5 px-4 bg-gray-200 outline-none w-full"
            type="text"
            placeholder="Tìm kiếm"
          />
          <button
            className="bg-gray-200 text-gray-400 border-s-[1px]
          border-gray-300 rounded-e-full px-4 hover:bg-gray-300 hover:text-black"
          >
            <i className="fas fa-search "></i>
          </button>
        </div>
        <select
          className="border rounded-md border-gray-300"
          name=""
          id=""
          defaultValue={0}
        >
          <option value="0">Chọn để lọc-----------</option>
          <option value="1">Ngày tạo tài khoản mới nhất</option>
          <option value="2">Ngày tạo tài khoản cũ nhất</option>
          <option value="3">Số lượng video từ nhiều đến ít</option>
          <option value="4">Số lượng video từ ít đến nhiều</option>
        </select>
      </div>
      <div className="mt-[100px]">
        <UserTable />
      </div>
    </div>
  );
};

export default UserManagement;
