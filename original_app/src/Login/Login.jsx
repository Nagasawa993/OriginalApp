import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './Login.css'
import Sidebar from '../Sidebar/Sidebar';

const users = [
  { username: "user1", password: "password1" },
  { username: "user2", password: "password2" },
];

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [nameError, setNameError] = useState("");
  const [passWordError, setPassWordError] = useState("");
  const navigate = useNavigate();

  // ログイン処理
  const handleLogin = () => {
    const user = users.find((u) => u.username === username && u.password === password);
    if (user) {
      navigate("/MyPage", { state: { username } }); // マイページへ遷移
    }else if(username==="" || password===""){
      setNameError("ユーザー名を入力して下さい")
      setPassWordError("パスワードを入力して下さい")
    }else  {
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
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          {nameError && <p className='fail-error'>{nameError}</p>}
          <div>
            <p>パスワード</p>
            <input
              type="password"
              placeholder="パスワード"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {passWordError && <p className='fail-error'>{passWordError}</p>}
          <button onClick={handleLogin}>ログイン</button>
        </div>
        <Sidebar />
      </div>
    </>
  )
}

export default Login
