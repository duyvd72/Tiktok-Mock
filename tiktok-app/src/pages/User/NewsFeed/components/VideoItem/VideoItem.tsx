import ButtonGroup from '@/pages/User/NewsFeed/components/ButtonGroup/ButtonGroup';
import video from '@/assets/videos/test-tiktok.mp4';

const VideoItem = () => {
  return (
    <div className="w-[80%] mx-auto">
      <div className="flex gap-4 justify-center">
        <div>
          <img
            className="w-[56px] h-[56px] rounded-full"
            src="https://gamek.mediacdn.vn/133514250583805952/2022/2/14/levi-gam-seagames31-2-16448385450131496240851.jpg"
            alt=""
          />
        </div>
        <div className="w-[50%]">
          <div className="flex items-center gap-2">
            <p className="font-bold">levi</p>
            <p className="text-sm">Đỗ Duy Khánh</p>
          </div>
          <div>
            <p>
              Touch 👌 Pass 😬 Reaction{' '}
              <strong>
                #UnitedOnTikTok #MUFC #ManUtd #OldTrafford #Totti #SoccerAid
              </strong>
            </p>
          </div>
          <div className="flex gap-5 mt-3  w-[70%]">
            <div className="relative">
              <div
                className="absolute z-50 w-full bottom-8 opacity-0 
            hover:opacity-100 transition-opacity ease-in-out"
              >
                <div className="flex justify-between w-[85%] mx-auto">
                  <button className="p-2 text-white">
                    <i className="fas fa-play"></i>
                  </button>
                  <button className="p-2 text-white">
                    <i className="fas fa-volume-up"></i>
                  </button>
                </div>
              </div>
              <video className="rounded-lg">
                <source src={video} type="video/mp4" />
              </video>
            </div>
            <div className="mt-auto">
              <ButtonGroup />
            </div>
          </div>
        </div>
        <div>
          <button className="border px-1">Đang Follow</button>
        </div>
      </div>
      <hr className="my-5 w-[70%] mx-auto" />
    </div>
  );
};

export default VideoItem;
