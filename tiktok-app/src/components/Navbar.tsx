import logo from '../assets/images/logo.png';
import { NavLink, useNavigate } from 'react-router-dom';
import useModal from '@/hooks/useModal';
import defaultAva from '@/assets/images/default-ava.png';
import { removeAccessToken } from '@/utils/accessTokenLS';
import AccountItem from './AccountItem';
import { useState } from 'react';
import useDebounce from '@/hooks/useDebounce';
import axiosInstance from '@/libs/axios/axiosConfig';
import LoadingSpinner from './LoadingSpinner';

const Navbar = () => {
  const { setModalIsOpen, currentUser } = useModal();
  const navigate = useNavigate();
  const [searchResults, setSearchResults] = useState<any[]>([])
  const [searchValue, setSearchValue] = useState<string>('')
  const [isLoading, setIsLoading] = useState(false)
  const debounce = useDebounce(async (search) => {
    setIsLoading(true)
    const response = await axiosInstance.get(`/accounts/search/${search}`)
    setIsLoading(false)
    setSearchResults(response.data)
  }, 500)

  const handleUploadBtn = () => {
    navigate('/upload');
  };

  const onSignIn = () => {
    setModalIsOpen(true);
  };

  const handleProfileBtn = () => {
    navigate(`/${currentUser._id}`);
  };

  const onChat = () => {
    navigate('/chat');
  };

  const handleLogout = () => {
    removeAccessToken();
    navigate('/');
    location.reload();
  };

  const handleSearch = (e: any) => {
    setSearchValue(e.target.value)
    if (!e.target.value) {
      setSearchResults([])
    } else {
      debounce(e.target.value)
    }
  }

  return (
    <div className="flex justify-between items-center p-3 border-b-[1px] bg-white fixed w-full z-50 top-0">
      <div className="flex-1">
        <NavLink to="/">
          <img className="w-auto h-[35px]" src={logo} alt="" />
        </NavLink>
      </div>
      <div className="flex flex-1 justify-center relative">
        <input
          className="rounded-s-full py-1.5 px-4 bg-gray-200 outline-none w-full"
          type="text"
          value={searchValue}
          onChange={(e) => handleSearch(e)}
          placeholder="Tìm kiếm"
        />
        <p className='bg-gray-200'>
          {isLoading && <LoadingSpinner />}
        </p>
        <button
          className="bg-gray-200 text-gray-400 border-s-[1px]
          border-gray-300 rounded-e-full px-4 hover:bg-gray-300 hover:text-black"
        >
          <i className="fas fa-search "></i>
        </button>
        <section className='absolute top-[50px] bg-slate-200 rounded-md w-full max-h-[250px] overflow-auto max-w-[500px] flex flex-col break-words'>
          {searchResults && searchResults.length > 0 && searchValue && searchResults.map(item =>
          (
            <>
              <AccountItem userId={item._id} nickname={item.nickname} fullname={item.fullname} avatarUrl={item.avatarUrl} search />
            </>
          ))}
        </section>
      </div>
      <div className="flex flex-1 gap-5 justify-end">
        <button
          className="border px-2 py-1 rounded-[4px] font-bold hover:bg-[#12141d10]"
          onClick={handleUploadBtn}
        >
          <i className="fas fa-plus me-3"></i>Tải lên
        </button>

        {currentUser && currentUser._id ? (
          <div className="flex items-center gap-5">
            <button onClick={onChat}>
              <i className="far fa-comment-alt text-xl"></i>
            </button>
            <div className="relative group">
              <img src={defaultAva} alt="" className="w-[40px] h-[40px]" />
              <div
                className="absolute right-0 w-[100px] hidden group-hover:block 
                 rounded-md bg-white border shadow-md"
              >
                <button className="p-2" onClick={handleProfileBtn}>
                  My Profile
                </button>
                <div className="w-full border-t-[1px]"></div>
                <button className="p-2" onClick={handleLogout}>
                  Logout
                </button>
              </div>
            </div>
          </div>
        ) : (
          <button
            className="border px-2 py-1 rounded-[4px]
            bg-[#fe2c55] hover:bg-[#e32b50] text-white font-bold"
            onClick={() => onSignIn()}
          >
            Đăng nhập
          </button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
