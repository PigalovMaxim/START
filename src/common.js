import md5 from 'md5';
//Переменные
const SITE_LINK = 'http://startserver/';
//Запросы
export async function Login(login, password) {
  const rand = Math.round(Math.random() * 1000000);
  const hash = md5(md5(login + password) + rand);
  const answer = await fetch(
    `${SITE_LINK}API/?method=login&login=${login}&hash=${hash}&rand=${rand}`
  );
  const result = await answer.json();
  return result.data;
}
export async function Registration(login, password, name) {
  const hash = md5(login + password);
  const answer = await fetch(
    `${SITE_LINK}API/?method=registration&login=${login}&hash=${hash}&name=${name}`
  );
  const result = await answer.json();
  return result.data;
}
export async function getNewsFeed() {
    const answer = await fetch(
      `${SITE_LINK}API/?method=getNewsFeed&login=${localStorage.getItem('userLogin')}`
    );
    const result = await answer.json();
    return result.data;
}
export async function getUsers() {
  const answer = await fetch(
    `${SITE_LINK}API/?method=getUsers`
  );
  const result = await answer.json();
  return result.data;
}
export async function getUserProfile(login) {
  const answer = await fetch(
    `${SITE_LINK}API/?method=getProfile&login=${login}`
  );
  const result = await answer.json();
  return result.data;
}
export async function getMyPosts() {
  const answer = await fetch(
    `${SITE_LINK}API/?method=getPosts&login=${localStorage.getItem('userName')}`
  );
  const result = await answer.json();
  return result.data;
}
export async function uploadPost(data, text) {
  const formData = new FormData();
  //Ограничение на картинку и песню 10 МБ, а на видео 50 МБ
  if(data.image !== null && data.image.size < 10000000) formData.append('image', data.image);
  if(data.video !== null && data.video.size < 50000000) formData.append('video', data.video);
  if(data.audio !== null && data.audio.size < 10000000) formData.append('audio', data.audio);
  fetch(
    `${SITE_LINK}API/?method=uploadPost&login=${localStorage.getItem('userName')}&text=${text}`,
    {
      method: "POST",
      body: formData,
    }
  );
}
export async function followUser() {
  const answer = await fetch(
    `${SITE_LINK}API/?method=getUsers`
  );
  const result = await answer.json();
  return result.data;
}
export async function dislikePost(id) {
  const answer = await fetch(
    `${SITE_LINK}API/?method=dislike&id=${id}`
  );
}
export async function likePost(id) {
  const answer = await fetch(
    `${SITE_LINK}API/?method=like&id=${id}`
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
