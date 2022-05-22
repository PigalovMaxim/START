//Зависимости
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  updateAvatar,
  updateDescription,
  updateName,
  LINKS,
  FILES_TYPES
} from "../../../common";
//Компоненты
import Button from "../../Button/Button";
import Input from "../../Input";
//Другое
import s from "./ProfileSettings.module.scss";
import FileInput from "../../FileInput/FileInput";

function ProfileSettings() {
  const history = useNavigate();
  const nameInp = useRef();
  const descInp = useRef();
  const photoInp = useRef();
  function pushName() {
    if (nameInp.current.value === "") return;
    updateName(nameInp.current.value);
    history(`${LINKS.PROFILE}/${localStorage.getItem("userName")}`);
  }
  function pushDesc() {
    if (descInp.current.value === "") return;
    updateDescription(descInp.current.value);
    history(`${LINKS.PROFILE}/${localStorage.getItem("userName")}`);
  }
  function pushAvatar() {
    if (!photoInp.current.files[0]) return;
    updateAvatar(photoInp.current.files[photoInp.current.files.length - 1]);
    history(`${LINKS.PROFILE}/${localStorage.getItem("userName")}`);
  }
  return (
    <div className={s.settings}>
      <label className={s.title}>Редактировать профиль</label>
      <label className={s.settingsName}>Сменить аватарку</label>
      <FileInput refer={photoInp} type={FILES_TYPES.PHOTO} />
      <Button classnames={s.btn} click={pushAvatar} text={"Загрузить аватарку"} />
      <label className={s.settingsName}>Сменить имя</label>
      <Input text="Имя (не более 40 символов)" refer={nameInp} classnames={s.inp} />
      <Button classnames={s.btn} click={pushName} text={"Загрузить имя"} />
      <label className={s.settingsName}>Сменить описание профиля</label>
      <textarea placeholder="Описание профиля (не более 300 символов)" ref={descInp} className={s.textArea} />
      <Button classnames={s.btn} click={pushDesc} text={"Загрузить описание"} />
      <Button
          classnames={s.exitButton}
          click={() => {
            history(`${LINKS.PROFILE}/${localStorage.getItem('userName')}`);
          }}
          text={"Назад"}
        />
    </div>
  );
}

export default ProfileSettings;
