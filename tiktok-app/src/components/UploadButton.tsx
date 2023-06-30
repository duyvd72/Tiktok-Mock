import { storage } from '@/firebase/index';
import useModal from '@/hooks/useModal';
import { ref, getDownloadURL, uploadBytesResumable } from 'firebase/storage';

interface IProps {
  video: string | null | undefined;
  fileName: string;
  process: number;
  setVideo: React.Dispatch<React.SetStateAction<string | null | undefined>>;
  setFileName: React.Dispatch<React.SetStateAction<string>>;
  setVideoUrl: React.Dispatch<React.SetStateAction<string>>;
  setProcess: React.Dispatch<React.SetStateAction<number>>;
}

const UploadButton = (props: IProps) => {
  const {
    video,
    fileName,
    process,
    setVideo,
    setFileName,
    setVideoUrl,
    setProcess,
  } = props;

  const { currentUser } = useModal();

  const handleChangeFile = (files: FileList | null) => {
    if (!files) return;
    const storageRef = ref(storage, files[0].name + currentUser._id);
    const uploadTask = uploadBytesResumable(storageRef, files[0]);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProcess(progress);
      },
      (error) => {
        console.error(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((videoUrl) => {
          setVideoUrl(videoUrl);
          setFileName(files[0].name);
          setVideo(URL.createObjectURL(files[0]));
        });
      }
    );
  };

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
                setVideoUrl('');
                setProcess(0);
              }}
            >
              <i className="fas fa-trash-alt"></i>
            </button>
          </div>
        </div>
      ) : process ? (
        <p className="text-center">Đang tải lên {process}%</p>
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
            name="video"
            className="hidden"
            type="file"
            accept="video/*"
            onChange={({ target: { files } }) => handleChangeFile(files)}
          />
        </div>
      )}
    </div>
  );
};

export default UploadButton;
