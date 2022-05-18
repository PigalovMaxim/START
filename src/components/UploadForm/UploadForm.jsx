//Зависимости
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LINKS, uploadPost } from "../../common";
import cn from "classnames";
//Другое
import Button from "../Button/Button";
import s from "./UploadForm.module.scss";

function UploadForm() {
  const [isPhotoUploaded, setPhotoUploaded] = useState(false);
  const [isVideoUploaded, setVideoUploaded] = useState(false);
  const [isAudioUploaded, setAudioUploaded] = useState(false);
  const [photoText, setPhotoText] = useState('');
  const [videoText, setVideoText] = useState('');
  const [audioText, setAudioText] = useState('');
  const textInp = useRef();
  const photoInp = useRef();
  const videoInp = useRef();
  const audioInp = useRef();
  const history = useNavigate();
  function setText(file, setUploaded, setItemText) {
    if (file.files.length === 0) {
      setUploaded(false);
      return;
    }
    if (
      file.files[file.files.length - 1] &&
      file.files[file.files.length - 1].name &&
      file.files[file.files.length - 1].name.length >= 50
    )
    setItemText(file.files[file.files.length - 1].name.substr(0, 30) + "...");
    else setItemText(file.files[file.files.length - 1].name);
  }
  return (
    <div className={s.wrapper}>
      <div className={s.form}>
        <label className={s.title}>Загрузите свой пост</label>
        <div className={s.content}>
          <label className={s.text}>Текст поста</label>
          <textarea ref={textInp} className={s.textInp} />
          <label className={s.text}>Выложите фото</label>
          <input
            type="file"
            name="imageFile"
            accept=".jpg,.jpeg,.png"
            ref={photoInp}
            className={s.hideInput}
            id="postPhoto"
            onChange={() => {
              setPhotoUploaded(true);
              setText(photoInp.current, setPhotoUploaded, setPhotoText);
            }}
          />
          <label
            className={cn(s.inputLabel, isPhotoUploaded ? s.active : "")}
            htmlFor="postPhoto"
          >
            {isPhotoUploaded
              ? `Загружено фото: ${photoText}`
              : "Загрузить фото"}
          </label>
          <label className={s.text}>Выложите видео</label>
          <input
            type="file"
            name="imageFile"
            accept="video/*"
            ref={videoInp}
            className={s.hideInput}
            id="postVideo"
            onChange={() => {
              setVideoUploaded(true);
              setText(videoInp.current, setVideoUploaded, setVideoText);
            }}
          />
          <label
            className={cn(s.inputLabel, isVideoUploaded ? s.active : "")}
            htmlFor="postVideo"
          >
            {isVideoUploaded
              ? `Загружено видео: ${videoText}`
              : "Загрузить видео"}
          </label>
          <label className={s.text}>Выложите аудио</label>
          <input
            type="file"
            name="imageFile"
            accept="audio/*"
            ref={audioInp}
            className={s.hideInput}
            id="postAudio"
            onChange={() => {
              setAudioUploaded(true);
              setText(audioInp.current, setVideoUploaded, setAudioText);
            }}
          />
          <label
            className={cn(s.inputLabel, isAudioUploaded ? s.active : "")}
            htmlFor="postAudio"
          >
            {isAudioUploaded
              ? `Загружено аудио: ${audioText}`
              : "Загрузить аудио"}
          </label>
        </div>
        <Button
          classnames={s.btn}
          click={() => {
            const data = {
              image: photoInp.current.files[photoInp.current.files.length - 1] || null,
              video: videoInp.current.files[videoInp.current.files.length - 1] || null,
              audio: audioInp.current.files[audioInp.current.files.length - 1] || null,
            };
            if (
              textInp.current.value === "" &&
              data.image === null &&
              data.video === null &&
              data.audio === null
            )
              return;
            uploadPost(data, textInp.current.value);
            history(`${LINKS.PROFILE}/${localStorage.getItem("userName")}`);
          }}
          text={"Выложить пост"}
        />
        <Button
          classnames={s.exitButton}
          click={() => {
            history(`${LINKS.PROFILE}/${localStorage.getItem("userName")}`);
          }}
          text={"Назад"}
        />
      </div>
    </div>
  );
}

export default UploadForm;
