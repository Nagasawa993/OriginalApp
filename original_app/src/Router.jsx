import { Box, Flex } from "@chakra-ui/react";
import { Navigate, Route, Routes } from "react-router-dom";
import Login from "./Login/Login";
import MyPage from "./MyPage/MyPage";
import PythonPage from "./PythonPage/PythonPage";
import PythonSetting from "./PythonSetting/PythonSetting";
import Register from "./Register/Register";
import Top from "./Top/Top";
import { Sidebar } from "./components/Sidebar";
import { Toaster } from "./components/ui/toaster";

const AppRouter = () => {
  return (
    <>
      <Box position={"absolute"} top={0}>
        <Toaster />
      </Box>
      <Flex w={"100%"} flexDirection={"row-reverse"} justifyContent={"space-between"}>
        <Sidebar />
        <Routes>
          <Route path="/" element={<Top />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Register" element={<Register />} />
          <Route path="/PythonSetting" element={<PythonSetting />} />
          <Route
            path="/MyPage"
            element={
              <RequireAuth>
                <MyPage />
              </RequireAuth>
            }
          />
          <Route path="/page/:index" element={<PythonPage />} />
        </Routes>
      </Flex>
    </>
  );
};

function RequireAuth({ children }) {
  const isUsername = localStorage.getItem("username");
  const isPassword = localStorage.getItem("password");
  return isUsername && isPassword ? children : <Navigate to="/Login" />;
}

export default AppRouter;
