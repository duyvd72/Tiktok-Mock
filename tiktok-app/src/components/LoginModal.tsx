import Login from '@/components/Login';
import useModal from '@/hooks/useModal';
import Signup from '@/components/Signup';
import LoginChild from '@/components/LoginChild';
import { useEffect } from 'react';

const LoginModal = () => {
  const { modalState, setModalIsOpen, modalIsOpen } = useModal();

  useEffect(() => {
    if (modalIsOpen) {
      document.body.style.overflow = 'hidden'
    }

    return () => { document.body.style.overflow = 'auto' }
  }, [])
  return (
    <main>
      <div className="relative z-[9999]">
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacit text-white "></div>
        <div
          className="fixed inset-0 z-[9999] overflow-y-auto"
          onClick={() => setModalIsOpen(false)}
        >
          <div
            className="fixed inset-0 z-10 overflow-y-auto"
            onClick={() => setModalIsOpen(false)}
          >
            <div
              className="absolute left-[50%] top-[5%] transform translate-x-[-50%]  overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg  "
              style={{ background: 'rgb(37, 37, 37)' }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setModalIsOpen(false)}
                style={{ background: 'rgb(46, 46, 46)' }}
                className=" absolute right-5 rounded-full w-10 h-10 text-white text-2xl mt-3"
              >
                <i className="fas fa-times"></i>
              </button>
              {modalState === 'login' && <Login />}
              {modalState === 'signup' && <Signup />}
              {modalState === 'childLogin' && <LoginChild />}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default LoginModal;
