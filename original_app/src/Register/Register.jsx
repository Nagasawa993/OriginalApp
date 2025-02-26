import './Register.css'
import Sidebar from '../Sidebar/Sidebar';

function Register() {
  return (
    <>
      <div className='top-container'>
        <div className='main-container'>
          <p className='main-title'>登録</p>
          <div>
            <p>ユーザーネーム</p>
            <input/>
          </div>
          <div>
            <p>パスワード</p>
            <input/>
          </div>
          <button>登録</button>

        </div>
        <Sidebar />
      </div>
    </>
  )
}

export default Register
