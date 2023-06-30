import { removeAccessToken } from '@/utils/accessTokenLS';
import { NavLink, useNavigate } from 'react-router-dom';

const AdminSidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    removeAccessToken();
    navigate('/');
    location.reload();
  };

  return (
    <div className="flex flex-col w-[260px] h-[calc(100vh-66px)] overflow-auto fixed z-50 border-e-[1px]">
      <div className="flex flex-col">
        <NavLink
          className="font-bold py-2 px-3 text-[18px] border-b-[1px]"
          to="home"
        >
          <i className="fas fa-home me-3"></i>Home
        </NavLink>
        <NavLink
          className="font-bold py-2 px-3 text-[18px] border-b-[1px]"
          to="user-management"
        >
          <i className="fas fa-user me-3"></i>Quản Lý Người Dùng
        </NavLink>
        <button
          className="flex self-center py-2 px-3 text-[18px] border 
            mt-5 border-[#fe2c55] text-[#fe2c55] font-bold hover:bg-[#fe2c550f] rounded-[4px]"
          onClick={handleLogout}
        >
          Đăng xuất
        </button>
      </div>
    </div>
  );
};

export default AdminSidebar;
