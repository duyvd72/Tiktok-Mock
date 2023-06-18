import { Route, Routes } from 'react-router-dom';
import Root from './pages/Root/Root';
import NewsFeed from './pages/User/NewsFeed/NewsFeed';
import ComingSoon from './components/ComingSoon';
import VideoDetails from './pages/VideoDetails/VideoDetails';
function App() {
  return (
    <Routes>
      <Route path="/" element={<Root />}>
        <Route path="/" element={<NewsFeed />} />
        <Route path="/following" element={<NewsFeed />} >
          <Route path="videodetails" element={<VideoDetails />} />
        </Route>
        <Route path="/explore" element={<ComingSoon />}></Route>
        <Route path="/live" element={<ComingSoon />}></Route>
      </Route>
    </Routes>
  );
}

export default App;
