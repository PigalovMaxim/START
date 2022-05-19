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
  const [filterStr, setfilterStr] = useState("");
  const filterInp = useRef();
  const history = useNavigate();
  async function getUsersResponse() {
    const data = await getUsers();
    if (data) setUsers(data);
  }
  function filterArray() {
    if (users.length === 0) return [];
    return users.filter(
      (value) =>
        value.login.toLowerCase().includes(filterStr.toLowerCase()) &&
        value.login !== localStorage.getItem("userName")
    );
  }
  function onChangeFilterEvent() {
    setfilterStr(filterInp.current.value);
  }
  useEffect(() => {
    getUsersResponse();
  }, []);
  return (
    <div className={s.wrapper}>
      <label className={s.title}>Поиск пользователей</label>
      <Input
        change={onChangeFilterEvent}
        refer={filterInp}
        wrapclx={s.inp}
        classnames={s.realInp}
        text="Введите имя пользователя"
      />
      <div className={s.users}>
        {filterArray().map((value, index) => (
          <div
            onClick={() => history(`${LINKS.PROFILE}/${value.login}`)}
            key={index}
            className={s.user}
          >
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
