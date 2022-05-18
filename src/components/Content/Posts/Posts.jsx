import Post from "../../Post";
import s from "./Posts.module.scss";

function Posts(props) {
  function reverseArr(){
      const rev = props.posts.slice(0);
      const result = rev.slice(0).sort(((a, b) => new Date(b.date) - new Date(a.date)));
      return result;
  }
  return (
      <div className={s.posts}>
        {reverseArr().map((value, index) => (
          <Post
            id={value.id}
            avatar={value.avatar ? value.avatar : props.avatar}
            name={value.name ? value.name : props.name}
            text={value.text}
            likes={value.likes}
            date={value.date}
            postImage={value.image}
            isUserLiked={value.isUserLiked}
            audio={value.audio}
            video={value.video}
            key={index}
          />
        ))}
    </div>
  );
}

export default Posts;
