import logo from '../assets/images/logo.png';
import { NavLink } from 'react-router-dom';
import useModal from '@/hooks/useModal';
const Navbar = () => {

  const { setModalIsOpen } = useModal()

  const onSignIn = () => {
    setModalIsOpen(true)
  }

  return (
    <div className="flex justify-between items-center p-3 border border-b-1">
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
      <div className="flex flex-1 gap-3 justify-end">
        <button className="border px-2 py-1 rounded-[4px] font-bold hover:bg-[#12141d10]">
          <i className="fas fa-plus me-3"></i>Tải lên
        </button>
        <button
          className="border px-2 py-1 rounded-[4px]
          bg-[#fe2c55] hover:bg-[#e32b50] text-white font-bold"
          onClick={() => onSignIn()}
        >
          Đăng nhập
        </button>
        <button className="px-2 py-1">
          <i className="fas fa-ellipsis-v"></i>
        </button>
      </div>
    </div>
  );
};

export default Navbar;
