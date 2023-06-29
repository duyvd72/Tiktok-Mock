import { Navigate, Route, Routes } from 'react-router-dom';
import NewsFeed from './modules/User/NewsFeed/NewsFeed';
import UserDetail from './components/UserDetail';
import WrapperApp from '@/context/WrapperApp';
import UploadVideo from '@/modules/User/UploadVideo/UploadVideo';
import VideoDetails from '@/modules/User/VideoDetails/VideoDetails';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import Chat from '@/components/Chat';
import AuthBlocking from './components/AuthBlocking';
import AdminRoot from './modules/Admin/components/AdminRoot';
import AdminHome from './modules/Admin/components/AdminHome';
import UserManagement from './modules/Admin/UserManagement/components/UserManagement';
import UserInDetailAdmin from './modules/Admin/UserManagement/components/UserInDetailAdmin';
import AdminPrivateRoutes from './routes/AdminPrivateRoutes';
import Root from './modules/Root/Root';

function App() {
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <WrapperApp>
              <Root />
            </WrapperApp>
          }
        >
          <Route
            path="/following"
            element={
              <AuthBlocking whenRefresh>
                <NewsFeed />
              </AuthBlocking>
            }
          />
          <Route
            path="/"
            element={
              <AuthBlocking whenRefresh>
                <NewsFeed />
              </AuthBlocking>
            }
          ></Route>
          <Route
            path="/videodetails/:videoId"
            element={
              <AuthBlocking>
                <VideoDetails />
              </AuthBlocking>
            }
          />
          <Route
            path="/:userId"
            element={
              <AuthBlocking>
                <UserDetail />
              </AuthBlocking>
            }
          ></Route>
          <Route
            path="/chat"
            element={
              <AuthBlocking>
                <Chat />
              </AuthBlocking>
            }
          ></Route>
          <Route
            path="/upload"
            element={
              <AuthBlocking>
                <UploadVideo />
              </AuthBlocking>
            }
          />
        </Route>
        <Route
          path="admin"
          element={
            <AdminPrivateRoutes>
              <AdminRoot />
            </AdminPrivateRoutes>
          }
        >
          <Route path="" element={<Navigate to="home" />} />
          <Route path="home" element={<AdminHome />} />
          <Route path="user-management" element={<UserManagement />} />
          <Route
            path="user-management/:userId"
            element={<UserInDetailAdmin />}
          />
          <Route path="*" element={<Navigate to="home" />} />
        </Route>
      </Routes>
      <ToastContainer autoClose={500} />
    </>
  );
}

export default App;
