//Зависимости
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { FILES_TYPES, LINKS, uploadPost } from "../../common";
//Другое
import Button from "../Button/Button";
import s from "./UploadForm.module.scss";
import FileInput from "../FileInput/FileInput";

function UploadForm() {
  const textInp = useRef();
  const photoInp = useRef();
  const videoInp = useRef();
  const audioInp = useRef();
  const history = useNavigate();
  return (
    <div className={s.wrapper}>
      <div className={s.form}>
        <label className={s.title}>Загрузите свой пост</label>
        <div className={s.content}>
          <label className={s.text}>Текст поста</label>
          <textarea ref={textInp} className={s.textInp} />
          <label className={s.text}>Выложите фото</label>
          <FileInput refer={photoInp} type={FILES_TYPES.PHOTO} />
          <label className={s.text}>Выложите видео</label>
          <FileInput refer={videoInp} type={FILES_TYPES.VIDEO} />
          <label className={s.text}>Выложите аудио</label>
          <FileInput refer={audioInp} type={FILES_TYPES.AUDIO} />
        </div>
        <Button
          classnames={s.btn}
          click={() => {
            const data = {
              image:
                photoInp.current.files[photoInp.current.files.length - 1] ||
                null,
              video:
                videoInp.current.files[videoInp.current.files.length - 1] ||
                null,
              audio:
                audioInp.current.files[audioInp.current.files.length - 1] ||
                null,
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
