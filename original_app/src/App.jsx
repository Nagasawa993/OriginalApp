import { useState } from 'react'
import './App.css'
import image_tree from './assets/top/tree.svg'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className='top-container'>
        <div className='main-container'>
          <h1>ようこそ、資格の森へ！</h1>
          <img src={image_tree} className='image_tree'/>

        </div>
        <div className='side-container'>
          <div className='side-container-btn'>
            <button>ログイン</button>
            <button>登録</button>
          </div>
          <div className='side-container-qualifications'>
            <p>問題集を選ぶ</p>
            <ul>
              <li>Python</li>
              <li>VBA</li>
              <li>LPIC</li>
            </ul>
          </div>

        </div>

      </div>
    </>
  )
}

export default App
