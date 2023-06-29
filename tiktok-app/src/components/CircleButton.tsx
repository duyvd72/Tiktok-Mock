interface IProps {
  children: JSX.Element;
  numberOfAction: number;
  onClick: () => void;
  isLoading?: boolean
}

const CircleButton = (props: IProps) => {
  const { children, numberOfAction, onClick } = props;
  return (
    <div>
      <button
        className="w-10 h-10 bg-gray-200 rounded-full
        flex justify-center items-center hover:cursor-pointer"
        onClick={onClick}
        disabled={props.isLoading}
      >
        <p >{children}</p>
      </button>
      <p className="text-center text-xs font-bold mt-1">{numberOfAction}</p>
    </div>
  );
};

export default CircleButton;
