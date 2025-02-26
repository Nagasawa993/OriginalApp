import { useNavigate } from "react-router-dom";
import './Sidebar.css'
import image_lpic from '../assets/icon/Icon_LPIC.svg'
import image_python from '../assets/icon/Icon_Python.svg'
import image_vba from '../assets/icon/Icon_VBA.svg'

function Sidebar () {
  const navigate = useNavigate();
  const goToLogin = () => {
    navigate('/Login');
  };
  const goToRegister = () => {
    navigate('/Register');
  };
  return (
    <div className='side-container'>
      <div className='side-container-btn'>
        <button onClick={goToLogin}>ログイン</button>
        <button onClick={goToRegister}>登録</button>
      </div>
      <div className='side-container-qualifications'>
        <p>問題集を選ぶ</p>
        <ul>
          <li>
            <img
              src={image_python}/>
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
    );
  };
  export default Sidebar;
