//Зависимости
import { Link, useNavigate } from "react-router-dom";
import { deleteStorage } from "../../common";
import { LINKS } from "../../common";
import cn from 'classnames';
//Компоненты
import Button from "../Button/Button";
//Другое
import s from "./NavMenu.module.scss";

function NavMenu(props) {
  let shouldBeOpened = props.isMenuOpen;
  const screenSizeBig = window.screen.width > 930;
  if(screenSizeBig) shouldBeOpened = false;
  const history = useNavigate();
  return (
    <div className={cn(s.wrapper, shouldBeOpened ? '' : s.closed)}>
      <Link to={LINKS.NEWSFEED} className={s.navOption}>
        Лента
      </Link>
      <Link to={LINKS.MY_PROFILE} className={s.navOption}>
        Профиль
      </Link>
      <Link to={LINKS.USERS} className={s.navOption}>
        Пользователи
      </Link>
      {
        !screenSizeBig ? <Button classnames={s.btn} click={ () => {
          props.setUserLogin(false);
          history(LINKS.WELCOME);
          deleteStorage();
        }} text='Выйти'/> : <div/>
      }
      
    </div>
  );
}

export default NavMenu;
