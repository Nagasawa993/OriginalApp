import { Box, Button, Flex, Grid, GridItem, Heading } from "@chakra-ui/react";
import { collection, doc, getDocs, query, updateDoc, where } from "firebase/firestore";
import { Fragment, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ErrorToast, SuccessToast } from "../components/ui/toaster";
import { db } from "../firebase";

export const Result = () => {
  const [data, setData] = useState(null);
  const [score, setScore] = useState(0);
  const [stats, setStats] = useState({});
  console.log(stats);

  useEffect(() => {
    const stored = localStorage.getItem("quiz_progress");
    const username = localStorage.getItem("username");

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

    const stats = {};
    data.fields.forEach((field, index) => {
      if (!stats[field]) {
        stats[field] = { correct: 0, total: 0 };
      }
      stats[field].total += 1;
      if (data.results[index]) {
        stats[field].correct += 1;
      }
    });

    setStats(stats);

    // 🔽 Firestoreのscoreフィールドを更新
    const updateUserScore = async () => {
      const userRef = collection(db, "user");
      const q = query(userRef, where("name", "==", username));
      const snapshot = await getDocs(q);

      if (snapshot.empty) {
        ErrorToast("ユーザー検索エラー", "ユーザーが見つかりませんでした");
        return;
      }

      const userDoc = snapshot.docs[0];
      const userDocRef = doc(db, "user", userDoc.id);

      const currentScore = userDoc.data().score || {};

      // lang（python, vbaなど）をキーにして上書きまたは追加
      const updatedScore = {
        ...currentScore,
        [data.lang.toLowerCase()]: String(score),
      };

      await updateDoc(userDocRef, {
        score: updatedScore,
      });

      SuccessToast("スコア更新完了", "スコアを更新しました");
      console.log("US", updatedScore);
      localStorage.setItem("score", JSON.stringify(updatedScore));
    };

    if (!username) return;
    updateUserScore();
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
          <Grid templateColumns={"repeat(2, 1fr)"} rowGap={8} columnGap={4}>
            <GridItem fontWeight={"bold"} fontSize={"1.125rem"}>
              試験名
            </GridItem>
            <GridItem fontSize={"1.125rem"}>{data.lang}</GridItem>
            <GridItem fontWeight={"bold"} fontSize={"1.125rem"}>
              採点結果
            </GridItem>
            <GridItem fontSize={"1.125rem"}>{score >= 80 ? "合格" : "不合格"}</GridItem>
            <GridItem fontWeight={"bold"} fontSize={"1.125rem"}>
              点数
            </GridItem>
            <GridItem fontSize={"1.125rem"}>{score} / 100</GridItem>
          </Grid>

          <Box mt={20}>
            <Heading fontSize={"1.2rem"}>分野別採点</Heading>
            <Grid templateColumns={"repeat(2, 1fr)"} mt={4} rowGap={2} columnGap={4}>
              {Object.entries(stats).map(([field, value]) => {
                const rate = Math.round((value.correct / value.total) * 100);
                return (
                  <Fragment key={field}>
                    <GridItem fontSize={"1.125rem"}>{field}</GridItem>
                    <GridItem fontSize={"1.125rem"}>
                      {value.correct} / {value.total}（{rate}%）
                    </GridItem>
                  </Fragment>
                );
              })}
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
