import { useNavigate } from "react-router-dom";
import './PythonSetting.css'
import Sidebar from '../Sidebar/Sidebar';

function PythonSetting() {
    const navigate = useNavigate();
  const numbers = ['10', '20', '全部'];
  return (
    <>
      <div className='top-container'>
        <div className='main-container'>
          <h1 className='main-title'>出題設定</h1>
          <div>
            <p>出題</p>
            <p>Python</p>
          </div>
          <div>
            <p>出題形式</p>
            <div className='radio'>
              <input type='radio' name="order" defaultChecked={true}/>
              <p>順番に出題</p>
              <input type='radio' name="order"/>
              <p>ランダムに出題</p>
            </div>
          </div>
          <div>
            <p>出題分野</p>
            <div className='checkbox'>
              <input type='checkbox'/>
              <p>分野A</p>
              <input type='checkbox'/>
              <p>分野B</p>
              <input type='checkbox'/>
              <p>分野C</p>
            </div>
            <div className='checkbox'>
              <input type='checkbox'/>
              <p>分野D</p>
              <input type='checkbox'/>
              <p>分野E</p>
              <input type='checkbox'/>
              <p>分野F</p>
            </div>
          </div>
          <div>
            <p>問題数</p>
            <div>
              <select>
                {numbers.map((number) => {
                  return <option key={number}>{number}</option>;
                })}
              </select>
            </div>
          </div>
          <button>スタート</button>
          <button onClick={() => navigate("/page1")}>ページ1へ</button>
        </div>
        <Sidebar />
      </div>
    </>
  )
}

export default PythonSetting
