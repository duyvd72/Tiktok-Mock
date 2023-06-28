import { useNavigate } from 'react-router';

const UserTableItem = () => {
  const navigate = useNavigate();

  const handleDetailBtn = () => {
    navigate('123');
  };

  return (
    <tr className="w-full text-center h-12">
      <td className="border">1</td>
      <td className="border">duyvd0702</td>
      <td className="border">Vũ Đức Duy</td>
      <td className="border">28/06/2023</td>
      <td className="border">10</td>
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
