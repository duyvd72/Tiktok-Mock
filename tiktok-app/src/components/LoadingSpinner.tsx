import img from '../assets/images/loading.gif';

const LoadingSpinner = ({ className }: { className?: string }) => {
  return <img className={`w-[40px] h-[40px] ${className}`} src={img} alt="" />;
};

export default LoadingSpinner;
