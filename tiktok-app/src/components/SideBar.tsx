import { NavLink } from 'react-router-dom';
import Footer from './Footer';
import useModal from '@/hooks/useModal';
const SideBar = () => {

  const { setModalIsOpen } = useModal()
  return (
    <div className="flex flex-col p-3 w-[260px] overflow-auto">
      <div className="flex flex-col">
        <NavLink className="font-bold py-2 px-3 text-[18px]" to="/">
          <i className="fas fa-home me-3"></i>Dành cho bạn
        </NavLink>
        <NavLink className="font-bold py-2 px-3 text-[18px]" to="/following">
          <i className="fas fa-user-friends me-3"></i>Đang Follow
        </NavLink>
        <NavLink className="font-bold py-2 px-3 text-[18px]" to="/explore">
          <i className="far fa-compass me-3"></i>Khám phá
        </NavLink>
        <NavLink className="font-bold py-2 px-3 text-[18px]" to="/live">
          <i className="fas fa-video me-3"></i>LIVE
        </NavLink>
      </div>
      <div className="p-3 flex flex-col gap-3 border-t-[1px]">
        <p className="text-gray-400">
          Đăng nhập để follow các tác giả, thích video và xem bình luận.
        </p>
        <button
          className="border border-[#fe2c55] text-[#fe2c55] font-bold p-3
            rounded-md hover:bg-[#fe2c550f]"
          onClick={() => setModalIsOpen(true)}
        >
          Đăng nhập
        </button>
      </div>
      <Footer />
    </div>
  );
};

export default SideBar;
