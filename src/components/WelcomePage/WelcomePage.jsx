//Зависимости
import { useRef, useState } from "react";
import { Login, setStorage, Registration } from "../../common";
//Фотографии
import logo from "../../imgs/logo.png";
import miniLogo from "../../imgs/smallLogo.png";
import loginIcon from "../../imgs/login.png";
import nameIcon from "../../imgs/name.png";
import passwordIcon from "../../imgs/password.png";
//Компоненты
import Input from "../Input/Input";
import Button from "../Button/Button";
//Другое
import s from "./WelcomePage.module.scss";

function WelcomePage(props) {
  const [isLoginForm, setLoginForm] = useState(true);
  const loginInp = useRef();
  const passInp = useRef();
  const nameInp = useRef();
  async function registraion() {
    const letters = [
      "a",
      "b",
      "c",
      "d",
      "e",
      "f",
      "g",
      "h",
      "i",
      "j",
      "k",
      "l",
      "m",
      "n",
      "o",
      "p",
      "q",
      "r",
      "s",
      "t",
      "u",
      "v",
      "w",
      "x",
      "y",
      "z",
      "A",
      "B",
      "C",
      "D",
      "E",
      "F",
      "G",
      "H",
      "I",
      "J",
      "K",
      "L",
      "M",
      "N",
      "O",
      "P",
      "Q",
      "R",
      "S",
      "T",
      "U",
      "V",
      "W",
      "X",
      "Y",
      "Z",
      "0",
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "_",
      "-"
    ];
    setLoginForm(true);
    for(let i = 0; i < loginInp.current.value.length; i++) if(!letters.includes(loginInp.current.value[i])) return;
    for(let i = 0; i < passInp.current.value.length; i++) if(!letters.includes(passInp.current.value[i])) return;
    await Registration(
      loginInp.current.value,
      passInp.current.value,
      nameInp.current.value
    );
  }
  async function login() {
    const data = await Login(loginInp.current.value, passInp.current.value);
    if (!data) return;
    props.setUserLogin(true);
    setStorage(data.avatar, data.login, data.description, data.name);
  }
  return (
    <div className={s.wrapper}>
      <div className={s.intro}>
        <img src={logo} />
        <label className={s.introText}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </label>
      </div>
      {isLoginForm ? (
        <div className={s.login_form}>
          <img className={s.logo} src={miniLogo} />
          <label className={s.title}>Войдите в свой аккаунт</label>
          <Input
            refer={loginInp}
            img={loginIcon}
            wrapclx={s.inp}
            text="Логин"
          />
          <Input
            refer={passInp}
            img={passwordIcon}
            wrapclx={s.inp}
            text="Пароль"
          />
          <Button click={login} classnames={s.btn} text="Войти" />
          <Button
            click={() => setLoginForm(false)}
            classnames={s.transparentBtn}
            text="Нет аккаунта? Зарегистрируйтесь!"
          />
        </div>
      ) : (
        <div className={s.registration_form}>
          <img className={s.logo} src={miniLogo} />
          <label className={s.title}>Зарегистрируйтесь</label>
          <Input
            refer={loginInp}
            img={loginIcon}
            wrapclx={s.inp}
            text="Логин (5 или более символов)"
          />
          <Input refer={nameInp} img={nameIcon} wrapclx={s.inp} text="Имя" />
          <Input
            refer={passInp}
            img={passwordIcon}
            wrapclx={s.inp}
            text="Пароль"
          />
          <Button
            click={registraion}
            classnames={s.btn}
            text="Зарегистрироваться"
          />
          <Button
            click={() => setLoginForm(true)}
            classnames={s.transparentBtn}
            text="Есть аккаунт? Войдите!"
          />
        </div>
      )}
    </div>
  );
}

export default WelcomePage;
