import { Box, Button, HStack, RadioGroup, Textarea } from "@chakra-ui/react";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../firebase";

export const QuizPage = () => {
  const [progress, setProgress] = useState(null);
  const [question, setQuestion] = useState(null);
  const [selectedAnswer, setSelectedAnswer] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const stored = localStorage.getItem("quiz_progress");

    if (!stored) return;
    const data = JSON.parse(stored);
    console.log("Da#,", data);
    setProgress(data);

    const fetchQuestion = async () => {
      const id = data.idList[data.currentIndex];
      const docRef = doc(db, data.lang.toLowerCase(), id);
      const snap = await getDoc(docRef);
      setQuestion(snap.data());
    };

    fetchQuestion();
  }, []);

  /**
   * 次へすすむ
   * @returns
   */
  const handleNext = async () => {
    if (!selectedAnswer) return;

    const updated = { ...progress };

    // 正誤判定
    const isCorrect = selectedAnswer === question.correct;
    // 結果保存（正誤）
    updated.results[updated.currentIndex] = isCorrect;

    updated.answers[updated.currentIndex] = selectedAnswer;
    updated.currentIndex += 1;

    if (updated.currentIndex >= updated.idList.length) {
      localStorage.setItem("quiz_progress", JSON.stringify(updated));
      setProgress(updated);
      navigate("/Result");
      return;
    }

    const nextId = updated.idList[updated.currentIndex];
    const nextRef = doc(db, updated.lang.toLowerCase(), nextId);
    const nextSnap = await getDoc(nextRef);
    const nextQuestion = nextSnap.data();

    setSelectedAnswer("");
    localStorage.setItem("quiz_progress", JSON.stringify(updated));
    setProgress(updated);
    setQuestion(nextQuestion);
  };

  if (!question || !progress) return <div>読み込み中...</div>;

  return (
    <Box w="100%" h="100%" minH="100vh" maxW="1000px">
      <div>
        <h2>問題 {progress.currentIndex + 1}</h2>
        <p>{question.question}</p>

        {typeof question.choices === "object" ? (
          <ul>
            <RadioGroup.Root mt={4} value={selectedAnswer} onValueChange={(e) => setSelectedAnswer(e.value)}>
              <HStack gap={10}>
                {question.choices.map((choice) => (
                  <RadioGroup.Item key={choice} value={choice}>
                    <RadioGroup.ItemHiddenInput />
                    <RadioGroup.ItemIndicator />
                    <RadioGroup.ItemText fontSize={"md"}>{choice}</RadioGroup.ItemText>
                  </RadioGroup.Item>
                ))}
              </HStack>
            </RadioGroup.Root>
          </ul>
        ) : (
          <Textarea onChange={(e) => setSelectedAnswer(e.target.value)} />
        )}

        <Button onClick={handleNext}>次へ</Button>
      </div>
    </Box>
  );
};
