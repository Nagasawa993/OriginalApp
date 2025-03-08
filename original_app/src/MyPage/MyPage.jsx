import './MyPage.css'
import Sidebar from '../Sidebar/Sidebar';
import image_lpic from '../assets/icon/Icon_LPIC.svg'
import image_python from '../assets/icon/Icon_Python.svg'
import image_vba from '../assets/icon/Icon_VBA.svg'
import React from "react";
import { useLocation } from "react-router-dom";

function MyPage() {
  const location = useLocation();
  const userInput = location.state?.username;
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
        </div>
        <Sidebar />
      </div>
    </>
  )
}

export default MyPage