//Зависимости
import { useRef, useState } from "react";
import { Login, setStorage, Registration } from "../../common";
import cn from "classnames";
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
  const [messageClassnames, setMessageClassnames] = useState(s.displayNone);
  const [canClickRegistrationBtn, setAblilityClick] = useState(true);
  const [messageText, setMessageText] = useState('');
  const loginInp = useRef();
  const passInp = useRef();
  const nameInp = useRef();
  async function registraion() {
    if(!canClickRegistrationBtn) return;
    setAblilityClick(false);
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
    if(loginInp.current.value.length <= 5 || loginInp.current.value.length > 40) {
      showMessageError('Логин должен быть длиннее 5 символов и не более 40 символов');
      setAblilityClick(true);
      return;
    }
    if(passInp.current.value.length <= 2) {
      showMessageError('Пароль должен быть длиннее 2 символов');
      setAblilityClick(true);
      return;
    }
    for(let i = 0; i < loginInp.current.value.length; i++) if(!letters.includes(loginInp.current.value[i])) {
      showMessageError('Логин должен содержать только символы a-z, A-Z, 0-9, -, _');
      setAblilityClick(true);
      return;
    }
    for(let i = 0; i < passInp.current.value.length; i++) if(!letters.includes(passInp.current.value[i])) {
      showMessageError('Пароль должен содержать только символы a-z, A-Z, 0-9, -, _');
      setAblilityClick(true);
      return;
    }
    const data =await Registration(
      loginInp.current.value,
      passInp.current.value,
      nameInp.current.value
    );
    if (!data) {
      showMessageError('Такой логин уже существует');
      setAblilityClick(true);
      return;
    }
    setLoginForm(true);
    setAblilityClick(true);
  }
  async function login() {
    const data = await Login(loginInp.current.value, passInp.current.value);
    if (!data) {
      showMessageError('Неправильный логин или пароль');
      return;
    }
    props.setUserLogin(true);
    setStorage(data.avatar, data.login, data.description, data.name);
  }
  function showMessageError(error){
    setMessageClassnames('');
    setMessageText(error);
    setTimeout(() => {
      setMessageClassnames(s.opacity0);
    }, 1000);
    setTimeout(() => {
      setMessageClassnames(cn(s.opacity0, s.displayNone));
    }, 3200);
  }
  return (
    <div className={s.wrapper}>
      <div className={cn(s.message, messageClassnames)}>
        {messageText}
      </div>
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
            text="Логин (6 или более символов)"
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
            classnames={cn(s.btn, canClickRegistrationBtn ? '' : s.btnBlocked)}
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
