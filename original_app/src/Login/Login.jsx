import { Box, Button, Field, Heading, Input, Stack } from "@chakra-ui/react";
import { collection, getDocs } from "firebase/firestore";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";
import { db } from "../firebase";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  const { login } = useAuth();

  const onSubmit = async (data) => {
    try {
      console.log("Data", data);
      const userCollection = collection(db, "user");
      const snapshots = await getDocs(userCollection);

      const users = snapshots.docs.map((doc) => doc.data());
      const match = users.find((user) => user.password === data.password && user.name === data.username);

      if (match) {
        login(data);
        navigate("/Mypage");
      } else {
        alert("ユーザー名またはパスワードが間違っています。");
      }
    } catch (err) {
      console.error("ログイン失敗:", err);
    }
  };

  return (
    <Box w="100%" h="100%" minH="100vh" maxW="1000px">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack w="50%" align="center" m="0 auto" mt={10} gap={10}>
          <Heading size="2xl">ログイン</Heading>

          <Field.Root invalid={!!errors.username} required>
            <Field.Label>ユーザー名</Field.Label>
            <Input placeholder="ユーザー名を入力してください" {...register("username", { required: true })} />
            <Field.ErrorText>{errors.username && "ユーザー名を入力してください"}</Field.ErrorText>
          </Field.Root>

          <Field.Root invalid={!!errors.password} required>
            <Field.Label>パスワード</Field.Label>
            <Input
              type="password"
              placeholder="パスワードを入力してください"
              {...register("password", { required: true })}
            />
            <Field.ErrorText>{errors.password && "パスワードを入力してください"}</Field.ErrorText>
          </Field.Root>

          <Button type="submit" bgColor="var(--color-blue)" px={8}>
            ログイン
          </Button>
        </Stack>
      </form>
    </Box>
  );
};

export default Login;
