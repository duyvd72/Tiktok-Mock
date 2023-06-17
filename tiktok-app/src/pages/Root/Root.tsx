import { Outlet } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import SideBar from '../../components/SideBar';

const Root = () => {
  return (
    <div>
      <Navbar />
      <div className="flex h-[calc(100vh-66px)]">
        <SideBar />
        <div className="w-[calc(100vw-260px)] p-5 flex">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Root;
