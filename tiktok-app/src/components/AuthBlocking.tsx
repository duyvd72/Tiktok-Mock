import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { getAccessToken, setAccessToken } from '@/utils/accessTokenLS';
import useModal from '@/hooks/useModal';
import NewsFeed from '@/pages/User/NewsFeed/NewsFeed';
import jwt from 'jwt-decode';
import { useLocation } from 'react-router-dom';
interface IUser {
  id: string;
  refreshToken: string;
  role: string;
}

interface IAuthBlocking {
  children: React.ReactNode;
  whenRefresh?: boolean
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
  const location = useLocation()
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
        if (
          err.response &&
          err.response.data.error.message !== 'invalid token'
        ) {
          const currentToken: IUser = jwt(token);
          axios
            .get(`${import.meta.env.VITE_BACKEND_URL}/accounts/refreshToken`, {
              headers: {
                Authorization: `Bearer ${currentToken.refreshToken}`,
              },
            })
            .then((res) => {
              setModalIsOpen(false)
              setAccessToken(res.data.accessToken);
              setCurrentUser(res.data.user);
              setAuth(true);
            })
            .catch(() => {
              if (!whenRefresh) {
                setModalIsOpen(true)
              }
              setCurrentUser(null);
              setAuth(false);
            });
        } else {
          if (!whenRefresh) {
            setModalIsOpen(true)
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
      if (!whenRefresh)
        setModalIsOpen(true)
    }
  }, [location]);

  if (!auth) {
    return (<NewsFeed />)
  }

  return <main>{children}</main>;
};

export default AuthBlocking;
