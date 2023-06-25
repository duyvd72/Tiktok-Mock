import { NavLink } from 'react-router-dom';
import Footer from './Footer';
import useModal from '@/hooks/useModal';
import { useEffect, useState, useMemo } from 'react';
import axiosInstance from '@/libs/axios/axiosConfig';
import { ICurrentUser, IAccountItem } from '@/interfaces/interfaces';
import AccountItem from './AccountItem';

const SideBar = () => {
  const { setModalIsOpen, currentUser } = useModal();
  const [user, setUser] = useState<ICurrentUser>();
  const [maxFollowing, setMaxFollowing] = useState(0);
  const [loadMore, setLoadMore] = useState(5);
  const [seeLess, setSeeLess] = useState(false);

  useEffect(() => {
    if (currentUser?.id) {
      (async () => {
        try {
          const reponse = await axiosInstance.get(
            `/accounts/searchuser/${currentUser.id}`
          );
          setUser(reponse.data);
          setMaxFollowing(reponse.data.following.length);
        } catch (error) {
          console.log('res', error);
        }
      })();
    }
  }, [JSON.stringify(currentUser)]);

  const onLoadMore = () => {
    if (loadMore <= maxFollowing) {
      setLoadMore((prev) => {
        if (prev + 5 > maxFollowing) {
          setSeeLess(true);
        }
        return prev + 5;
      });
    } else {
      if (seeLess) {
        setLoadMore(loadMore - 5);
        setSeeLess(false);
      } else {
        setSeeLess(true);
      }
    }
  };
  const renderFollowingAccounts: ICurrentUser[] = useMemo(() => {
    if (user && user?.following.length > 0) {
      return user.following.slice(0, loadMore);
    }
  }, [JSON.stringify(user), 0, loadMore]);

  return (
    <div className="flex flex-col p-3 w-[260px] h-[calc(100vh-66px)] overflow-auto fixed z-50">
      <div className="flex flex-col">
        <NavLink className="font-bold py-2 px-3 text-[18px]" to="/">
          <i className="fas fa-home me-3"></i>Dành cho bạn
        </NavLink>
        <NavLink className="font-bold py-2 px-3 text-[18px]" to="/following">
          <i className="fas fa-user-friends me-3"></i>Đang Follow
        </NavLink>
      </div>
      <div className="p-3 flex flex-col gap-3 border-t-[1px]">
        {currentUser?.id ? (
          <>
            <p
              className="text-sm font-semibold relative left-[-10px] "
              style={{ color: 'rgba(22, 24, 35, .75)' }}
            >
              Following accounts
            </p>
            {renderFollowingAccounts &&
              renderFollowingAccounts.map((item: IAccountItem) => {
                return (
                  <AccountItem
                    key={item._id}
                    avatarUrl={item.avatarUrl}
                    nickname={item.nickname}
                    fullname={item.fullname}
                  />
                );
              })}
            {renderFollowingAccounts && renderFollowingAccounts.length > 0 ? (
              <p
                className="text-[#fe2c55] font-bold text-sm cursor-pointer"
                onClick={onLoadMore}
              >
                {seeLess ? 'See less' : 'See more'}
              </p>
            ) : (
              <p>Bạn vẫn chưa theo dõi ai !</p>
            )}
          </>
        ) : (
          <>
            <p className="text-gray-400">
              Đăng nhập để follow các tác giả, thích video và xem bình luận.
            </p>
            <button
              className="border border-[#fe2c55] text-[#fe2c55] font-bold p-3
            rounded-md hover:bg-[#fe2c550f]"
              onClick={() => setModalIsOpen(true)}
            >
              Đăng nhập
            </button>
          </>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default SideBar;
