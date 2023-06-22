import FooterLoginSignup from '@/components/FooterLoginSignup';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router';
import useModal from '@/hooks/useModal';
import jwt from 'jwt-decode';
import { setAccessToken } from '@/utils/accessTokenLS';
import { loginUserAPI } from '@/api/userAPIs';
import { ILoggingUser } from '@/interfaces/interfaces';
import { useAppDispatch } from '@/redux/hooks';

function LoginChild() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  // const { setModalIsOpen, setCurrentUser } = useModal();
  const initialValues = {
    username: '',
    password: '',
  };

  const handleSubmit = (values: ILoggingUser) => {
    dispatch(loginUserAPI(values));

    // const response: { [ket: string]: any } = await USER.LOGIN(values);
    //   if (!response._id) {
    //     toast.error(`${response.message}`);
    //   } else {
    //     const user: any = jwt(response.token);
    //     setCurrentUser(user);
    //     setModalIsOpen(false);
    //     setTimeout(() => {
    //       navigate('/');
    //     });
    //   }
    //   setAccessToken(response.token);
  };

  const validateForm = (values: any) => {
    const errors: any = {};

    if (!values.username) {
      errors.username = 'Username is required';
    }

    if (!values.password) {
      errors.password = 'Password is required';
    }

    return errors;
  };

  return (
    <div>
      <div className="bg-transparent px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
        <div className="sm:flex sm:items-center flex-col ">
          <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
            <h3
              className="font-black  text-white text-center mt-16 mb-5 text-4xl "
              id="modal-title"
            >
              Đăng nhập TikTok
            </h3>
          </div>
          <Formik
            initialValues={initialValues}
            validate={validateForm}
            onSubmit={handleSubmit}
          >
            <Form className="w-full flex flex-col text-white gap-5">
              <div className="flex flex-col gap-2">
                <label
                  style={{ minWidth: '100px' }}
                  className="inline-block me-2"
                  htmlFor="username"
                >
                  Username
                </label>
                <Field
                  style={{ background: 'rgb(46, 46, 46)' }}
                  className="py-2 ps-2 rounded-[4px]"
                  type="text"
                  id="username"
                  name="username"
                />
                <ErrorMessage name="username" component="div">
                  {(msg) => <div className="text-red-500">{msg}</div>}
                </ErrorMessage>
              </div>

              <div className="flex flex-col gap-2">
                <label
                  style={{ minWidth: '100px' }}
                  className="inline-block me-2"
                  htmlFor="password"
                >
                  Password
                </label>
                <Field
                  style={{ background: 'rgb(46, 46, 46)' }}
                  className="py-2 ps-2 rounded-[4px]"
                  type="password"
                  id="password"
                  name="password"
                />
                <ErrorMessage name="password" component="div">
                  {(msg) => <div className="text-red-500">{msg}</div>}
                </ErrorMessage>
              </div>

              <button
                type="submit"
                className="font-bold px-6 py-2 bg-[#fe2c55] rounded-[4px]"
              >
                Đăng nhập
              </button>
            </Form>
          </Formik>
        </div>
      </div>
      <FooterLoginSignup textA="Bạn không có tài khoản?" textB="Đăng ký" />
    </div>
  );
}

export default LoginChild;
