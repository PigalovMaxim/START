import React, { useEffect, useState } from "react";

import Button from "../../Button/Button";
import Post from "../../Post";

import { getMyPosts } from "../../../common";

import undefinedUserIcon from "../../../imgs/undefinedUser.png";

import s from "./MyProfile.module.scss";
import { useNavigate } from "react-router-dom";

function MyProfile() {
  const [posts, setPosts] = useState([]);
  const history = useNavigate();
  async function getPosts() {
    if(!posts) return;
    const data = await getMyPosts();
    console.log(data);
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
          <label className={s.name}>{localStorage.getItem("userName")}</label>
          <React.Fragment>Описание профиля</React.Fragment>
          <label className={s.description}>
            {localStorage.getItem("description")}
          </label>
        </div>
      </div>
      <div className={s.posts}>
        <Button
          classnames={s.btn}
          click={() => history("/UploadForm")}
          text="Выложить пост"
        />
        {posts.map((value, index) => (
          <Post
            id={value.id}
            avatar={value.avatar}
            name={value.name}
            text={value.text}
            likes={value.likes}
            date={value.date}
            postImage={value.image}
            audio={value.audio}
            video={value.video}
            key={index}
          />
        ))}
      </div>
    </div>
  );
}

export default MyProfile;
