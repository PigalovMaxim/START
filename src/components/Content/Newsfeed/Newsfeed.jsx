//Зависимости
import { useEffect, useState } from "react";
import { getNewsFeed } from "../../../common";
import _ from 'lodash';
//Компоненты
import Posts from "../Posts/Posts";
//Другое
import s from "./Newsfeed.module.scss";

function Newsfeed() {
  const [posts, setPosts] = useState([]);
  async function getPosts() {
    const data = await getNewsFeed();
    if (data) setPosts(data);
  }
  useEffect(() => {
    getPosts();
  }, []);
  return (
    <div className={s.wrapper}>
        <label className={s.title}>Новостная лента</label>
        <Posts
          posts={posts}
        />
    </div>
  );
}

export default Newsfeed;
