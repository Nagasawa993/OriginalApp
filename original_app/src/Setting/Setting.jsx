import { Box, Button, Checkbox, Flex, Heading, HStack, RadioGroup, Stack, Text } from "@chakra-ui/react";
import { collection, doc, getCountFromServer, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { db } from "../firebase";

/////////////////////////////////////////////////////
/////////////////////////////////////////////////////
/////////////////////////////////////////////////////
/////「スタート」ボタン押下でデータの取得までOK。
/////あとは取得したデータをもとに、Firebaseから問題を作成するだけ。
/////////////////////////////////////////////////////
/////////////////////////////////////////////////////
/////////////////////////////////////////////////////

export const Setting = () => {
  const [searchParams] = useSearchParams();
  const lang = searchParams.get("lang");

  // 格納しているデータ数
  const [questionCountArray, setQuestionCountArray] = useState([]);
  const [questionKind, setQuestionKind] = useState([]);

  const [selectedFormat, setSelectedFormat] = useState(""); // 出題形式
  const [selectedFields, setSelectedFields] = useState([]); // 出題分野（複数）
  const [selectedDataCount, setSelectedDataCount] = useState(""); // 問題数

  useEffect(() => {
    const getQuestionCount = async () => {
      const questionCollection = collection(db, lang.toLowerCase());
      const questionSnapshots = await getCountFromServer(questionCollection);

      const count = questionSnapshots.data().count;
      const result = [];
      for (let i = 10; i < count; i += 10) {
        result.push(i);
      }
      result.push(count);
      setQuestionCountArray(result);

      const questionKindCollectionRef = doc(db, "field", lang.toLocaleLowerCase());
      const questionKindData = await getDoc(questionKindCollectionRef);

      const questionKind = Object.values(questionKindData.data());
      setQuestionKind(questionKind);
    };

    getQuestionCount();
  }, [lang]);

  return (
    <Box w="100%" h="100%" minH="100vh" maxW="1000px">
      <Heading size={"2xl"} textAlign={"center"} mt={10}>
        出題設定
      </Heading>

      <Box pl={40} pr={40} mt={20}>
        <Stack gap={14}>
          <Stack>
            <Text borderLeft={"10px solid var(--color-blue)"} pl={3} fontSize={"xl"} fontWeight={"bold"}>
              出題
            </Text>
            <Text pl={6} fontSize={"2xl"} fontWeight={"bold"} letterSpacing={3}>
              {lang}
            </Text>
          </Stack>

          <Stack>
            <Text borderLeft={"10px solid var(--color-blue)"} pl={3} fontSize={"xl"} fontWeight={"bold"}>
              出題形式
            </Text>
            <RadioGroup.Root mt={4} onValueChange={setSelectedFormat}>
              <HStack gap={10}>
                <RadioGroup.Item key="order" value="order">
                  <RadioGroup.ItemHiddenInput />
                  <RadioGroup.ItemIndicator />
                  <RadioGroup.ItemText fontSize={"md"}>順番に出題</RadioGroup.ItemText>
                </RadioGroup.Item>
                <RadioGroup.Item key="random" value="random">
                  <RadioGroup.ItemHiddenInput />
                  <RadioGroup.ItemIndicator />
                  <RadioGroup.ItemText fontSize={"md"}>ランダムに出題</RadioGroup.ItemText>
                </RadioGroup.Item>
              </HStack>
            </RadioGroup.Root>
          </Stack>

          <Stack>
            <Text borderLeft={"10px solid var(--color-blue)"} pl={3} fontSize={"xl"} fontWeight={"bold"}>
              出題分野
            </Text>

            <HStack gap={10} flexWrap={"wrap"} mt={4}>
              {questionKind.map((kind) => (
                <Checkbox.Root
                  key={kind}
                  value={kind}
                  checked={selectedFields.includes(kind)}
                  onCheckedChange={(checked) => {
                    setSelectedFields((prev) => (checked ? [...prev, kind] : prev.filter((item) => item !== kind)));
                  }}
                >
                  <Checkbox.HiddenInput />
                  <Checkbox.Control>
                    <Checkbox.Indicator />
                  </Checkbox.Control>
                  <Checkbox.Label>{kind}</Checkbox.Label>
                </Checkbox.Root>
              ))}
            </HStack>
          </Stack>

          <Stack>
            <Text borderLeft={"10px solid var(--color-blue)"} pl={3} fontSize={"xl"} fontWeight={"bold"}>
              問題数
            </Text>

            <Box mt={4}>
              <select
                name="data-count"
                id="pet-select"
                value={selectedDataCount}
                onChange={(e) => setSelectedDataCount(Number(e.target.value))}
                style={{ border: "1px solid", padding: "1rem", borderRadius: "6px" }}
              >
                <option value="" hidden>
                  問題数を選んでください
                </option>
                {questionCountArray.map((questionCount, index) => (
                  <option key={index}>{questionCount}</option>
                ))}
              </select>
            </Box>
          </Stack>
        </Stack>

        <Flex mt={16} justifyContent={"center"}>
          <Button
            type="button"
            bgColor={"var(--color-blue)"}
            border={"1px solid var(--color-blue)"}
            p={2}
            pl={8}
            pr={8}
            onClick={() => {
              const settings = {
                format: selectedFormat,
                field: selectedFields,
                dataCount: selectedDataCount,
              };
              console.log(settings); // 例: { format: 'random', field: ['分野1', '分野3'], dataCount: 20 }
            }}
          >
            スタート
          </Button>
        </Flex>
      </Box>
    </Box>
  );
};
