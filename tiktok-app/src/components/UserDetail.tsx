import { createContext, useEffect, useState } from 'react';
import img from '../assets/images/comingsoon.png';
import styles from '@/styles/userDetail.module.css';
import UserDetailVideos from './UserDetailVideos';
import EditUserInfor from './EditUserInfor';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import useModal from '@/hooks/useModal';

interface IUserInfo {
  avatarUrl: string;
  nickname: string;
  fullname: string;
  bio: string;
}
export const InitialValuesContext = createContext<IUserInfo>({
  avatarUrl: '',
  nickname: '',
  fullname: '',
  bio: '',
});
const UserDetail = () => {
  const [clickLike, setClickLike] = useState(true);
  const [clickEdit, setClickEdit] = useState(false);
  const { userId } = useParams();
  const { currentUser, setCurrentUser } = useModal();

  const [initialValues, setInitialValues] = useState({
    avatarUrl: '',
    nickname: '',
    fullname: '',
    bio: '',
  });

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/accounts/searchuser/${userId}`)
      .then((response) => {
        setInitialValues({
          avatarUrl: response.data.avatarUrl,
          nickname: response.data.nickname,
          fullname: response.data.fullname,
          bio: response.data.bio,
        });
      })
      .catch((err) => console.log(err));
  }, [currentUser]);

  return (
    <InitialValuesContext.Provider value={initialValues}>
      <div className="w-full relative">
        <div className="flex flex-row">
          <div className="flex flex-row items-center w-2/5">
            <img
              src={img}
              alt="avatar"
              className="w-28 h-28 rounded-full cursor-pointer"
            />
            <div className="ml-5">
              <div className="flex items-center">
                <p className="text-2xl font-extrabold mr-2 cursor-pointer">
                  {initialValues?.nickname}
                </p>
                <svg
                  className="cursor-pointer"
                  xmlns="http://www.w3.org/2000/svg"
                  height="15"
                  width="15"
                  viewBox="0 0 448 512"
                >
                  <path d="M144 144v48H304V144c0-44.2-35.8-80-80-80s-80 35.8-80 80zM80 192V144C80 64.5 144.5 0 224 0s144 64.5 144 144v48h16c35.3 0 64 28.7 64 64V448c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V256c0-35.3 28.7-64 64-64H80z" />
                </svg>
              </div>
              <p className="text-lg	font-medium cursor-pointer">
                {initialValues?.fullname || ''}
              </p>
              {currentUser._id === userId ? (
                <button
                  className="flex items-center border rounded border-slate-950 py-1 px-5 mt-3 cursor-pointer"
                  onClick={() => setClickEdit(true)}
                >
                  <svg
                    className="cursor-pointer"
                    xmlns="http://www.w3.org/2000/svg"
                    height="18"
                    viewBox="0 0 512 512"
                  >
                    <path d="M441 58.9L453.1 71c9.4 9.4 9.4 24.6 0 33.9L424 134.1 377.9 88 407 58.9c9.4-9.4 24.6-9.4 33.9 0zM209.8 256.2L344 121.9 390.1 168 255.8 302.2c-2.9 2.9-6.5 5-10.4 6.1l-58.5 16.7 16.7-58.5c1.1-3.9 3.2-7.5 6.1-10.4zM373.1 25L175.8 222.2c-8.7 8.7-15 19.4-18.3 31.1l-28.6 100c-2.4 8.4-.1 17.4 6.1 23.6s15.2 8.5 23.6 6.1l100-28.6c11.8-3.4 22.5-9.7 31.1-18.3L487 138.9c28.1-28.1 28.1-73.7 0-101.8L474.9 25C446.8-3.1 401.2-3.1 373.1 25zM88 64C39.4 64 0 103.4 0 152V424c0 48.6 39.4 88 88 88H360c48.6 0 88-39.4 88-88V312c0-13.3-10.7-24-24-24s-24 10.7-24 24V424c0 22.1-17.9 40-40 40H88c-22.1 0-40-17.9-40-40V152c0-22.1 17.9-40 40-40H200c13.3 0 24-10.7 24-24s-10.7-24-24-24H88z" />
                  </svg>
                  <span className="ml-2 font-bold">Sửa hồ sơ</span>
                </button>
              ) : (
                <button className="items-center border rounded bg-[#fe2c55] py-1 px-8 mt-3 cursor-pointer text-white w-full">
                  Follow
                </button>
              )}
            </div>
          </div>

          <div className="w-3/5 pt-3">
            <svg
              className="cursor-pointer"
              xmlns="http://www.w3.org/2000/svg"
              height="24"
              width="24"
              viewBox="0 0 512 512"
            >
              <path d="M307 34.8c-11.5 5.1-19 16.6-19 29.2v64H176C78.8 128 0 206.8 0 304C0 417.3 81.5 467.9 100.2 478.1c2.5 1.4 5.3 1.9 8.1 1.9c10.9 0 19.7-8.9 19.7-19.7c0-7.5-4.3-14.4-9.8-19.5C108.8 431.9 96 414.4 96 384c0-53 43-96 96-96h96v64c0 12.6 7.4 24.1 19 29.2s25 3 34.4-5.4l160-144c6.7-6.1 10.6-14.7 10.6-23.8s-3.8-17.7-10.6-23.8l-160-144c-9.4-8.5-22.9-10.6-34.4-5.4z" />
            </svg>
          </div>
        </div>
        <div className="flex flex-row justify-start mt-5">
          <div>
            <strong className="mr-1 text-lg">65</strong>
            <span>Đang Follow</span>
          </div>
          <div className="mx-5">
            <strong className="mr-1 text-lg">89</strong>
            <span>Follower</span>
          </div>
          <div>
            <strong className="mr-1 text-lg">1898</strong>
            <span>Thích</span>
          </div>
        </div>
        <p className="my-2">Chưa có tiểu sử</p>
        <div className="mt-5 border-b">
          <p
            className="px-7 text-lg pb-2 video cursor-pointer inline font-bold"
            id={styles.video}
            onClick={() => setClickLike(true)}
          >
            Video
          </p>
          <div
            className="items-center px-7 cursor-pointer inline text-gray-600 font-bold"
            id={styles.like}
            onClick={() => setClickLike(false)}
          >
            <svg
              className="inline"
              xmlns="http://www.w3.org/2000/svg"
              height="15"
              width="15"
              viewBox="0 0 448 512"
              fill={clickLike ? '#475569' : '#000'}
            >
              <path d="M144 144v48H304V144c0-44.2-35.8-80-80-80s-80 35.8-80 80zM80 192V144C80 64.5 144.5 0 224 0s144 64.5 144 144v48h16c35.3 0 64 28.7 64 64V448c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V256c0-35.3 28.7-64 64-64H80z" />
            </svg>
            <span
              className={`text-lg ml-2 pb-2 ${clickLike ? '' : 'text-black'}`}
            >
              Yêu Thích
            </span>
          </div>
          <div className={`${clickLike ? styles.ddd : styles.aaa}`}></div>
        </div>
        {clickLike ? <UserDetailVideos /> : <p>chưa có video</p>}
        {clickEdit ? (
          <EditUserInfor
            setClickEdit={setClickEdit}
            setCurrentUser={setCurrentUser}
          />
        ) : (
          <div></div>
        )}
      </div>
    </InitialValuesContext.Provider>
  );
};
export default UserDetail;
