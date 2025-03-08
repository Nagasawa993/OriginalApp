import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './Login.css'
import Sidebar from '../Sidebar/Sidebar';

const users = [
  { username: "user1", password: "pass1" },
  { username: "user2", password: "pass2" },
];

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [nameError, setNameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const navigate = useNavigate();
  const handleName = (e) => {
    setUsername(e.target.value)
  }
  const handlePassword = (e) => {
    setPassword(e.target.value)
  }

  // ログイン処理
  const handleLogin = () => {
    setNameError('')
    setPasswordError('')
    setError('')
    const user = users.find((u) => u.username === username && u.password === password);
    if (user) {
      navigate("/MyPage", { state: { username: username } }); // マイページへ遷移
    }else  {
      if (username ==='') {
        setNameError('ユーザー名を入力して下さい')
      }
      if (password ==='') {
        setPasswordError('パスワードを入力して下さい')
      }
      if (username !=='' && password !=='')
      setError("ユーザー名、もしくはパスワードが誤っています。");
    }
  };

  return (
    <>
      <div className='top-container'>
        <div className='main-container'>
          <p className='main-title'>ログイン</p>
          <div>
            <p>ユーザー名</p>
            {error && <p className='fail-error'>{error}</p>}
            <input
              type="text"
              placeholder="ユーザー名"
              value={username}
              onChange={handleName}
            />
          </div>
          {nameError && <p className='fail-error'>{nameError}</p>}
          <div>
            <p>パスワード</p>
            <input
              type="password"
              placeholder="パスワード"
              value={password}
              onChange={handlePassword}
            />
          </div>
          {passwordError && <p className='fail-error'>{passwordError}</p>}
          <button onClick={handleLogin}>ログイン</button>
        </div>
        <Sidebar />
      </div>
    </>
  )
}

export default Login
