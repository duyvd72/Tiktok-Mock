import { Navigate, Route, Routes } from 'react-router-dom';
import Root from './pages/Root/Root';
import NewsFeed from './pages/User/NewsFeed/NewsFeed';
import UserDetail from './components/UserDetail';
import WrapperApp from '@/context/WrapperApp';
import UploadVideo from '@/pages/User/UploadVideo/UploadVideo';
import VideoDetails from '@/pages/User/VideoDetails/VideoDetails';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import Chat from '@/components/Chat';
import AuthBlocking from './components/AuthBlocking';
import AdminRoot from './pages/Admin/components/AdminRoot';
import AdminHome from './pages/Admin/components/AdminHome';
import UserManagement from './pages/Admin/UserManagement/components/UserManagement';
import UserInDetailAdmin from './pages/Admin/UserManagement/components/UserInDetailAdmin';
import AdminPrivateRoutes from './routes/AdminPrivateRoutes';

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
