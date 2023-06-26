import { Route, Routes } from 'react-router-dom';
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
          <Route path="/" element={
            <AuthBlocking whenRefresh>
              <NewsFeed />
            </AuthBlocking>
          }
          ></Route>

          <Route path="/videodetails/:videoId" element={
            <AuthBlocking>
              <VideoDetails />
            </AuthBlocking>
          }
          />
          <Route path="/:userId" element={
            <AuthBlocking>
              <UserDetail />
            </AuthBlocking>
          }
          ></Route>
          <Route path="/following" element={<NewsFeed />} />
          <Route path="/chat" element={
            <AuthBlocking>
              <Chat />
            </AuthBlocking>
          }></Route>
          <Route path="/upload" element={
            <AuthBlocking>
              <UploadVideo />
            </AuthBlocking>
          } />
        </Route>
      </Routes>
      <ToastContainer autoClose={500} />
    </>
  );
}

export default App;
