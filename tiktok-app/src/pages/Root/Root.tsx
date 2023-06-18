import { Outlet } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import SideBar from '../../components/SideBar';
import ScrollToTop from '@/components/ScrollToTop';

const Root = () => {
  return (
    <div>
      <Navbar />
      <div className="flex h-[calc(100vh-66px)] mt-[66px]">
        <SideBar />
        <div className="p-5 relative ms-[260px] w-full">
          <Outlet />
          <div className="fixed bottom-10 right-10">
            <ScrollToTop />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Root;
