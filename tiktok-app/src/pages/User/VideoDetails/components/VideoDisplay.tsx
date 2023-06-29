interface IVideoUrlListProps {
  videoUrl: string;
}

const VideoDisplay = (props: IVideoUrlListProps) => {
  const { videoUrl } = props;

  return (
    <video
      className="h-full w-full cursor-pointer"
      src={videoUrl}
      loop={true}
      autoPlay={true}
      controls={true}
      muted={true}
    />
  );
};

export default VideoDisplay;
