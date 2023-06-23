import { uploadVideoAPI } from '@/api/userAPIs';
import UploadButton from '@/components/UploadButton';
import { Field, Formik, Form, ErrorMessage } from 'formik';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as Yup from 'yup';

const UploadVideo = () => {
  const [video, setVideo] = useState<undefined | null | string>(null);
  const [videoUrl, setVideoUrl] = useState('');
  const [fileName, setFileName] = useState('Chưa chọn file nào');
  const [process, setProcess] = useState(0);

  const navigate = useNavigate();

  const handleCancelBtn = () => {
    if (window.confirm('Bạn có muốn hủy bỏ đăng video?')) {
      navigate('/');
    }
  };

  const handleUploadBtn = (values: any, { resetForm }: any) => {
    const uploadingVideo = {
      videoTitle: values.title,
      videoHastag: values.hashtag,
      videoUrl: videoUrl,
      userId: '6493181bf3dba4052fba2d6f',
    };

    console.log('uploadingVideo', uploadingVideo);

    uploadVideoAPI(uploadingVideo)
      .then(() => {
        setVideo(null);
        setFileName('');
        setVideoUrl('');
        setProcess(0);
        toast.success('Đăng tải video thành công!');
        resetForm();
      })
      .catch((err) => {
        toast.error(err);
      });
  };

  return (
    <div>
      <h1 className="font-bold text-2xl">Tải video lên</h1>
      <p className="text-gray-400">Đăng video vào tài khoản của bạn</p>
      <div className="flex gap-5 mt-5">
        <div
          className="flex justify-center items-center
            gap-5 w-[280px] h-[420px] border-[2px] p-4 border-dashed border-gray-300 rounded-md"
        >
          <UploadButton
            video={video}
            fileName={fileName}
            process={process}
            setVideo={setVideo}
            setFileName={setFileName}
            setVideoUrl={setVideoUrl}
            setProcess={setProcess}
          />
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
            onSubmit={handleUploadBtn}
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
                <button
                  type="submit"
                  disabled={videoUrl === ''}
                  className="text-white bg-[#f32c55] py-2 px-10 rounded-[4px]
                    font-bold hover:bg-[#e32b50] disabled:bg-gray-300"
                >
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
