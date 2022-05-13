import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUsers } from "../../../common";
import ErrorAvatar from "../../../imgs/undefinedUser.png";
import Input from "../../Input";
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
    return users.filter(value => value.userLogin.includes(filterStr)); 
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
      <Input refer={filterInp} wrapclx={s.inp} text="Введите имя пользователя" />
      <div className={s.users}>
        {filterArray().map((value, index) => (
          <div onClick={() => history(`/Profile/${value.userLogin}`)} key={index} className={s.user}>
            <img
              className={s.avatar}
              src={value.avatar ? value.avatar : ErrorAvatar}
            />
            <label className={s.name}>{value.userLogin}</label>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Users;
