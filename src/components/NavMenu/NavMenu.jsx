import { Link } from "react-router-dom";
import s from "./NavMenu.module.scss";

function NavMenu(props) {
  return (
    <div className={s.wrapper}>
      <Link to="Newsfeed" className={s.navOption}>
        Лента
      </Link>
      <Link to={`Profile/${localStorage.getItem('userName')}`} className={s.navOption}>
        Профиль
      </Link>
      <Link to="Users" className={s.navOption}>
        Пользователи
      </Link>
    </div>
  );
}

export default NavMenu;
