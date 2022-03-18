import React, { useRef } from "react";
import styles from "./user.module.css";

// 유저 목록 낱개 컴포넌트
const User = ({ userData, changeAuthority }) => {
  const authRef = useRef();

  const changeAuth = () => {
    changeAuthority(userData, authRef.current.value);
  };

  return (
    <li className={styles.listitem}>
      <h3 className={styles.item}>{userData.id}</h3>
      <h3 className={styles.item}>{userData.name}</h3>
      <h3 className={styles.item}>{userData.email}</h3>
      <select
        ref={authRef}
        className={styles.item}
        name="role"
        onChange={changeAuth}
      >
        <option>{userData.role}</option>
        <option>0</option>
        <option>1</option>
        <option>2</option>
      </select>
    </li>
  );
};

export default User;
