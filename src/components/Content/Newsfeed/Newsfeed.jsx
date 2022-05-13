import Post from "../../Post";

import { getNewsFeed } from "../../../common";

import s from "./Newsfeed.module.scss";
import { useEffect, useState } from "react";

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
        {posts.map((value, index) => (
          <Post
            id={value.id}
            avatar={value.avatar}
            name={value.name}
            text={value.text}
            likes={value.likes}
            date={value.date}
            postImage={value.postImage}
            audio={value.audio}
            video={value.video}
            key={index}
          />
        ))}
      </div>
    </div>
  );
}

export default Newsfeed;
