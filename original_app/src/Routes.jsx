import { Routes, Route } from 'react-router-dom';
import Top from './Top/Top';
import Login from './Login/Login';

export const AppRoutes = () => {
    return (
        <Routes>
            <Route path='/' element={<Top />} />
            <Route path='/Login' element={<Login />} />
        </Routes>
    )
}
