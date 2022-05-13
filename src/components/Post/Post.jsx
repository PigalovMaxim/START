import { useState } from "react";
import likeIcon from "../../imgs/like.png";
import likeActiveIcon from "../../imgs/likeActive.png";
import Audio from "./Audio";
import undefinedUserIcon from "../../imgs/undefinedUser.png";
import s from "./Post.module.scss";

function Post(props) {
  const [likesCount, setLikesCount] = useState(props.likes ? props.likes : 0);
  const [isLikeClicked, setClicked] = useState(false);
  return (
    <div className={s.wrapper}>
      <div className={s.postInfo}>
        <img src={props.avatar ? props.avatar : undefinedUserIcon} />
        <div className={s.text}>
          <label className={s.name}>{props.name}</label>
          <label className={s.date}>{props.date}</label>
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
            muted="muted"
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
            if (isLikeClicked) setLikesCount(likesCount - 1);
            else setLikesCount(likesCount + 1);
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
