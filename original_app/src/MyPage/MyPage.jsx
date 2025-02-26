import './MyPage.css'
import Sidebar from '../Sidebar/Sidebar';
import image_lpic from '../assets/icon/Icon_LPIC.svg'
import image_python from '../assets/icon/Icon_Python.svg'
import image_vba from '../assets/icon/Icon_VBA.svg'

function MyPage() {
  return (
    <>
      <div className='top-container'>
        <div className='main-container'>
          <h1 className='main-title'>マイページ</h1>
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
        </div>
        <Sidebar />
      </div>
    </>
  )
}

export default MyPage