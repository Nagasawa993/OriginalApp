import {
  Box,
  Button,
  Checkbox,
  createListCollection,
  Heading,
  HStack,
  Portal,
  RadioGroup,
  Select,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useSearchParams } from "react-router-dom";

export const Setting = () => {
  const [searchParams] = useSearchParams();
  const lang = searchParams.get("lang");

  const frameworks = createListCollection({
    items: [
      { label: "React.js", value: "react" },
      { label: "Vue.js", value: "vue" },
      { label: "Angular", value: "angular" },
      { label: "Svelte", value: "svelte" },
    ],
  });

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
            <RadioGroup.Root mt={4}>
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
              <Checkbox.Root>
                <Checkbox.HiddenInput />
                <Checkbox.Control>
                  <Checkbox.Indicator />
                </Checkbox.Control>
                <Checkbox.Label>分野1</Checkbox.Label>
              </Checkbox.Root>
              <Checkbox.Root>
                <Checkbox.HiddenInput />
                <Checkbox.Control>
                  <Checkbox.Indicator />
                </Checkbox.Control>
                <Checkbox.Label>分野2</Checkbox.Label>
              </Checkbox.Root>
              <Checkbox.Root>
                <Checkbox.HiddenInput />
                <Checkbox.Control>
                  <Checkbox.Indicator />
                </Checkbox.Control>
                <Checkbox.Label>分野3</Checkbox.Label>
              </Checkbox.Root>
            </HStack>
          </Stack>

          <Stack>
            <Text borderLeft={"10px solid var(--color-blue)"} pl={3} fontSize={"xl"} fontWeight={"bold"}>
              問題数
            </Text>
            <Select.Root collection={frameworks} size="sm" width="320px">
              <Select.HiddenSelect />
              <Select.Label>Select framework</Select.Label>
              <Select.Control>
                <Select.Trigger>
                  <Select.ValueText placeholder="Select framework" />
                </Select.Trigger>
                <Select.IndicatorGroup>
                  <Select.Indicator />
                </Select.IndicatorGroup>
              </Select.Control>
              <Portal>
                <Select.Positioner>
                  <Select.Content>
                    {frameworks.items.map((framework) => (
                      <Select.Item item={framework} key={framework.value}>
                        {framework.label}
                        <Select.ItemIndicator />
                      </Select.Item>
                    ))}
                  </Select.Content>
                </Select.Positioner>
              </Portal>
            </Select.Root>
          </Stack>
        </Stack>

        <Box mt={16}>
          <Button
            type="submit"
            bgColor={"var(--color-blue)"}
            border={"1px solid var(--color-blue)"}
            p={2}
            pl={8}
            pr={8}
          >
            スタート
          </Button>
        </Box>
      </Box>
    </Box>
  );
};
