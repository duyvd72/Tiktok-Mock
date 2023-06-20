import { Field, Formik, Form, ErrorMessage, useField } from 'formik';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';

const UploadVideo = () => {
  const navigate = useNavigate();

  const handleCancelBtn = () => {
    if (window.confirm('Bạn có muốn hủy bỏ đăng video?')) {
      navigate('/');
    }
  };

  return (
    <div>
      <h1 className="font-bold text-2xl">Tải video lên</h1>
      <p className="text-gray-400">Đăng video vào tài khoản của bạn</p>
      <div className="flex gap-5 mt-5">
        <div className="flex flex-col justify-center gap-2 w-1/3 px-[3rem] py-[8rem] border-[2px] border-dashed border-gray-300 rounded-md">
          <i className="fas fa-file-upload text-center text-3xl text-gray-400"></i>
          <h2 className="font-bold">Chọn video để tải lên</h2>
          <p className="text-center">Tối đa 30 phút</p>
          <p className="text-center">Nhỏ hơn 2 GB</p>
          <button className="text-white bg-[#f32c55] p-2 rounded-[4px] font-bold hover:bg-[#e32b50]">
            Chọn tập tin
          </button>
        </div>
        <div className="w-2/3">
          <Formik
            initialValues={{
              title: '',
              hashtag: '',
            }}
            validationSchema={Yup.object({
              title: Yup.string().required('Chú thích không được để trống!'),
              hashtag: Yup.string().required('Hash tag không được để trống!'),
            })}
            onSubmit={() => console.log(123)}
          >
            <Form className="flex flex-col gap-5">
              <div className="flex flex-col gap-2">
                <label>Chú thích</label>
                <Field
                  maxLength={1500}
                  className="border border-gray-300 px-4 py-2 rounded-[4px] h-[100px]"
                  name="title"
                  as="textarea"
                ></Field>
                <ErrorMessage name="title">
                  {(errorMessage: string) => (
                    <div className="text-red-500">
                      <span>{errorMessage}</span>
                    </div>
                  )}
                </ErrorMessage>
              </div>

              <div className="flex flex-col gap-2">
                <label>Hashtag</label>
                <Field
                  maxLength={50}
                  className="border border-gray-300 px-4 py-2 rounded-[4px]"
                  name="hashtag"
                ></Field>
                <ErrorMessage name="hashtag">
                  {(errorMessage: string) => (
                    <div className="text-red-500">
                      <span>{errorMessage}</span>
                    </div>
                  )}
                </ErrorMessage>
              </div>

              <div className="flex gap-5">
                <button
                  className="border border-gray-300 py-2 px-10 rounded-[4px] font-bold hover:bg-[#12141d10]"
                  onClick={handleCancelBtn}
                >
                  Hủy bỏ
                </button>
                <button className="text-white bg-[#f32c55] py-2 px-10 rounded-[4px] font-bold hover:bg-[#e32b50]">
                  Đăng
                </button>
              </div>
            </Form>
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default UploadVideo;
