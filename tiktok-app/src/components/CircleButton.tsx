interface IProps {
  children: JSX.Element;
  numberOfAction: number;
  onClick: () => void;
}

const CircleButton = (props: IProps) => {
  const { children, numberOfAction, onClick } = props;
  return (
    <div onClick={onClick}>
      <div
        className="w-10 h-10 bg-gray-200 rounded-full
        flex justify-center items-center hover:cursor-pointer"
      >
        <button>{children}</button>
      </div>
      <p className="text-center text-xs font-bold mt-1">{numberOfAction}</p>
    </div>
  );
};

export default CircleButton;
