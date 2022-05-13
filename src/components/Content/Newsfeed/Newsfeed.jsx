import Post from "../../Post";

import { getNewsFeed } from "../../../common";

import s from "./Newsfeed.module.scss";
import { useEffect, useState } from "react";
import Posts from "../Posts/Posts";

function Newsfeed() {
  const [posts, setPosts] = useState([]);
  async function getPosts() {
    const data = await getNewsFeed();
    if (!data) return;
    setPosts(data);
  }
  useEffect(() => {
    getPosts();
  }, []);
  return (
    <div className={s.wrapper}>
      <div className={s.posts}>
        <label className={s.title}>Новостная лента</label>
        <Posts posts={posts}/>
      </div>
    </div>
  );
}

export default Newsfeed;
