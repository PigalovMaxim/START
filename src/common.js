import md5 from 'md5';
//Запросы
export async function Login(login, password) {
  const rand = Math.round(Math.random() * 1000000);
  const hash = md5(md5(login + password) + rand);
  const answer = await fetch(
    `http://startserver/API/?method=login&login=${login}&hash=${hash}&rand=${rand}`
  );
  const result = await answer.json();
  return result.data;
}
export async function Registration(login, password, name) {
  const hash = md5(login + password);
  const answer = await fetch(
    `http://startserver/API/?method=registration&login=${login}&hash=${hash}&name=${name}`
  );
  const result = await answer.json();
  return result.data;
}
export async function getNewsFeed() {
    const answer = await fetch(
      "http://startserver/API/?method=getNewsFeed"
    );
    const result = await answer.json();
    return result.data;
}
export async function getUsers() {
  const answer = await fetch(
    "http://startserver/API/?method=getUsers"
  );
  const result = await answer.json();
  return result.data;
}
export async function getUserProfile(login) {
  const answer = await fetch(
    `http://startserver/API/?method=getProfile&login=${login}`
  );
  const result = await answer.json();
  return result.data;
}
export async function getMyPosts(login) {
  const answer = await fetch(
    `http://startserver/API/?method=getPosts&login=${login}`
  );
  const result = await answer.json();
  return result.data;
}
export async function uploadPost(data, text) {
  const formData = new FormData();
  if(text !== '') formData.append('text', data.text);
  if(data.image !== null) formData.append('image', data.image);
  if(data.video !== null) formData.append('video', data.video);
  if(data.audio !== null) formData.append('audio', data.audio);
  fetch(
    `http://startserver/API/?method=uploadPost&login=${localStorage.getItem('userName')}&text=${text}`,
    {
      method: "POST",
      body: formData,
    }
  );
}
//Работа с localStorage
export function setStorage(avatar, login, description, posts) {
  localStorage.setItem("isLogin", true);
  localStorage.setItem("userName", login);
  if(avatar) localStorage.setItem("avatar", avatar);
  if(description) localStorage.setItem("description", description);
}
export function deleteStorage() {
  localStorage.removeItem("isLogin");
  localStorage.removeItem("userName");
  localStorage.removeItem("avatar");
  localStorage.removeItem("description");
}
