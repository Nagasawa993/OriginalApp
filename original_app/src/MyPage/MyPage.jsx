import { Box, Flex, Heading, Image, Stack, Text } from "@chakra-ui/react";
import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { db } from "../firebase";
import "./MyPage.css";

function MyPage() {
  const [questionKind, setQuestionKind] = useState({});

  useEffect(() => {
    const getQuestionKind = async () => {
      const questionKindCollection = collection(db, "question-kind");
      const questionSnapshots = await getDocs(questionKindCollection);
      const questionKinds = questionSnapshots.docs.map((doc) => doc.data());

      const newQuestionKind = {};
      questionKinds.forEach((questionKind) => {
        newQuestionKind[questionKind.name] = questionKind.img_src;
      });

      setQuestionKind(newQuestionKind);
    };

    getQuestionKind();
  }, []);
  const navigate = useNavigate();

  const location = useLocation();
  const userInput = location.state?.username;
  const handleLogout = () => {
    localStorage.removeItem("username"); // トークン削除
    localStorage.removeItem("password"); // トークン削除
    navigate("/"); // ログアウト後にログインページへリダイレクト
  };

  return (
    <>
      <Box w={"100%"} h={"100%"} minH={"100vh"}>
        <Stack alignItems={"center"} mt={10} w={"100%"}>
          <Heading size={"2xl"}>マイページ</Heading>

          <Stack alignItems={"flex-start"} w={"100%"} pl={"14rem"} mt={16}>
            <Heading size={"xl"}>成績一覧</Heading>

            <Stack mt={4}>
              {Object.entries(questionKind).map((icon) => (
                <Flex gap={4} key={icon[0]} alignItems={"center"}>
                  <Box>
                    <Image src={icon[1]} alt={`${icon[0]}のアイコン`} />
                  </Box>
                  <Text>{icon[0]}</Text>
                </Flex>
              ))}
            </Stack>
          </Stack>

          <Stack alignItems={"flex-start"} w={"100%"} pl={"14rem"} mt={16}>
            <Heading size={"xl"}>ユーザー編集</Heading>

            <Stack mt={4}>
              {Object.entries(questionKind).map((icon) => (
                <Flex gap={4} key={icon[0]} alignItems={"center"}>
                  <Box>
                    <Image src={icon[1]} alt={`${icon[0]}のアイコン`} />
                  </Box>
                  <Text>{icon[0]}</Text>
                </Flex>
              ))}
            </Stack>
          </Stack>
        </Stack>
      </Box>
    </>
  );
}

export default MyPage;
