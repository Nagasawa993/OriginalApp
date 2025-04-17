import { Box, Button, Drawer, Flex, Portal, useBreakpointValue } from "@chakra-ui/react";
import PropTypes from "prop-types";
import { useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { useAuth } from "./AuthContext";
import { MobileSidebar } from "./components/MobileSidebar";
import { Sidebar } from "./components/Sidebar";
import { Toaster } from "./components/ui/toaster";
import Login from "./Login/Login";
import MyPage from "./MyPage/MyPage";
import { QuizPage } from "./Question/Question";
import Register from "./Register/Register";
import { Result } from "./Result/Result";
import { Setting } from "./Setting/Setting";
import Top from "./Top/Top";

import { RxHamburgerMenu } from "react-icons/rx";

const AppRouter = () => {
  const { isLoggedIn, isLoading } = useAuth();
  const [open, setOpen] = useState(false);
  const isMobile = useBreakpointValue({ base: true, lg: false });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Box position={"absolute"} top={0}>
        <Toaster />
      </Box>

      <Flex w="100%" flexDirection="row-reverse">
        {/* ハンバーガーボタン表示（モバイルのみ） */}
        {isMobile && (
          <>
            <Button
              onClick={() => setOpen(!open)}
              position="absolute"
              top="1rem"
              left="1rem"
              zIndex={1000}
              bg={"transparent"}
            >
              <RxHamburgerMenu color="black" />
            </Button>

            <Drawer.Root size={"lg"} open={open} onOpenChange={(e) => setOpen(e.open)}>
              <Portal>
                <Drawer.Backdrop />
                <Drawer.Positioner>
                  <Drawer.Content>
                    <Drawer.Body>
                      <MobileSidebar setOpen={setOpen} />
                    </Drawer.Body>
                  </Drawer.Content>
                </Drawer.Positioner>
              </Portal>
            </Drawer.Root>
          </>
        )}

        {/* デスクトップ時の Sidebar */}
        {!isMobile && <Sidebar />}

        <Box flex="1">
          <Routes>
            <Route path="/" element={<Top />} />
            <Route path="/Login" element={<Login />} />
            <Route path="/Register" element={<Register />} />
            <Route path="/Quiz" element={<QuizPage />} />
            <Route path="/Result" element={<Result />} />
            <Route
              path="/MyPage"
              element={
                <RequireAuth isLoggedIn={isLoggedIn}>
                  <MyPage />
                </RequireAuth>
              }
            />
            <Route path="/Setting" element={<Setting />} />
          </Routes>
        </Box>
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
