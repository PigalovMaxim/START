import { Route, Routes } from "react-router-dom";

import MyProfile from "./MyProfile";
import Profile from "./Profile";
import Newsfeed from "./Newsfeed";
import Users from "./Users";

import s from "./Content.module.scss";

function Content(props) {
  return (
    <div className={s.wrapper}>
      {props.isUserLogin ? (
        <Routes>
          <Route path="*" element={<div>Выберите меню слева</div>} />
          <Route path="/Newsfeed" element={<Newsfeed />} />
          <Route path="/Users" element={<Users />} />
          <Route path={`/Profile/${localStorage.getItem('userName')}`} element={<MyProfile />} />
          <Route path={`/Profile/*`} element={<Profile />} />
        </Routes>
      ) : (
        <Routes>
          <Route path="/Newsfeed" element={<div>Вы не авторизованы</div>} />
          <Route path="/Users" element={<div>Вы не авторизованы</div>} />
          <Route path="/Profile/*" element={<div>Вы не авторизованы</div>} />
        </Routes>
      )}
    </div>
  );
}

export default Content;
