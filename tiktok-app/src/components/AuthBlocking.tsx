import React, { useState, useEffect, memo } from 'react';
import axios from 'axios';
import { getAccessToken, setAccessToken } from '@/utils/accessTokenLS';
import useModal from '@/hooks/useModal';
import NewsFeed from '@/modules/User/NewsFeed/NewsFeed';
import jwt from 'jwt-decode';
import { useLocation, useNavigate } from 'react-router-dom';
interface IUser {
  id: string;
  refreshToken: string;
  role: string;
}

interface IAuthBlocking {
  children: React.ReactNode;
  whenRefresh?: boolean;
}

interface IError {
  status: string;
  error: {
    name: string;
    message: string;
  };
  [key: string]: any;
}

const AuthBlocking: React.FC<IAuthBlocking> = ({ children, whenRefresh }) => {
  const [auth, setAuth] = useState(false);
  const { setCurrentUser, setModalIsOpen } = useModal();
  const navigate = useNavigate();
  const location = useLocation();

  const validateToken = (token: string) => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/accounts/validatetoken`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setCurrentUser(res.data);
        setAuth(true);
      })
      .catch((err: IError) => {
        if (err.response.data.error.message == 'jwt expired') {
          const currentToken: IUser = jwt(token);
          axios
            .get(`${import.meta.env.VITE_BACKEND_URL}/accounts/refreshToken`, {
              headers: {
                Authorization: `Bearer ${currentToken.refreshToken}`,
              },
            })
            .then((res) => {
              setModalIsOpen(false);
              setAccessToken(res.data.accessToken);
              setCurrentUser(res.data.user);
              setAuth(true);
            })
            .catch(() => {
              if (!whenRefresh) {
                setModalIsOpen(true);
                navigate('/');
              }
              setCurrentUser(null);
              setAuth(false);
            });
        } else {
          if (!whenRefresh) {
            setModalIsOpen(true);
            navigate('/');
          }
          setCurrentUser(null);
          setAuth(false);
        }
      });
  };

  useEffect(() => {
    const token = getAccessToken();
    if (token) {
      validateToken(token);
    } else {
      if (!whenRefresh) {
        navigate('/');
        setModalIsOpen(true);
      }
    }
  }, [location]);

  if (!auth && !getAccessToken()) {
    return <NewsFeed />;
  }
  return <main>{children}</main>;
};

export default memo(AuthBlocking);
