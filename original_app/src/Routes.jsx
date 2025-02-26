import { Routes, Route } from 'react-router-dom';
import Top from './Top/Top';
import Login from './Login/Login';
import Register from './Register/Register';
import PythonSetting from './PythonSetting/PythonSetting';

export const AppRoutes = () => {
    return (
        <Routes>
            <Route path='/' element={<Top />} />
            <Route path='/Login' element={<Login />} />
            <Route path='/Register' element={<Register />} />
            <Route path='/PythonSetting' element={<PythonSetting />} />
        </Routes>
    )
}
