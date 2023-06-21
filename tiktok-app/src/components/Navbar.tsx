import logo from '../assets/images/logo.png';
import { NavLink, useNavigate } from 'react-router-dom';
import useModal from '@/hooks/useModal';
import defaultAva from '@/assets/images/default-ava.png';

const Navbar = () => {
  const { setModalIsOpen } = useModal();
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const handleUploadBtn = () => {
    navigate('/upload');
  };

  const onSignIn = () => {
    setModalIsOpen(true);
  };

  const handleProfileBtn = () => {
    navigate('/userId');
  };

  const onChat = () => {
    navigate('/chat');
  };

  return (
    <div className="flex justify-between items-center p-3 border-b-[1px] bg-white fixed w-full z-50 top-0">
      <div className="flex-1">
        <NavLink to="/">
          <img className="w-[120px] h-auto" src={logo} alt="" />
        </NavLink>
      </div>
      <div className="flex flex-1 justify-center">
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
      <div className="flex flex-1 gap-5 justify-end">
        <button
          className="border px-2 py-1 rounded-[4px] font-bold hover:bg-[#12141d10]"
          onClick={handleUploadBtn}
        >
          <i className="fas fa-plus me-3"></i>Tải lên
        </button>
        {token == null ? (
          <button
            className="border px-2 py-1 rounded-[4px]
            bg-[#fe2c55] hover:bg-[#e32b50] text-white font-bold"
            onClick={() => onSignIn()}
          >
            Đăng nhập
          </button>
        ) : (
          <div className="flex items-center gap-5">
            <button onClick={onChat}>
              <i className="far fa-comment-alt text-xl"></i>
            </button>
            <div className="relative group">
              <img src={defaultAva} alt="" className="w-[40px] h-[40px]" />
              <div className="absolute right-0 w-[100px] bg-red-400 hidden group-hover:block rounded-md">
                <button className="p-2" onClick={handleProfileBtn}>
                  My Profile
                </button>
                <button className="p-2">Logout</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
