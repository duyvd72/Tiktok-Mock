import { createContext, useEffect, useState } from 'react';
import img from '@/assets/images/default-ava.png';
import styles from '@/styles/userDetail.module.css';
import UserDetailVideos from './UserDetailVideos';
import EditUserInfor from './EditUserInfor';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import useModal from '@/hooks/useModal';

interface IUserInfo {
  avatarUrl: string;
  nickname: string;
  fullname: string;
  bio: string;
}

interface ICurrentUserList {
  avatarUrl: string;
  bio: string;
  follow: string;
  following: string;
  fullname: string;
  myVideo: string;
  nickname: string;
  role: string;
  username: string;
  videoliked: Array<string>;
  _id: string;
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
  const [checkfollowing, setCheckfollowing] = useState(false);
  const [currentUserList, setCurrentUserList] = useState<ICurrentUserList>({
    avatarUrl: '',
    bio: '',
    follow: '',
    following: '',
    fullname: '',
    myVideo: '',
    nickname: '',
    role: '',
    username: '',
    videoliked: [],
    _id: '',
  });
  const [initialValues, setInitialValues] = useState({
    avatarUrl: '',
    nickname: '',
    fullname: '',
    bio: '',
  });
  const navigate = useNavigate();

  const handleFollowingAccount = () => {
    const payload = {
      userFollow: currentUser?._id,
      followedUser: userId,
    };
    axios
      .put(`${import.meta.env.VITE_BACKEND_URL}/accounts/follow`, payload)
      .then(() => {
        setCheckfollowing(!checkfollowing);
      })
      .catch((err) => console.error(err));
  };

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
        setCurrentUserList(response.data);
        if (currentUser.following.includes(response.data._id)) {
          setCheckfollowing(true);
        } else {
          setCheckfollowing(false);
        }
      })
      .catch((err) => console.error(err));
  }, [currentUser]);

  const handleNavigate = () => {
    navigate(`/chat`);
  };

  return (
    <InitialValuesContext.Provider value={initialValues}>
      <div className="w-full relative">
        <div className="flex flex-row">
          <div className="flex flex-row items-center">
            <img
              src={initialValues.avatarUrl ? initialValues.avatarUrl : img}
              alt="avatar"
              className="w-28 h-28 rounded-full cursor-pointer"
            />
            <div className="ml-5">
              <div className="flex items-center">
                <p className="text-2xl font-extrabold mr-2 cursor-pointer">
                  {initialValues?.nickname}
                </p>
              </div>
              <p className="text-lg	font-medium cursor-pointer">
                {initialValues?.fullname || ''}
              </p>
              {currentUser?._id === userId ? (
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
              ) : checkfollowing ? (
                <div className="flex mt-3">
                  <button
                    className={`items-center border
                          rounded border-[#fe2c55] py-1 px-8 mr-2 cursor-pointer text-[#fe2c55] font-bold w-full`}
                    onClick={handleNavigate}
                  >
                    Nhắn tin
                  </button>
                  <div className="p-2 border border-gray-300 rounded-md">
                    <svg
                      onClick={handleFollowingAccount}
                      xmlns="http://www.w3.org/2000/svg"
                      height="1em"
                      viewBox="0 0 640 512"
                    >
                      <path d="M96 128a128 128 0 1 1 256 0A128 128 0 1 1 96 128zM0 482.3C0 383.8 79.8 304 178.3 304h91.4C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7H29.7C13.3 512 0 498.7 0 482.3zM625 177L497 305c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L591 143c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z" />
                    </svg>
                  </div>
                </div>
              ) : (
                <button
                  className={`items-center border
                  rounded bg-[#fe2c55] py-1 px-8 mr-2 cursor-pointer text-white w-full`}
                  onClick={handleFollowingAccount}
                >
                  Follow
                </button>
              )}
            </div>
          </div>
        </div>
        <div className="flex flex-row justify-start mt-5">
          <div className="min-w-fit">
            <strong className="mr-1 text-lg">
              {currentUserList?.following?.length}
            </strong>
            <span>Đang Follow</span>
          </div>
          <div className="mx-5">
            <strong className="mr-1 text-lg">
              {currentUserList?.follow?.length}
            </strong>
            <span>Follower</span>
          </div>
          <div>
            <strong className="mr-1 text-lg">
              {currentUserList?.videoliked?.length}
            </strong>
            <span>Thích</span>
          </div>
        </div>
        <p className="my-2"> {currentUserList?.bio}</p>
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
            <span
              className={`text-lg ml-2 pb-2 ${clickLike ? '' : 'text-black'}`}
            >
              Yêu Thích
            </span>
          </div>
          <div className={`${clickLike ? styles.ddd : styles.aaa}`}></div>
        </div>
        {clickLike ? <UserDetailVideos /> : <UserDetailVideos isVideoliked />}
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
