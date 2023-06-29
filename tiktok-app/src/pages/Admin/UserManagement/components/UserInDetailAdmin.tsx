import defaultAva from '@/assets/images/default-ava.png';
import VideoTable from './VideoTable';
import { useParams } from 'react-router';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { useEffect } from 'react';
import { getUserByIdAPI } from '@/api/adminAPIs';
import { convertDateFormat } from '@/utils/formateDate';

const UserInDetailAdmin = () => {
  const params = useParams();
  const dispatch = useAppDispatch();
  const userId = params.userId as string;

  useEffect(() => {
    dispatch(getUserByIdAPI(userId));
  }, []);

  const viewingUserInDetail = useAppSelector(
    (state) => state.userManagement.viewingUserInDetail
  );

  const loading = useAppSelector((state) => state.userManagement.loading);

  return (
    <div>
      {!loading && (
        <>
          <div className="flex justify-between w-[50%] mx-auto">
            <div>
              <img
                src={viewingUserInDetail?.avatarUrl ?? defaultAva}
                alt=""
                className="w-[200px] rounded-full"
              />
            </div>
            <div>
              <p>
                <strong>Id:</strong> {viewingUserInDetail?._id}
              </p>
              <p>
                <strong>Nickname: </strong> {viewingUserInDetail?.nickname}
              </p>
              <p>
                <strong>FullName: </strong> {viewingUserInDetail?.fullname}
              </p>
              <p>
                <strong>Số người follow: </strong>{' '}
                {viewingUserInDetail?.follow.length}
              </p>
              <p>
                <strong>Đang follow: </strong>{' '}
                {viewingUserInDetail?.following.length}
              </p>
              <p>
                <strong>Số lượng like: </strong> 6868
              </p>
              <p>
                <strong>Ngày tạo tài khoản: </strong>{' '}
                {convertDateFormat(viewingUserInDetail?.createdAt as string)}
              </p>
            </div>
          </div>
          <h1 className="mt-5 font-bold text-xl">Danh sách video</h1>
          <div className="p-5">
            <VideoTable />
          </div>
        </>
      )}
    </div>
  );
};

export default UserInDetailAdmin;
