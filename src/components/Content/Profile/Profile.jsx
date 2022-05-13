import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getUserProfile } from "../../../common";
import Post from "../../Post";

import undefinedUserIcon from "../../../imgs/undefinedUser.png";

import s from "./Profile.module.scss";

function Profile() {
  const [user, setUser] = useState({});
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
          <label className={s.name}>{user.login}</label>
          <React.Fragment>Описание профиля</React.Fragment>
          <label className={s.description}>{user.description}</label>
        </div>
      </div>
      <div className={s.posts}>
        {user.posts ? (
          user.posts.map((value, index) => (
            <Post
              avatar={user.avatar}
              name={user.login}
              text={value.text}
              likes={value.likes}
              date={value.date}
              postImage={value.postImage}
              audio={value.audio}
              video={value.video}
              key={index}
            />
          ))
        ) : (
          <div />
        )}
      </div>
    </div>
  );
}

export default Profile;
