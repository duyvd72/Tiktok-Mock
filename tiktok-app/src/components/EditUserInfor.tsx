import styles from "@/styles/userDetail.module.css";
import axios from "axios";
import { ChangeEvent, useContext, useState } from "react";
import { ErrorMessage, Field, Formik } from "formik";
import * as Yup from "yup";
import { InitialValuesContext } from "./UserDetail";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useParams } from "react-router-dom";

interface EditUserInforProps {
  setClickEdit: React.Dispatch<React.SetStateAction<boolean>>;
}

const EditUserInfor = ({ setClickEdit }: EditUserInforProps) => {
  const initialValues = useContext(InitialValuesContext);
  const [changeImage, setChangeImage] = useState(false);
  const [imageState, setImageState] = useState("");
  const { userId } = useParams();

  const handleUpdateUser = (values: any) => {
    axios
      .put(`http://localhost:3005/accounts/${userId}/update`, values)
      .then(() => {
        toast("cập nhật thành công");
        setChangeImage(false);
      })
      .catch((err) => console.log(err));
  };

  const handleImage = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      console.log(URL.createObjectURL(file));
      setImageState(URL.createObjectURL(file));
      setChangeImage(true);
    }
  };
  return (
    <div className="fixed inset-0 z-50 py-5 overflow-y-auto" id={styles.edit}>
      <Formik
        initialValues={initialValues}
        validationSchema={Yup.object().shape({
          nickname: Yup.string()
            .required("không được để trống TikTokID")
            .matches(/^[A-Za-z0-9_.]+$/, "Đoạn mã không hợp lệ")
            .min(3, "TikTokID phải gồm ít nhất 3 kí tự")
            .max(24, "Tối đa 24 kí tự"),
          fullname: Yup.string().max(30, "Tối đa 30 kí tự"),
          bio: Yup.string().max(80, "Tối đa 80 kí tự"),
        })}
        onSubmit={(values) => {
          handleUpdateUser(values);
        }}
      >
        {(formik) => {
          {
            console.log("avatarUrl", formik.values.avatarUrl);
          }
          return (
            <form onSubmit={formik.handleSubmit}>
              <div className="bg-white w-1/2 rounded-md m-auto ">
                <div className="flex justify-between border-slate-400 border-b py-2 px-5">
                  <p className="font-bold text-2xl">Sửa hồ sơ</p>
                  <div onClick={() => setClickEdit(false)}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="20"
                      viewBox="0 0 384 512"
                      fill="#51535b"
                    >
                      <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
                    </svg>
                  </div>
                </div>
                <div className="flex p-5 border-slate-400 border-b">
                  <p className="w-1/4 font-bold">Ảnh hồ sơ</p>
                  <div className="w-2/4 relative">
                    <div className="w-fit m-auto cursor-pointer">
                      <img
                        src={
                          "blob:http://127.0.0.1:5173/0d035e3a-cb9b-48f3-871f-c6b6bf9d3f4e"
                        }
                        alt="avatar"
                        className="w-28 h-28 rounded-full cursor-pointer m-auto"
                      />
                      <div className="rounded-full border border-gray bg-white absolute p-2 left-1/2 translate-x-2/4 bottom-0">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          height="20"
                          viewBox="0 0 512 512"
                          fill="#000000"
                        >
                          <path d="M441 58.9L453.1 71c9.4 9.4 9.4 24.6 0 33.9L424 134.1 377.9 88 407 58.9c9.4-9.4 24.6-9.4 33.9 0zM209.8 256.2L344 121.9 390.1 168 255.8 302.2c-2.9 2.9-6.5 5-10.4 6.1l-58.5 16.7 16.7-58.5c1.1-3.9 3.2-7.5 6.1-10.4zM373.1 25L175.8 222.2c-8.7 8.7-15 19.4-18.3 31.1l-28.6 100c-2.4 8.4-.1 17.4 6.1 23.6s15.2 8.5 23.6 6.1l100-28.6c11.8-3.4 22.5-9.7 31.1-18.3L487 138.9c28.1-28.1 28.1-73.7 0-101.8L474.9 25C446.8-3.1 401.2-3.1 373.1 25zM88 64C39.4 64 0 103.4 0 152V424c0 48.6 39.4 88 88 88H360c48.6 0 88-39.4 88-88V312c0-13.3-10.7-24-24-24s-24 10.7-24 24V424c0 22.1-17.9 40-40 40H88c-22.1 0-40-17.9-40-40V152c0-22.1 17.9-40 40-40H200c13.3 0 24-10.7 24-24s-10.7-24-24-24H88z" />
                        </svg>
                        <input
                          type="file"
                          accept=".jpg,.jpeg,.png,.tiff,.heic,.webp"
                          className={styles.file}
                          onChange={handleImage}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex p-5 border-slate-400 border-b">
                  <p className="w-1/4 font-bold">TikTok ID</p>
                  <div className="w-2/4">
                    <Field
                      name="nickname"
                      type="text"
                      className="w-full bg-gray-200 h-10 rounded-md p-3 mb-1"
                    />
                    <ErrorMessage
                      name="nickname"
                      render={(msg: string) => (
                        <p className="text-red-800 text-xs">{msg}</p>
                      )}
                    />
                    <label htmlFor="" className="text-slate-500 text-xs">
                      TikTok ID chỉ có thể bao gồm chữ cái, chữ số, dấu gạch
                      dưới và dấu chấm. Khi thay đổi TikTok ID, liên kết hồ sơ
                      của bạn cũng sẽ thay đổi.
                    </label>
                  </div>
                </div>
                <div className="flex p-5 border-slate-400 border-b">
                  <p className="w-1/4 font-bold">Tên</p>
                  <div className="w-2/4">
                    <Field
                      name="fullname"
                      type="text"
                      className="w-full bg-gray-200 h-10 rounded-md p-3 mb-1"
                    />
                    <ErrorMessage
                      name="fullname"
                      render={(msg: string) => (
                        <p className="text-red-800 text-xs">{msg}</p>
                      )}
                    />
                  </div>
                </div>
                <div className="flex p-5 border-slate-400 border-b">
                  <p className="w-1/4 font-bold">Tiểu sử</p>
                  <div className="w-2/4">
                    <Field
                      name="bio"
                      as="textarea"
                      className="w-full bg-gray-200 h-24 rounded-md p-3 mb-1"
                    />
                    <ErrorMessage
                      name="bio"
                      render={(msg: string) => (
                        <p className="text-red-800 text-xs">{msg}</p>
                      )}
                    />
                    <label htmlFor="" className="text-slate-500 text-xs">
                      {}
                      /80
                    </label>
                  </div>
                </div>
                <div className="flex flex-row-reverse p-5 border-slate-400 border-b">
                  <button
                    className={`w-32 px-5 py-2 ml-5 mr-2 rounded-md ${
                      initialValues.nickname !== formik.values.nickname ||
                      initialValues.fullname !== formik.values.fullname ||
                      initialValues.bio !== formik.values.bio ||
                      changeImage === true
                        ? "bg-[#fe2c55] text-white"
                        : "bg-gray-200 text-slate-500 pointer-events-none"
                    } `}
                    type="submit"
                  >
                    Lưu
                  </button>
                  <button
                    className="border-gray-300 w-32 px-5 py-2 mr-2 rounded-md border"
                    onClick={() => setClickEdit(false)}
                  >
                    Hủy
                  </button>
                </div>
              </div>
              <ToastContainer />
            </form>
          );
        }}
      </Formik>
    </div>
  );
};
export default EditUserInfor;
