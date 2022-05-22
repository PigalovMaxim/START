//Зависимости
import { useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { LINKS, FILES_TYPES, editPost } from "../../common";
//Другое
import Button from "../Button/Button";
import s from "./EditPost.module.scss";
import FileInput from "../FileInput/FileInput";

function EditPost() {
  const params = useParams();
  const textInp = useRef();
  const photoInp = useRef();
  const videoInp = useRef();
  const audioInp = useRef();
  const history = useNavigate();
  useEffect(() => {
    textInp.current.value = params.text;
  }, []);
  return (
    <div className={s.wrapper}>
      <div className={s.form}>
        <label className={s.title}>Изменить пост</label>
        <div className={s.content}>
          <label className={s.text}>Изменить текст поста</label>
          <textarea ref={textInp} className={s.textInp} />
          <FileInput classnames={s.inp} refer={photoInp} type={FILES_TYPES.PHOTO} />
          <FileInput classnames={s.inp} refer={videoInp} type={FILES_TYPES.VIDEO} />
          <FileInput classnames={s.inp} refer={audioInp} type={FILES_TYPES.AUDIO} />
        </div>
        <Button
          classnames={s.btn}
          click={() => {
            const imageFile = photoInp.current.files[photoInp.current.files.length - 1] || (params.image === 'null') ? '' : params.image;
            const videoFile = videoInp.current.files[videoInp.current.files.length - 1] || (params.video === 'null') ? '' : params.video;
            const audioFile = audioInp.current.files[audioInp.current.files.length - 1] || (params.audio === 'null') ? '' : params.audio;
            const data = {
              image: imageFile,
              video: videoFile,
              audio: audioFile
            };
            if (
              textInp.current.value === "" &&
              data.image === null &&
              data.video === null &&
              data.audio === null
            )
              return;
            editPost(data, textInp.current.value, params.id);
            history(`${LINKS.PROFILE}/${localStorage.getItem("userName")}`);
          }}
          text={"Сохранить изменения"}
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

export default EditPost;
