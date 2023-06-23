import { Route, Routes } from 'react-router-dom';
import Root from './pages/Root/Root';
import NewsFeed from './pages/User/NewsFeed/NewsFeed';
import ComingSoon from './components/ComingSoon';
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
              <AuthBlocking>
                <Root />
              </AuthBlocking>
            </WrapperApp>
          }
        >
          <Route path="/" element={<NewsFeed />}></Route>
          {/* <Route path="/:userId/video/:videoId" element={<VideoDetails />} /> */}
          <Route path="/videodetails" element={<VideoDetails />} />
          <Route path="/userId" element={<UserDetail />}></Route>
          <Route path="/following" element={<NewsFeed />} />
          <Route path="/explore" element={<ComingSoon />}></Route>
          <Route path="/chat" element={<Chat />}></Route>
          <Route path="/live" element={<ComingSoon />}></Route>
          <Route path="/upload" element={<UploadVideo />} />
        </Route>
      </Routes>
      <ToastContainer autoClose={500} />
    </>
  );
}

export default App;
