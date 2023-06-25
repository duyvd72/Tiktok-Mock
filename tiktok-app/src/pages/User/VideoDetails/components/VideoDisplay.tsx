import axios from "axios";
import { useEffect, useState } from "react";


const VideoDisplay = () => {

    const [videoUrl, setVideoUrl] = useState<string>("");

    useEffect(() => {
      axios.get("http://localhost:3005/videos/6490708e1c7c612e09fd559a")
        .then((response) => {
          // console.log(response.data.videoUrl);
          setVideoUrl(response.data.videoUrl);
        }) 
        .catch(err => console.log(err))
    }, []);
    

    return(
        <>
        {/* Video */}
        <div className="col-span-4 max-w-[500px] max-h-screen text-white overflow-hidden autoplay">
          <video
            className="h-full w-full"
            src={videoUrl}
            loop={true}
            autoPlay={true}
            controls={true}
            muted={true}
          />
        </div>
        </>
    );
};

export default VideoDisplay;