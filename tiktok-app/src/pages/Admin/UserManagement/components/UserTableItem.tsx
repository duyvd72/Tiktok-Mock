import { ICurrentUser } from '@/interfaces/interfaces';
import { formatDate } from '@/utils/formatDate';
import { useNavigate } from 'react-router';

interface IProps {
  user: ICurrentUser;
}

const UserTableItem = (props: IProps) => {
  const { user } = props;
  const navigate = useNavigate();

  const handleDetailBtn = () => {
    navigate(`${user._id}`);
  };

  return (
    <tr className="w-full text-center h-12">
      <td className="border text-ellipsis whitespace-nowrap overflow-hidden p-3 max-w-[100px]">
        {user._id}
      </td>
      <td className="border">{user.nickname}</td>
      <td className="border">{user.fullname}</td>
      <td className="border">{formatDate(user.createdAt)}</td>
      <td className="border">{user.myVideo.length}</td>
      <td className="border">
        <button
          className="border px-3 py-1 border-[#fe2c55] text-[#fe2c55] font-bold hover:bg-[#fe2c550f] rounded-[4px]"
          onClick={handleDetailBtn}
        >
          Chi tiết
        </button>
      </td>
    </tr>
  );
};

export default UserTableItem;
