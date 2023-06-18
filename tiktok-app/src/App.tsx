import { Route, Routes } from "react-router-dom";
import Root from "./pages/Root/Root";
import NewsFeed from "./pages/User/NewsFeed/NewsFeed";
import ComingSoon from "./components/ComingSoon";
import UserDetail from "./components/UserDetail";
import WrapperApp from "@/context/WrapperApp";

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <WrapperApp>
            <Root />
          </WrapperApp>
        }
      >
        <Route path="/" element={<NewsFeed />}></Route>
        <Route path="/userId" element={<UserDetail />}></Route>
        <Route path="/following" element={<NewsFeed />} />
        <Route path="/explore" element={<ComingSoon />}></Route>
        <Route path="/live" element={<ComingSoon />}></Route>
      </Route>
    </Routes>
  );
}

export default App;
