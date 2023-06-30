import { NavLink } from 'react-router-dom';
import logo from '@/assets/images/logo.png';
import { getAccessToken } from '@/utils/accessTokenLS';
import jwt_decode from 'jwt-decode';
import { IDecodeToken } from '@/interfaces/interfaces';

const AdminNavbar = () => {
  const token = getAccessToken();
  const decodeToken: IDecodeToken = jwt_decode(token as string);

  return (
    <div className="flex justify-between items-center p-3 border-b-[1px] bg-white fixed w-full z-50 top-0">
      <div className="flex-1">
        <NavLink to="/admin">
          <img className="w-auto h-[35px]" src={logo} alt="" />
        </NavLink>
      </div>

      <div className="justify-end">
        <p>
          Chào mừng quay trở lại, <strong>{decodeToken.nickname}</strong>
        </p>
      </div>
    </div>
  );
};

export default AdminNavbar;
