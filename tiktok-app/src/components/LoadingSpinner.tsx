import img from '../assets/images/loading.gif';

interface ILoadingSpinnerProps {
  width?: number;
  height: number;
};

const LoadingSpinner = (props: ILoadingSpinnerProps) => {
  const { width = undefined, height } = props;

  return <img className={`w-[${width}px] h-[${height}px]`} src={img} alt="" />;
};

export default LoadingSpinner;
