import { useState } from 'react'
import './Login.css'
import Sidebar from '../Sidebar/Sidebar';

function Login() {
  return (
    <>
      <div className='top-container'>
        <div className='main-container'>
          <p className='main-title'>ログイン</p>
          <div>
            <p>ユーザーネーム</p>
            <input/>
          </div>
          <div>
            <p>パスワード</p>
            <input/>
          </div>
          <button>ログイン</button>

        </div>
        <Sidebar />
      </div>
    </>
  )
}

export default Login
