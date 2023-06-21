import { useState } from 'react';

const UploadButton = () => {
  const [video, setVideo] = useState<undefined | null | string>(null);
  const [fileName, setFileName] = useState('Chưa chọn file nào');

  return (
    <div>
      {video ? (
        <div className="flex flex-col gap-5">
          <div>
            <video
              className="w-[243px] h-[322px] rounded-[4px] bg-black"
              src={video}
            />
          </div>
          <div className="flex justify-between border p-2 rounded-[4px]">
            <div className="max-w-[100px] flex gap-2 items-center ">
              <i className="far fa-check-circle text-sm"></i>
              <p className="text-ellipsis whitespace-nowrap overflow-hidden">
                {fileName}
              </p>
            </div>
            <button
              className="text-red-500"
              onClick={() => {
                setVideo(null);
                setFileName('');
              }}
            >
              <i className="fas fa-trash-alt"></i>
            </button>
          </div>
        </div>
      ) : (
        <div>
          <div className="flex flex-col justify-center text-center gap-3">
            <i className="fas fa-file-upload text-center text-3xl text-gray-400"></i>
            <h2 className="font-bold ">Chọn video để tải lên</h2>
            <p className="text-center">Tối đa 30 phút</p>
            <p className="text-center">Nhỏ hơn 2 GB</p>
            <label
              htmlFor="uploadBtn"
              className="bg-[#fe2c55] hover:cursor-pointer text-white font-bold p-4 rounded-[4px]"
            >
              Chọn tập tên
            </label>
          </div>

          <input
            id="uploadBtn"
            className="hidden"
            type="file"
            accept="video/*"
            onChange={({ target: { files } }) => {
              if (files) {
                setFileName(files[0].name);
                setVideo(URL.createObjectURL(files[0]));
              }
            }}
          />
        </div>
      )}
    </div>
  );
};

export default UploadButton;
