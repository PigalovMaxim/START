//Зависимости
import { useEffect, useRef, useState } from "react";
//Фотографии
import pause from '../../../imgs/pauseButton.png';
import play from '../../../imgs/playButton.png';
//Другое
import s from "./Audio.module.scss";

function Audio(props) {
  const [isSongPlay, setSongPlay] = useState(false);
  const audio = useRef();
  const progress = useRef();
  const time = useRef();
  function Control() {
    if(isSongPlay) {
      setSongPlay(false);
      audio.current.pause();
    } else {
      setSongPlay(true);
      audio.current.play();
    }
  }
  function updateTime(e) {
    const {duration, currentTime} = e.srcElement;
    time.current.innerHTML = `${toTime(Math.round(currentTime))} / ${toTime(Math.round(duration))}`; 
    progress.current.style.width = `${currentTime / duration * 100}%`
  }
  function toTime(seconds) {
    if(isNaN(seconds)) return '00:00';
    const times = {minutes: 0, seconds: seconds};
    while(times.seconds - 60 >= 0) {
      times.minutes += 1;
      times.seconds -= 60;
    }
    const min = times.minutes < 10 ? `0${times.minutes}` : `${times.minutes}`;
    const sec = times.seconds < 10 ? `0${times.seconds}` : `${times.seconds}`;
    return `${min}:${sec}`;
  }
  useEffect(() => {
    if(audio.current) {
      audio.current.addEventListener('timeupdate', updateTime);
      time.current.innerHTML = toTime(Math.round(audio.current.duration));
    }
    return () => {
      if(audio.current) audio.current.removeEventListener('timeupdate', updateTime);
    }
  }, []);
  return (
    <div className={s.audio}>
        <button onClick={Control} className={s.controlBtn}>
          <img src={isSongPlay ? pause : play} className={s.controlImg}/>
        </button>
        <div className={s.progressBar}>
          <div ref={progress} className={s.progress}></div>
        </div>
        <label ref={time} className={s.time}>0:00</label>
        <audio ref={audio} src={props.SRC}/>
    </div>
  );
}

export default Audio;
