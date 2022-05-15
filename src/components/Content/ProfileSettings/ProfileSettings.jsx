//Зависимости
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { changeProfileSettings, LINKS } from "../../../common";
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
  function pushData() {
    if(!photoInp.current.files[0] && descInp.current.value === '' && nameInp.current.value === '') return;
    changeProfileSettings(photoInp.current.files[0], nameInp.current.value, descInp.current.value);
    history(LINKS.MY_PROFILE);
  }
  return (
    <div className={s.settings}>
      <label className={s.title}>Редактировать профиль</label>
      <div className={s.block}>
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
          {isPhotoUploaded ? `Загружено фото: ${(photoInp.current.files[0].name.length >= 50) ? photoInp.current.files[0].name.substr(0, 30) + '...' : photoInp.current.files[0].name}` : 'Загрузить фото'}
        </label>
        <label className={s.settingsName}>Сменить имя</label>
        <Input refer={nameInp} classnames={s.inp} />
        <label className={s.settingsName}>Сменить описание профиля</label>
        <textarea ref={descInp} className={s.textArea} />
      </div>
      <Button click={pushData} text={"Загрузить"} />
    </div>
  );
}

export default ProfileSettings;
