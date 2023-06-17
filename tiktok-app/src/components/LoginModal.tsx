import Login from "@/components/Login";
import useModal from "@/hooks/useModal"
import Signup from "@/components/Signup";
import LoginChild from "@/components/LoginChild";

const LoginModal = () => {

  const { modalState } = useModal()

  return <main>
    <div className="relative z-10 " >
      <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacit text-white">
      </div>
      <div className="fixed inset-0 z-10 overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0" >
          <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg "
            style={{ background: 'rgb(37, 37, 37)' }}
          >
            {modalState === 'login' &&
              <Login />
            }
            {modalState === 'signup' &&
              <Signup />
            }
            {
              modalState === 'childLogin' &&
              <LoginChild />
            }
          </div>
        </div>
      </div>
    </div>
  </main>
};

export default LoginModal;
