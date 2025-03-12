import React from "react";
import { Routes, Route } from 'react-router-dom';
import Top from './Top/Top';
import Login from './Login/Login';
import Register from './Register/Register';
import PythonSetting from './PythonSetting/PythonSetting';
import PythonPage from './PythonPage/PythonPage';
import MyPage from './MyPage/MyPage';


const pages = ["ページ1", "ページ2", "ページ3"]; // 配列でページ名を管理

const AppRouter = () => {
    return (
        <Routes>
            <Route path='/' element={<Top />} />
            <Route path='/Login' element={<Login />} />
            <Route path='/Register' element={<Register />} />
            <Route path='/PythonSetting' element={<PythonSetting />} />
            <Route path='/MyPage' element={<MyPage />} />
            {pages.map((page, index) => (
              <Route key={index} path={`/page${index + 1}`} element={<PythonPage index={index} pages={pages} />} />
            ))}
        </Routes>
    );
};

export default AppRouter;
