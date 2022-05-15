//Зависимости
import React, { useEffect, useState } from "react";
import { getMyPosts, LINKS } from "../../../common";
import { useNavigate } from "react-router-dom";
//Компоненты
import Button from "../../Button/Button";
import Posts from "../Posts/Posts";
//Другое
import undefinedUserIcon from "../../../imgs/undefinedUser.png";
import s from "./MyProfile.module.scss";

function MyProfile() {
  const [posts, setPosts] = useState([]);
  const history = useNavigate();
  async function getPosts() {
    const data = await getMyPosts();
    if (data) setPosts(data);
  }
  useEffect(() => {
    getPosts();
  }, []);
  return (
    <div className={s.wrapper}>
      <div className={s.userInfo}>
        <img
          src={
            localStorage.getItem("avatar")
              ? localStorage.getItem("avatar")
              : undefinedUserIcon
          }
        />
        <div className={s.text}>
          <label className={s.name}>{localStorage.getItem("name")}</label>
          <React.Fragment>Описание профиля</React.Fragment>
          <label className={s.description}>
            {localStorage.getItem("description")}
          </label>
        </div>
        <Button
          classnames={s.btnSettings}
          click={() => history(LINKS.PROFILE_SETTINGS)}
          text="Редактировать"
        />
      </div>
      <div className={s.posts}>
        <Button
          classnames={s.btn}
          click={() => history(LINKS.UPLOAD_FORM)}
          text="Выложить пост"
        />
        <Posts
          posts={posts}
          avatar={localStorage.getItem("avatar")}
          name={localStorage.getItem("name")}
        />
      </div>
    </div>
  );
}

export default MyProfile;
