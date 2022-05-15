//Зависимости
import { Route, Routes } from "react-router-dom";
import { LINKS } from "../../common";
//Компоненты
import ProfileSettings from "./ProfileSettings/ProfileSettings";
import MyProfile from "./MyProfile";
import Profile from "./Profile";
import Newsfeed from "./Newsfeed";
import Users from "./Users";
//Разное
import s from "./Content.module.scss";

function Content(props) {

  return (
    <div className={s.wrapper}>
      {props.isUserLogin ? (
        <Routes>
          <Route path="*" element={<div className={s.unchoosen}>{(window.screen.width <= 930) ? 'Свайпните вправо, что бы открыть меню' : 'Выберите меню слева'}</div>} />
          <Route path={LINKS.NEWSFEED} element={<Newsfeed />} />
          <Route path={LINKS.USERS} element={<Users />} />
          <Route path={LINKS.MY_PROFILE} element={<MyProfile />} />
          <Route path={`${LINKS.PROFILE}/*`} element={<Profile />} />
          <Route path={LINKS.PROFILE_SETTINGS} element={<ProfileSettings/>}/>
        </Routes>
      ) : (
        <Routes>
          <Route path="/*" element={<div className={s.unauthorize}>Вы не авторизованы</div>} />
        </Routes>
      )}
    </div>
  );
}

export default Content;
