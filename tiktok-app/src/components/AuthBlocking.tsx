import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { getAccessToken, setAccessToken } from '@/utils/accessTokenLS';
import useModal from '@/hooks/useModal';
import Navbar from './Navbar';
import NewsFeed from '@/pages/User/NewsFeed/NewsFeed';
import SideBar from './SideBar';
import jwt from 'jwt-decode';
import LoginModal from './LoginModal';

interface IUser {
  id: string;
  refreshToken: string;
  role: string;
}

interface IAuthBlocking {
  children: React.ReactNode;
}

interface IError {
  status: string;
  error: {
    name: string;
    message: string;
  };
  [key: string]: any;
}

const AuthBlocking: React.FC<IAuthBlocking> = ({ children }) => {
  const [auth, setAuth] = useState(false);
  const { setCurrentUser, modalIsOpen } = useModal();

  const validateToken = (token: string) => {
    axios
      .get('http://localhost:3005/accounts/validatetoken', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setCurrentUser(res.data);
        setAuth(true);
      })
      .catch((err: IError) => {
        console.log('err', err);

        if (
          err.response &&
          err.response.data.error.message !== 'invalid token'
        ) {
          const currentToken: IUser = jwt(token);
          axios
            .get('http://localhost:3005/accounts/refreshToken', {
              headers: {
                Authorization: `Bearer ${currentToken.refreshToken}`,
              },
            })
            .then((res) => {
              setAccessToken(res.data.accessToken);
              setCurrentUser(res.data.user);
              setAuth(true);
            })
            .catch((err) => {
              setCurrentUser(null);
              setAuth(false);
            });
        } else {
          setCurrentUser(null);
          setAuth(false);
        }
      });
  };

  useEffect(() => {
    const token = getAccessToken();
    if (token) {
      validateToken(token);
    }
  }, []);

  if (!auth) {
    return (
      <div>
        <Navbar />
        <div className="flex h-[calc(100vh-66px)] mt-[66px]">
          <SideBar />
          <div className="p-5 relative ms-[260px] w-full">
            <NewsFeed />
          </div>
          {modalIsOpen && <LoginModal />}
        </div>
      </div>
    );
  }

  return <main>{children}</main>;
};

export default AuthBlocking;
