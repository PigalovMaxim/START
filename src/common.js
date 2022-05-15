import md5 from 'md5';
//Переменные
const SITE_LINK = 'http://ssstart.ru/'; //'http://ssstart.ru/'
export const LINKS = {
  WELCOME: '/Welcome',
  UPLOAD_FORM: '/UploadForm',
  PROFILE: '/Profile',
  USERS: '/Users',
  NEWSFEED: '/Newsfeed',
  PROFILE_SETTINGS: '/ProfileSettings',
};
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
      `${SITE_LINK}API/?method=getNewsFeed&login=${localStorage.getItem('userName')}`
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
    `${SITE_LINK}API/?method=getProfile&login=${login}&requestor=${localStorage.getItem('userName')}`
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
export function dislikePost(id) {
  fetch(
    `${SITE_LINK}API/?method=dislike&id=${id}&login=${localStorage.getItem('userName')}`
  );
}
export function likePost(id) {
  fetch(
    `${SITE_LINK}API/?method=like&id=${id}&login=${localStorage.getItem('userName')}`
  );
}
export async function follow(login) {
  fetch(
    `${SITE_LINK}API/?method=follow&userLogin=${login}&followerLogin=${localStorage.getItem('userName')}`
  );
}
export async function unfollow(login) {
  fetch(
    `${SITE_LINK}API/?method=unfollow&userLogin=${login}&followerLogin=${localStorage.getItem('userName')}`
  );
}
export async function changeProfileSettings(avatar, name, description) {
  fetch(
    `${SITE_LINK}API/?method=changeProfileSettings&login=${localStorage.getItem('userName')}&avatar=${avatar}&name=${name}&description=${description}`
  );
  if(avatar) localStorage.setItem("avatar", avatar);
  if(description) localStorage.setItem("description", description);
  if(name) localStorage.setItem("name", name);
}
//Работа с localStorage
export function setStorage(avatar, login, description, name) {
  localStorage.setItem("isLogin", true);
  localStorage.setItem("userName", login);
  localStorage.setItem("name", name);
  if(avatar) localStorage.setItem("avatar", avatar);
  if(description) localStorage.setItem("description", description);
}
export function deleteStorage() {
  localStorage.removeItem("isLogin");
  localStorage.removeItem("userName");
  localStorage.removeItem("name");
  localStorage.removeItem("avatar");
  localStorage.removeItem("description");
}
