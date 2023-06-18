interface IProps {
  children: JSX.Element;
}

const CircleButton = (props: IProps) => {
  const { children } = props;
  return (
    <div>
      <div
        className="w-10 h-10 bg-gray-200 rounded-full
        flex justify-center items-center hover:cursor-pointer"
      >
        <button>{children}</button>
      </div>
      <p className="text-center text-xs font-bold mt-1">20K</p>
    </div>
  );
};

export default CircleButton;
