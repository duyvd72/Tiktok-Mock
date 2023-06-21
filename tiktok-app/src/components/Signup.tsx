import FooterLoginSignup from '@/components/FooterLoginSignup';
import { Formik, Field, Form, ErrorMessage } from 'formik';
// import { storage } from '@/firebase/index'
// import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import USER from '@/api/user';

const Signup = (): JSX.Element => {
  const initialValues = {
    username: '',
    password: '',
    nickname: '',
    fullname: '',
  };
  const handleSubmit = async (values: { [key: string]: any }) => {
    const result: { [key: string]: any } = await USER.REGISTER({
      ...values,
      avatarUrl: '',
    });

    if (result.status === 'This username has been existed') {
      console.log(result);
    }

    if (result.status === 'Create user success') {
      console.log(result);
    }
    // const storageRef = ref(storage, field?.name);
    // const uploadTask = uploadBytesResumable(storageRef, field as Blob);
    // uploadTask.on("state_changed",
    //     (_snapshot) => {
    //         //   const progress =
    //         //     Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
    //         //   setProgresspercent(progress);
    //     },
    //     (error) => {
    //         alert(error);
    //     },
    //     () => {
    //         getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {

    //         });
    //     }
    // );
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
              className="
                font-black 
                text-white
                text-center
                mt-16
                mb-5
                text-4xl  
                "
              id="modal-title"
            >
              Đăng ký TikTok
            </h3>
          </div>
          <Formik
            initialValues={initialValues}
            validate={validateForm}
            onSubmit={handleSubmit}
          >
            <Form className="w-full flex-col text-center text-white">
              <div>
                <label
                  style={{ minWidth: '100px' }}
                  className="inline-block me-2 text-left"
                  htmlFor="nickname"
                >
                  Nickname
                </label>
                <Field
                  style={{ background: 'rgb(46, 46, 46)' }}
                  className="py-2 ps-2 mb-2"
                  type="text"
                  id="nickname"
                  name="nickname"
                />
                <ErrorMessage name="username" component="div">
                  {(msg) => <div className="text-red-500">{msg}</div>}
                </ErrorMessage>
              </div>
              <div>
                <label
                  style={{ minWidth: '100px' }}
                  className="inline-block me-2 text-left"
                  htmlFor="fullname"
                >
                  Fullname
                </label>
                <Field
                  style={{ background: 'rgb(46, 46, 46)' }}
                  className="py-2 ps-2 mb-2"
                  type="text"
                  id="fullname"
                  name="fullname"
                />
                <ErrorMessage name="username" component="div">
                  {(msg) => <div className="text-red-500">{msg}</div>}
                </ErrorMessage>
              </div>
              <div>
                <label
                  style={{ minWidth: '100px' }}
                  className="inline-block me-2 text-left"
                  htmlFor="username"
                >
                  Username
                </label>
                <Field
                  style={{ background: 'rgb(46, 46, 46)' }}
                  className="py-2 ps-2"
                  type="text"
                  id="username"
                  name="username"
                />
                <ErrorMessage name="username" component="div">
                  {(msg) => <div className="text-red-500">{msg}</div>}
                </ErrorMessage>
              </div>

              <div className="my-5">
                <label
                  style={{ minWidth: '100px' }}
                  className="inline-block me-2 text-left"
                  htmlFor="password"
                >
                  Password
                </label>
                <Field
                  style={{ background: 'rgb(46, 46, 46)' }}
                  className="py-2 ps-2"
                  type="password"
                  id="password"
                  name="password"
                />
                <ErrorMessage name="password" component="div">
                  {(msg) => <div className="text-red-500">{msg}</div>}
                </ErrorMessage>
              </div>

              <button type="submit" className="font-bold px-6 py-2 bg-red-500">
                Đăng ký
              </button>
            </Form>
          </Formik>
        </div>
      </div>
      <FooterLoginSignup textA="Bạn đã có tài khoản?" textB="Đăng nhập" />
    </div>
  );
};

export default Signup;
