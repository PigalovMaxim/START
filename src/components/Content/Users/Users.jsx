//Зависимости
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUsers, LINKS } from "../../../common";
//Компоненты
import Input from "../../Input";
//Другое
import ErrorAvatar from "../../../imgs/undefinedUser.png";
import s from "./Users.module.scss";

function Users() {
  const [users, setUsers] = useState([]);
  const [filterStr, setfilterStr] = useState('');
  const filterInp = useRef();
  const history = useNavigate();
  async function getUsersResponse() {
    const data = await getUsers();
    if (data) setUsers(data);
  }
  function filterArray() {
    if(users.length === 0) return [];
    return users.filter(value => value.login.includes(filterStr) && value.login !== localStorage.getItem('userName')); 
  }
  useEffect(() => {
    getUsersResponse();
    if(filterInp.current) filterInp.current.addEventListener('keydown', (e) => {
      if(e.key === 'Enter') setfilterStr(filterInp.current.value);
    });
    return () => {
      if(filterInp.current) filterInp.current.removeEventListener('keydown', (e) => {
        if(e.key === 'Enter') setfilterStr(filterInp.current.value);
      });
    }
  }, []);
  return (
    <div className={s.wrapper}>
      <label className={s.title}>Поиск пользователей</label>
      <Input refer={filterInp} wrapclx={s.inp} classnames={s.realInp} text="Введите имя пользователя" />
      <div className={s.users}>
        {filterArray().map((value, index) => (
          <div onClick={() => history(`${LINKS.PROFILE}/${value.login}`)} key={index} className={s.user}>
            <img
              className={s.avatar}
              src={value.avatar ? value.avatar : ErrorAvatar}
            />
            <label className={s.name}>{value.login}</label>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Users;
