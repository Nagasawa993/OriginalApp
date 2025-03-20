import './MyPage.css'
import Sidebar from '../Sidebar/Sidebar';
import image_lpic from '../assets/icon/Icon_LPIC.svg'
import image_python from '../assets/icon/Icon_Python.svg'
import image_vba from '../assets/icon/Icon_VBA.svg'
import React from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

//このページに到達したときに、ログインチェックを行う
//user名とパスワードがPC(chorome、ローカルストレージ　or セッションストレージ)に保存されているか確認する
//ログインしていなかったら、強制的にログインページに遷移

function MyPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const userInput = location.state?.username;
  const handleLogout = () => {
    localStorage.removeItem("authToken"); // トークン削除
    navigate("/"); // ログアウト後にログインページへリダイレクト
  };

  return (
    <>
      <div className='top-container'>
        <div className='main-container'>
          <h1 className='main-title'>{userInput}のマイページ</h1>
            <div>
              <p>成績一覧</p>
            </div>
            <div className='item'>
              <img src={image_python}/>
              <p>Python</p>
            </div>
            <div className='item'>
              <img src={image_vba}/>
              <p>VBA</p>
            </div>
            <div className='item'>
              <img src={image_lpic}/>
              <p>LPIC</p>
            </div>
            <div>
              <p>ユーザー編集</p>
            </div>
            <div>
              <p>ユーザー名</p>
              <input type='text'/>
              <p>パスワード</p>
              <input type='text'/>
            </div>
            <button onClick={handleLogout}>ログアウト</button>
        </div>
        <Sidebar />
      </div>
    </>
  )
}

export default MyPage