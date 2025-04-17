import { Box, Flex, Heading, Image, Stack, useBreakpointValue } from "@chakra-ui/react";
import arch from "../assets/top/arch.svg";
import image_tree from "../assets/top/tree.svg";

function App() {
  const isMobile = useBreakpointValue({ base: true, lg: false });

  return (
    <>
      <Stack
        w={isMobile ? "90%" : "100%"}
        m={isMobile ? "0 auto" : "0"}
        alignItems={"center"}
        justifyContent={"space-between"}
        h={"100%"}
        minH={"100vh"}
      >
        <Flex w={"100%"} flexDirection={"column"} justifyContent={"center"} alignItems={"center"} mt={36}>
          <Box w={isMobile ? "100%" : "26rem"}>
            <Image src={arch} alt="アーチ状のタイトル" w={"100%"} h={"auto"} />
          </Box>
          <Heading size={isMobile ? "2xl" : "4xl"} textAlign={"center"} letterSpacing={16} mt={4}>
            ようこそ、
            <span style={{ color: "var(--color-green)" }}>資格の森</span>へ！
          </Heading>
        </Flex>

        <Flex w={isMobile ? "100%" : "34rem"} justifyContent={"center"}>
          <Image src={image_tree} w={"100%"} h={"auto"} />
        </Flex>
      </Stack>
    </>
  );
}

export default App;
