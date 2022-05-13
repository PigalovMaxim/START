import React from "react";

import Button from "../../Button/Button";
import Post from "../../Post";

import undefinedUserIcon from "../../../imgs/undefinedUser.png";

import s from "./MyProfile.module.scss";
import { useNavigate } from "react-router-dom";


function MyProfile(props) {
  const history = useNavigate();
  return (
    <div className={s.wrapper}>
      <div className={s.userInfo}>
        <img src={localStorage.getItem('avatar') ? localStorage.getItem('avatar') : undefinedUserIcon} />
        <div className={s.text}>
          <label className={s.name}>{localStorage.getItem('userName')}</label>
          <React.Fragment>Описание профиля</React.Fragment>
          <label className={s.description}>
            {localStorage.getItem('description')}
          </label>
        </div>
      </div>
      <div className={s.posts}>
        <Button classnames={s.btn} click={() => history('/UploadForm')} text="Выложить пост" />
        {
          [1,1,1,1].map( (value, index) => (
            <Post key={index}/>
          ))
        }
      </div>
    </div>
  );
}

export default MyProfile;
