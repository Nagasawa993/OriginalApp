import { Box, Flex } from "@chakra-ui/react";
import PropTypes from "prop-types";
import { Navigate, Route, Routes } from "react-router-dom";
import { useAuth } from "./AuthContext";
import { Sidebar } from "./components/Sidebar";
import { Toaster } from "./components/ui/toaster";
import Login from "./Login/Login";
import MyPage from "./MyPage/MyPage";
import PythonPage from "./PythonPage/PythonPage";
import PythonSetting from "./PythonSetting/PythonSetting";
import Register from "./Register/Register";
import { Setting } from "./Setting/Setting";
import Top from "./Top/Top";

const AppRouter = () => {
  const { isLoggedIn, isLoading } = useAuth();

  if (isLoading) {
    return <div>Loading...</div>;
  }

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
              <RequireAuth isLoggedIn={isLoggedIn}>
                <MyPage />
              </RequireAuth>
            }
          />
          <Route path="/Setting" element={<Setting />} />
          <Route path="/page/:index" element={<PythonPage />} />
        </Routes>
      </Flex>
    </>
  );
};

function RequireAuth({ children, isLoggedIn }) {
  return isLoggedIn ? children : <Navigate to="/Login" />;
}

RequireAuth.propTypes = {
  children: PropTypes.node.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
};

export default AppRouter;
