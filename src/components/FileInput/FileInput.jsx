import cn from "classnames";
import { useState } from "react";
import { FILES_TYPES } from "../../common";
import s from "./FileInput.module.scss";

function FileInput(props) {
  const [isPhotoUploaded, setPhotoUploaded] = useState(false);
  const [isVideoUploaded, setVideoUploaded] = useState(false);
  const [isAudioUploaded, setAudioUploaded] = useState(false);
  const [photoText, setPhotoText] = useState("");
  const [videoText, setVideoText] = useState("");
  const [audioText, setAudioText] = useState("");
  function setText(setUploaded, setItemText) {
    if (props.refer.current.files.length === 0) {
      setUploaded(false);
      return;
    }
    if (
      props.refer.current.files[props.refer.current.files.length - 1] &&
      props.refer.current.files[props.refer.current.files.length - 1].name &&
      props.refer.current.files[props.refer.current.files.length - 1].name
        .length >= 50
    )
      setItemText(
        props.refer.current.files[
          props.refer.current.files.length - 1
        ].name.substr(0, 20) + "..."
      );
    else
      setItemText(
        props.refer.current.files[props.refer.current.files.length - 1].name
      );
  }
  return (
    <div className={cn(props.classnames ? props.classnames : '', s.wrapper)}>
      {props.type === FILES_TYPES.PHOTO ? (
        <div className={s.text}>
          <input
            type="file"
            name="imageFile"
            accept=".jpg,.jpeg,.png"
            ref={props.refer ? props.refer : null}
            className={s.hideInput}
            id="postPhoto"
            onChange={() => {
              setPhotoUploaded(true);
              setText(setPhotoUploaded, setPhotoText);
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
        </div>
      ) : props.type === FILES_TYPES.VIDEO ? (
        <div className={s.text}>
          <input
            type="file"
            name="imageFile"
            accept="video/*"
            ref={props.refer ? props.refer : null}
            className={s.hideInput}
            id="postVideo"
            onChange={() => {
              setVideoUploaded(true);
              setText(setVideoUploaded, setVideoText);
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
        </div>
      ) : (
        <div className={s.text}>
          <input
            type="file"
            name="imageFile"
            accept="audio/*"
            ref={props.refer ? props.refer : null}
            className={s.hideInput}
            id="postAudio"
            onChange={() => {
              setAudioUploaded(true);
              setText(setVideoUploaded, setAudioText);
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
      )}
    </div>
  );
}

export default FileInput;
