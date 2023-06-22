import styles from "@/styles/userDetail.module.css";
import img from "../assets/images/comingsoon.png";
import axios from "axios";
import { useState, useEffect } from "react";
import { ErrorMessage, Field, Formik } from "formik";
import * as Yup from "yup";

interface EditUserInforProps {
  setClickEdit: React.Dispatch<React.SetStateAction<boolean>>;
}

interface IUserInfo {
  _id: Object;
  avatarUrl: string;
  nickname: string;
  fullname: string;
  username: string;
  password: string;
  role: string;
  myVideo: Array<string>;
  videoliked: Array<string>;
  following: Array<string>;
  follow: Array<string>;
  createdAt: Date;
  updatedAt: Date;
  bio: String;
  __v: Number;
}

const EditUserInfor = ({ setClickEdit }: EditUserInforProps) => {
  const [userUrlList, setUserUrlList] = useState<IUserInfo | undefined>(
    undefined
  );
  const [nickname, setNickname] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:3005/accounts/searchuser/6493178af3dba4052fba2d6c")
      .then((response) => {
        setUserUrlList(response.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleNickName = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("nickname: ", nickname);

    setNickname(e.target.value);
  };

  const handleUpdateUser = async () => {
    return axios.put(
      `http://localhost:3005/accounts/6493178af3dba4052fba2d6c/update`,
      {
        nickname: nickname,
      }
    );
  };
  console.log("nickname", userUrlList?.nickname.toString());

  return (
    <div className="fixed inset-0 z-50 py-5" id={styles.edit}>
      <Formik
        initialValues={{
          nickname: userUrlList?.nickname.toString(),
          fullname: userUrlList?.fullname.toString(),
          bio: "",
        }}
        validationSchema={Yup.object().shape({
          nickname: Yup.string().matches(
            /^[A-Za-z0-9_.]+$/,
            "Đoạn mã không hợp lệ"
          ),
        })}
        onSubmit={(value) => console.log(value)}
      >
        {(formik) => {
          return (
            <form onSubmit={formik.handleSubmit}>
              <div className="bg-white w-2/3 rounded-md m-auto overflow-y-auto">
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
                  <div className="w-2/4">
                    <img
                      src={img}
                      alt="avatar"
                      className="w-28 h-28 rounded-full cursor-pointer m-auto"
                    />
                  </div>
                </div>
                <div className="flex p-5 border-slate-400 border-b">
                  <p className="w-1/4 font-bold">TikTok ID</p>
                  <div className="w-2/4">
                    <Field
                      name="nickname"
                      type="text"
                      className="w-full bg-gray-200 h-10 rounded-md p-3 mb-1"
                      onChange={handleNickName}
                      placeholder={userUrlList?.nickname.toString()}
                    />
                    <ErrorMessage
                      name="nickname"
                      render={(msg: string) => (
                        <p className="text-red-800">{msg}</p>
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
                        <p className="text-red-800">{msg}</p>
                      )}
                    />
                    <label htmlFor="" className="text-slate-500 text-xs">
                      Bạn chỉ có thể thay đổi biệt danh 7 ngày một lần.
                    </label>
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
                    <label htmlFor="" className="text-slate-500 text-xs">
                      0/80
                    </label>
                  </div>
                </div>
                <div className="flex flex-row-reverse p-5 border-slate-400 border-b">
                  <button
                    className="bg-gray-200 w-32 px-5 py-2 mr-2 rounded-md"
                    onClick={handleUpdateUser}
                  >
                    Lưu
                  </button>
                  <button
                    className="w-32 px-5 py-2 mr-2 rounded-md border border-gray-800"
                    onClick={() => setClickEdit(false)}
                  >
                    Hủy
                  </button>
                </div>
              </div>
            </form>
          );
        }}
      </Formik>
    </div>
  );
};
export default EditUserInfor;
