import './PythonSetting.css'
import Sidebar from '../Sidebar/Sidebar';

function PythonSetting() {
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
            <div className='checkbox'>
              <input type='checkbox'/>
              <p>順番に出題</p>
              <input type='checkbox'/>
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
        </div>
        <Sidebar />
      </div>
    </>
  )
}

export default PythonSetting
