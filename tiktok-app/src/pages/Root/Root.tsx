import { Outlet } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import SideBar from '../../components/SideBar';
import LoginModal from '@/components/LoginModal';
import useModal from '@/hooks/useModal';
const Root = () => {
  const { modalIsOpen } = useModal();
  console.log('render root');

  return (
    <div>
      <Navbar />
      <div className="flex h-[calc(100vh-66px)] mt-[66px]">
        <SideBar />
        <div className="p-5 relative ms-[260px] w-full">
          <Outlet />
        </div>
        {modalIsOpen && <LoginModal />}
      </div>
    </div>
  );
};

export default Root;
