import { Box, Button, Field, Heading, Input, Stack } from "@chakra-ui/react";
import { collection, doc, getDocs, setDoc } from "firebase/firestore";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toaster } from "../components/ui/toaster";
import { db } from "../firebase";

const Register = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      console.log("Data", data);
      const userCollection = collection(db, "user");
      const snapshots = await getDocs(userCollection);

      const users = snapshots.docs.map((doc) => doc.data());
      const match = users.find((user) => user.name === data.username);

      if (match) {
        setError("username", {
          type: "manual",
          message: "ユーザー名が重複しています。別のユーザー名をお試しください。",
        });
        return;
      }

      const newUserRef = doc(userCollection);
      await setDoc(newUserRef, { name: data.username, password: data.password });

      toaster.create({
        title: "登録が完了しました",
        description: `ようこそ ${data.username}さん`,
        type: "success",
        duration: 3000,
        meta: {
          closable: true,
        },
      });

      window.localStorage.setItem("username", data.username);
      window.localStorage.setItem("password", data.password);
      navigate("/Mypage");
    } catch (err) {
      console.error("ログイン失敗:", err);
    }
  };

  return (
    <Box w="100%" h="100%" minH="100vh" maxW="1000px">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack w="50%" align="center" m="0 auto" mt={10} gap={10}>
          <Heading size="2xl">登録</Heading>

          <Field.Root invalid={!!errors.username} required>
            <Field.Label>ユーザー名</Field.Label>
            <Input placeholder="ユーザー名を入力してください" {...register("username", { required: true })} />
            <Field.ErrorText> {errors.username && errors.username.message}</Field.ErrorText>
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
            登録
          </Button>
        </Stack>
      </form>
    </Box>
  );
};

export default Register;
