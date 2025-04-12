import { Box, Button, Flex, Grid, GridItem, Heading } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const Result = () => {
  const [data, setData] = useState(null);
  const [score, setScore] = useState(0);

  useEffect(() => {
    const stored = localStorage.getItem("quiz_progress");

    if (!stored) return;
    const data = JSON.parse(stored);
    setData(data);
    console.log("Da#,", data);

    let correctCount = 0;
    data.results.forEach((result) => {
      if (result) {
        correctCount++;
      }
    });

    const score = (correctCount / data.idList.length) * 100;
    setScore(score);
  }, []);

  const navigate = useNavigate();
  const navigateToTop = () => {
    navigate("/");
  };

  const navigateToSetting = () => {
    navigate(`/Setting?lang=${data.lang}`);
  };

  if (!data) {
    return <Box>読み込み中...</Box>;
  }

  return (
    <Box w="100%" h="100%" minH="100vh" maxW="1000px">
      <Box p={"0rem 4rem"}>
        <Heading size={"2xl"} textAlign={"center"} mt={10}>
          採点結果
        </Heading>

        <Box w={"50%"} m={"0 auto"} mt={24}>
          <Grid templateColumns={"repeat(2, 1fr)"} rowGap={8}>
            <GridItem fontWeight={"bold"} fontSize={"1.125rem"}>
              試験名
            </GridItem>
            <GridItem fontSize={"1.125rem"}>{data.lang}</GridItem>
            <GridItem fontWeight={"bold"} fontSize={"1.125rem"}>
              採点結果
            </GridItem>
            <GridItem fontSize={"1.125rem"}>合格</GridItem>
            <GridItem fontWeight={"bold"} fontSize={"1.125rem"}>
              点数
            </GridItem>
            <GridItem fontSize={"1.125rem"}>{score} / 100</GridItem>
          </Grid>

          <Box mt={20}>
            <Heading fontSize={"1.2rem"}>分野別採点</Heading>
            <Grid templateColumns={"repeat(2, 1fr)"} mt={4}>
              <GridItem fontSize={"1.125rem"}>分野1</GridItem>
              <GridItem fontSize={"1.125rem"}>2 / 8</GridItem>
            </Grid>
          </Box>

          <Flex justifyContent={"space-between"} mt={20}>
            <Button backgroundColor={"var(--color-blue)"} onClick={navigateToSetting}>
              もう一度?
            </Button>
            <Button
              border={"1px solid var(--color-blue)"}
              backgroundColor={"var(--color-white)"}
              color={"var(--color-blue)"}
              onClick={navigateToTop}
            >
              トップにもどる
            </Button>
          </Flex>
        </Box>
      </Box>
    </Box>
  );
};
