import { ChangeEvent, useState } from 'react';
import UserTableItem from './UserTableItem';
import { useAppSelector } from '@/redux/hooks';

const UserTable = () => {
  const userList = useAppSelector((state) => state.userManagement.userList);

  const userListWithoutAdmin = userList.filter((user) => user.role !== 'admin');

  const defaultFormQuantity = 4;
  const [quantity, setQuantity] = useState(defaultFormQuantity);

  const [activePage, setActivePage] = useState(1);

  const handlePageClick = (pageQuantity: number) => {
    setActivePage(pageQuantity);
  };

  const startIndex = (activePage - 1) * quantity;
  const endIndex = startIndex + quantity;
  const customList = userListWithoutAdmin.slice(startIndex, endIndex);

  const pageQuantity = Math.ceil(userListWithoutAdmin.length / quantity);
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
    <div>
      <table className="w-full border border-gray-300 p-3">
        <thead>
          <tr className="table-success bg-gray-300">
            <th className="text-center border w-[calc(100%/6)]">Id</th>
            <th className="text-center border w-[calc(100%/6)]">Nickname</th>
            <th className="text-center border w-[calc(100%/6)]">Full Name</th>
            <th className="text-center border w-[calc(100%/6)]">
              Ngày tạo tài khoản
            </th>
            <th className="text-center border w-[calc(100%/6)]">Số video</th>
            <th className="text-center border w-[calc(100%/6)]">Hành động</th>
          </tr>
        </thead>
        <tbody>
          {customList.map((user) => {
            return <UserTableItem key={user._id} user={user} />;
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
            <option value={2}>2</option>
            <option value={4}>4</option>
            <option value={6}>6</option>
          </select>
          <label htmlFor="select-quantity">User/Trang</label>
        </div>
      </div>
    </div>
  );
};

export default UserTable;
