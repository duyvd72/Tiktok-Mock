import { NavLink } from 'react-router-dom';

const Footer = () => {
  return (
    <div className="flex flex-col gap-3 p-3  border-t-[1px]">
      <div>
        <NavLink
          className="hover:underline me-3 text-sm text-gray-400 border-gray-300"
          to="/footer"
        >
          Giới thiệu
        </NavLink>
        <NavLink
          className="hover:underline me-3 text-sm text-gray-400 border-gray-300"
          to="/footer"
        >
          Bảng tin
        </NavLink>
        <NavLink
          className="hover:underline me-3 text-sm text-gray-400 border-gray-300"
          to="/footer"
        >
          Liên hệ
        </NavLink>
        <NavLink
          className="hover:underline me-3 text-sm text-gray-400 border-gray-300"
          to="/footer"
        >
          Sự nghiệp
        </NavLink>
        <NavLink
          className="hover:underline me-3 text-sm text-gray-400 border-gray-300"
          to="/footer"
        >
          ByteDance
        </NavLink>
      </div>
      <div>
        <NavLink
          className="hover:underline me-3 text-sm text-gray-400 border-gray-300"
          to="/footer"
        >
          TikTok for Good
        </NavLink>
        <NavLink
          className="hover:underline me-3 text-sm text-gray-400 border-gray-300"
          to="/footer"
        >
          Quảng cáo
        </NavLink>
        <NavLink
          className="hover:underline me-3 text-sm text-gray-400 border-gray-300"
          to="/footer"
        >
          Developers
        </NavLink>
        <NavLink
          className="hover:underline me-3 text-sm text-gray-400 border-gray-300"
          to="/footer"
        >
          Minh bạch
        </NavLink>
        <NavLink
          className="hover:underline me-3 text-sm text-gray-400 border-gray-300"
          to="/footer"
        >
          TikTok Rewards
        </NavLink>
        <NavLink
          className="hover:underline me-3 text-sm text-gray-400 border-gray-300"
          to="/footer"
        >
          TikTok Embeds
        </NavLink>
      </div>
      <div>
        <NavLink
          className="hover:underline me-3 text-sm text-gray-400 border-gray-300"
          to="/footer"
        >
          Trợ giúp
        </NavLink>
        <NavLink
          className="hover:underline me-3 text-sm text-gray-400 border-gray-300"
          to="/footer"
        >
          An toàn
        </NavLink>
        <NavLink
          className="hover:underline me-3 text-sm text-gray-400 border-gray-300"
          to="/footer"
        >
          Điều khoản
        </NavLink>
        <NavLink
          className="hover:underline me-3 text-sm text-gray-400 border-gray-300"
          to="/footer"
        >
          Quyền riêng tư
        </NavLink>
        <NavLink
          className="hover:underline me-3 text-sm text-gray-400 border-gray-300"
          to="/footer"
        >
          Cổng thông tin Tác giả
        </NavLink>
        <NavLink
          className="hover:underline me-3 text-sm text-gray-400 border-gray-300"
          to="/footer"
        >
          Hướng dẫn Cộng đồng
        </NavLink>
      </div>
      <div>
        <NavLink
          className="hover:underline me-3 text-sm text-gray-400 border-gray-300"
          to="/footer"
        >
          Thêm
        </NavLink>
      </div>
      <p className="text-sm">© 2023 TikTok</p>
    </div>
  );
};

export default Footer;
