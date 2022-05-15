//Зависимости
import { useState } from "react";
import { likePost, dislikePost } from "../../common";
//Фотографии
import likeIcon from "../../imgs/like.png";
import likeActiveIcon from "../../imgs/likeActive.png";
import undefinedUserIcon from "../../imgs/undefinedUser.png";
//Компоненты
import Audio from "./Audio";
//Другое
import s from "./Post.module.scss";


function Post(props) {
  const [likesCount, setLikesCount] = useState(props.likes ? props.likes - 0 : 0);
  const [isLikeClicked, setClicked] = useState(false);
  function makeRightData() {
    const months=[
         'Янв',
         'Февр',
         'Мар',
         'Апр',
         'Мая',
         'Июн',
         'Июл',
         'Авг',
         'Сен',
         'Ноя',
         'Дек',
      ];
    let strArr = props.date.substring(0, 10).split('-');
    return parseInt(strArr[2]) + ' ' + months[parseInt(strArr[1]) - 1] + ' ' + strArr[0].substring(2) + ' в ' + (parseInt(props.date.substring(11, 13)) + 1) + ':' + props.date.substring(14, 16);
  }
  return (
    <div className={s.wrapper}>
      <div className={s.postInfo}>
        <img src={props.avatar ? props.avatar : undefinedUserIcon} />
        <div className={s.text}>
          <label className={s.name}>{props.name}</label>
          <label className={s.date}>{makeRightData()}</label>
        </div>
      </div>
      <div className={s.postContent}>
        <label className={s.text}>{props.text}</label>
        {props.postImage ? (
          <img className={s.visual} src={props.postImage} />
        ) : (
          <div />
        )}
        {props.video ? (
          <video
            className={s.visual}
            src={props.video}
            controls="controls"
          />
        ) : (
          <div />
        )}
        {props.audio ? <Audio SRC={props.audio} /> : <div />}
        <div
          onClick={() => {
            if (isLikeClicked) {
              setLikesCount(likesCount - 1);
              dislikePost(props.id);
            } else {
              setLikesCount(likesCount + 1);
              likePost(props.id);
            }
            setClicked(!isLikeClicked);
          }}
          className={s.postInteractive}
        >
          <img src={isLikeClicked ? likeActiveIcon : likeIcon} />
          {likesCount}
        </div>
      </div>
    </div>
  );
}

export default Post;
