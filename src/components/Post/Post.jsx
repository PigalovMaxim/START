//Зависимости
import { useRef, useState } from "react";
import {
  likePost,
  dislikePost,
  deletePost,
  LINKS,
  sendComment,
} from "../../common";
import { useNavigate } from "react-router-dom";
import cn from "classnames";
//Фотографии
import likeIcon from "../../imgs/like.png";
import likeActiveIcon from "../../imgs/likeActive.png";
import undefinedUserIcon from "../../imgs/undefinedUser.png";
import ThreeDotsIcon from "../../imgs/ThreeDotsIcon.png";
import BucketIcon from "../../imgs/BucketIcon.png";
import CommentsIcon from "../../imgs/CommentsIcon.png";
//Компоненты
import Audio from "./Audio";
import Button from "../Button";
import Input from "../Input";
//Другое
import s from "./Post.module.scss";

function Post(props) {
  const [likesCount, setLikesCount] = useState(
    props.likes ? props.likes - 0 : 0
  );
  const [isLikeClicked, setClicked] = useState(
    props.isUserLiked ? props.isUserLiked : false
  );
  const [isCommentsOpened, setCommentsOpened] = useState(false);
  const [isDeleteClicked, setDeleteClicked] = useState(false);
  const commentInp = useRef();
  const history = useNavigate();
  function makeRightData() {
    const months = [
      "Янв",
      "Февр",
      "Мар",
      "Апр",
      "Мая",
      "Июн",
      "Июл",
      "Авг",
      "Сен",
      "Ноя",
      "Дек",
    ];
    let strArr = props.date.substring(0, 10).split("-");
    return (
      parseInt(strArr[2]) +
      " " +
      months[parseInt(strArr[1]) - 1] +
      " " +
      strArr[0].substring(2) +
      " в " +
      (parseInt(props.date.substring(11, 13)) + 1) +
      ":" +
      props.date.substring(14, 16)
    );
  }
  function confirmDelete() {
    deletePost(props.id);
    setDeleteClicked(false);
  }
  return (
    <div className={s.wrapper}>
      {props.isMyProfile ? (
        <div className={s.postSettings}>
          <img src={ThreeDotsIcon} />
          <div style={{ bottom: "-80px" }} className={s.postSettingsMenu}>
            <div
              onClick={() => setDeleteClicked(true)}
              className={s.menuOption}
            >
              Удалить пост <img src={BucketIcon} />
            </div>
          </div>
        </div>
      ) : (
        <div />
      )}
      <div
        onClick={() => history(`${LINKS.PROFILE}/${props.login}`)}
        className={s.postInfo}
      >
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
          <video className={s.visual} src={props.video} controls="controls" />
        ) : (
          <div />
        )}
        {props.audio ? <Audio SRC={props.audio} /> : <div />}
        <div className={s.interactive}>
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
            className={s.postLikes}
          >
            <img src={isLikeClicked ? likeActiveIcon : likeIcon} />
            {likesCount}
          </div>
          <div
            onClick={() => setCommentsOpened(!isCommentsOpened)}
            className={s.postComments}
          >
            <img src={CommentsIcon} />
            {props.comments ? props.comments.length : 0}
          </div>
        </div>
      </div>
      {isDeleteClicked ? (
        <div className={s.confirmDelete}>
          <Button
            classnames={cn(s.btn, s.btn1)}
            click={confirmDelete}
            text="Удалить?"
          />
          <Button
            classnames={s.btn}
            click={() => setDeleteClicked(false)}
            text="Нет"
          />
        </div>
      ) : (
        <div />
      )}
      <div className={cn(s.comments, isCommentsOpened ? s.opened : "")}>
        {props.comments ? (
          props.comments.map((value) => (
            <div className={s.comment}>
              <img src={value.avatar ? props.avatar : undefinedUserIcon} />
              <div className={s.textBlock}>
                {value.login}
                <label className={s.commentText}>{value.comment}</label>
              </div>
            </div>
          ))
        ) : (
          <div />
        )}
        <div className={s.controls}>
          <Input
            text="Текст комментария"
            refer={commentInp}
            classnames={s.inp}
          />
          <Button classnames={s.btn} click={() => sendComment(props.id, commentInp.current.value)} text="Отправить" />
        </div>
      </div>
    </div>
  );
}

export default Post;
