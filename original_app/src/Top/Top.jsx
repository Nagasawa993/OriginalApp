import { useState } from 'react'
import './Top.css'
import image_tree from '../assets/top/tree.svg'
import Sidebar from '../Sidebar/Sidebar';

function App() {
  return (
    <>
      <div className='top-container'>
        <div className='main-container'>
          <h1 className='main-title'>ようこそ、資格の森へ！</h1>
          <img src={image_tree} className='image_tree'/>
        </div>
        <Sidebar />
      </div>
    </>
  )
}

export default App
