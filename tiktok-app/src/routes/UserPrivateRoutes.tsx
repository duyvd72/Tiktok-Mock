import useModal from '@/hooks/useModal';
import { getAccessToken } from '@/utils/accessTokenLS';

interface IProps {
  children: JSX.Element;
}

const UserPrivateRoutes = (props: IProps) => {
  // console.log(123);
  const { children } = props;
  // const { setModalIsOpen } = useModal();
  const token = getAccessToken();
  // console.log(token);

  if (token === null || token === 'undefined') {
    // setModalIsOpen(true);
    return;
  }
  return children;
};

export default UserPrivateRoutes;
