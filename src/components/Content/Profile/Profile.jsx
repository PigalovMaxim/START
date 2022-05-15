//Зависимости
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getUserProfile, follow, unfollow } from "../../../common";
import cn from 'classnames';
//Компоненты
import Posts from "../Posts/Posts";
import Button from "../../Button/Button";
//Другое
import undefinedUserIcon from "../../../imgs/undefinedUser.png";
import s from "./Profile.module.scss";

function Profile() {
  const [user, setUser] = useState({});
  const [isYouFollowed, setFollow] = useState(false);
  const params = useParams();
  async function getUserData() {
    const data = await getUserProfile(params["*"]);
    if (data) setUser(data);
  }
  useEffect(() => {
    getUserData();
  }, []);
  return (
    <div className={s.wrapper}>
      <div className={s.userInfo}>
        <img src={user.avatar ? user.avatar : undefinedUserIcon} />
        <div className={s.text}>
          <label className={s.name}>{user.name}</label>
          <React.Fragment>Описание профиля</React.Fragment>
          <label className={s.description}>{user.description}</label>
        </div>
        <Button
          classnames={cn(s.followBtn, isYouFollowed ? s.followed : "")}
          click={() => {
            if (isYouFollowed) {
              setFollow(false);
              unfollow(params["*"]);
              return;
            }
            setFollow(true);
            follow(params["*"]);
          }}
          text={isYouFollowed ? "Вы подписаны" : "Подписаться"}
        />
      </div>
      <div className={s.posts}>
        {user.posts ? (
          <Posts posts={user.posts} avatar={user.avatar} name={user.name} />
        ) : (
          <div />
        )}
      </div>
    </div>
  );
}

export default Profile;
