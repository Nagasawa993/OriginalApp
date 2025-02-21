import { useState } from 'react'
import './App.css'
import image_tree from './assets/top/tree.svg'
import image_lpic from './assets/icon/Icon_LPIC.svg'
import image_python from './assets/icon/Icon_Python.svg'
import image_vba from './assets/icon/Icon_VBA.svg'

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
              <li>
                <img src={image_python}/>
                Python
              </li>
              <li>
                <img src={image_vba}/>
                VBA
              </li>
              <li>
                <img src={image_lpic}/>
                LPIC
              </li>
            </ul>
          </div>

        </div>

      </div>
    </>
  )
}

export default App
