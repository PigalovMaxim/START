//Зависимости
import { deleteStorage } from "../../common";
import { LINKS } from "../../common";
import { useNavigate } from 'react-router-dom';
//Компоненты
import Button from "../Button/Button";
//Другое
import logo from "../../imgs/smallLogo.png";
import undefinedUserIcon from "../../imgs/undefinedUser.png";
import s from "./Header.module.scss";

function Header(props) {
  const history = useNavigate();
  return (
    <header className={s.wrapper}>
      <img src={logo} />
      <div className={s.account}>
        <label className={s.userName}>{localStorage.getItem('name')}</label>
        <img className={s.avatar} src={localStorage.getItem('avatar') ? localStorage.getItem('avatar') : undefinedUserIcon}/>
        <Button classnames={s.btn} click={ () => {
          props.setUserLogin(false);
          history(LINKS.WELCOME);
          deleteStorage();
        }} text='Выйти'/>
      </div>
    </header>
  );
}

export default Header;
