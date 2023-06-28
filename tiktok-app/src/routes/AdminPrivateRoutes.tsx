import { getAccessToken } from '@/utils/accessTokenLS';
import { Navigate } from 'react-router';
import jwt_decode from 'jwt-decode';

interface IProps {
  children: JSX.Element;
}

export interface IDecodeToken {
  exp: number;
  iat: number;
  id: string;
  refreshToken: string;
  role: string;
}

const AdminPrivateRoutes = (props: IProps) => {
  const { children } = props;
  const token = getAccessToken();

  if (token !== null) {
    const decodeToken: IDecodeToken = jwt_decode(token);
    const role = decodeToken.role;

    if (role !== 'admin') {
      return <Navigate to="/" />;
    }
  } else if (token === null) {
    return <Navigate to="/" />;
  }

  return children;
};

export default AdminPrivateRoutes;
