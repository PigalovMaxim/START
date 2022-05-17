//Зависимости
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  updateAvatar,
  updateDescription,
  updateName,
  LINKS,
} from "../../../common";
import cn from "classnames";
//Компоненты
import Button from "../../Button/Button";
import Input from "../../Input";
//Другое
import s from "./ProfileSettings.module.scss";

function ProfileSettings() {
  const [isPhotoUploaded, setPhotoUploaded] = useState(false);
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
    updateAvatar(photoInp.current.files[0]);
    history(`${LINKS.PROFILE}/${localStorage.getItem("userName")}`);
  }
  return (
    <div className={s.settings}>
      <label className={s.title}>Редактировать профиль</label>
      <label className={s.settingsName}>Сменить аватарку</label>
      <input
        type="file"
        name="imageFile"
        accept=".jpg,.jpeg,.png"
        ref={photoInp}
        className={s.hideInput}
        id={s.avatarPhoto}
        onChange={() => setPhotoUploaded(true)}
      />
      <label
        className={cn(s.labelFor, isPhotoUploaded ? s.active : "")}
        htmlFor={s.avatarPhoto}
      >
        {isPhotoUploaded
          ? `Загружено фото: ${
              photoInp.current.files[0].name.length >= 50
                ? photoInp.current.files[0].name.substr(0, 30) + "..."
                : photoInp.current.files[0].name
            }`
          : "Загрузить фото"}
      </label>
      <Button classnames={s.btn} click={pushAvatar} text={"Загрузить аватарку"} />
      <label className={s.settingsName}>Сменить имя</label>
      <Input text="Имя (не более 40 символов)" refer={nameInp} classnames={s.inp} />
      <Button classnames={s.btn} click={pushName} text={"Загрузить имя"} />
      <label className={s.settingsName}>Сменить описание профиля</label>
      <textarea placeholder="Описание профиля (не более 300 символов)" ref={descInp} className={s.textArea} />
      <Button classnames={s.btn} click={pushDesc} text={"Загрузить описание"} />
    </div>
  );
}

export default ProfileSettings;
