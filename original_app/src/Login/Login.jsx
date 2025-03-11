import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../UserContext";
import './Login.css'
import Sidebar from '../Sidebar/Sidebar';

const users = [
  { username: "user1", password: "pass1" },
  { username: "user2", password: "pass2" },
];

const Login = () => {
  const { login } = useContext(UserContext);
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    setUsernameError("")
    setPasswordError("")
    setError("")
    const user = users.find((u) => u.username === username && u.password === password);
    e.preventDefault();
    if(username===""){
      setUsernameError("ユーザ名を入力して下さい")
    }
    if(password===""){
      setPasswordError("パスワードを入力して下さい")
    }
    if (user) {
      await login(username, password);
      navigate("/MyPage", { state: { username: username } });
    }else if(username !=='' && password !==''){
      setError("ユーザー名、もしくはパスワードが誤っています。");
    }     
  };

  return (
      <div className='top-container'>
        <div className='main-container'>
          <p className='main-title'>ログイン</p>
          <div>
            <p>ユーザー名</p>
            <p>{error}</p>
            <input
              type="text"
              placeholder="ユーザー名"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <p>{usernameError}</p>
          <div>
            <p>パスワード</p>
            <input
              type="password"
              placeholder="パスワード"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <p>{passwordError}</p>
          <button onClick={handleLogin}>ログイン</button>
        </div>
        <Sidebar />
      </div>
  )
}

export default Login
