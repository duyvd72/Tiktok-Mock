import React from 'react';
import { NavLink } from 'react-router-dom';
import logo from '@/assets/images/logo.png';

const AdminNavbar = () => {
  return (
    <div className="flex justify-between items-center p-3 border-b-[1px] bg-white fixed w-full z-50 top-0">
      <div className="flex-1">
        <NavLink to="/admin">
          <img className="w-auto h-[35px]" src={logo} alt="" />
        </NavLink>
      </div>

      <div className="justify-end">
        <p>
          Chào mừng quay trở lại, <strong>{'Manager 1'}</strong>
        </p>
      </div>
    </div>
  );
};

export default AdminNavbar;
