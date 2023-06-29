import { Outlet } from 'react-router';
import AdminNavbar from './AdminNavbar';
import AdminSidebar from './AdminSidebar';

const AdminRoot = () => {
  return (
    <div>
      <AdminNavbar />
      <div className="flex h-[calc(100vh-66px)] mt-[62px]">
        <AdminSidebar />
        <div className="p-5 relative ms-[260px] w-full">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminRoot;
