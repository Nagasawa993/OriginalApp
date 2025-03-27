import { useNavigate } from "react-router-dom";

function Page({ index, pages }) {
  const navigate = useNavigate();
  const nextPage = index + 1 < pages.length ? `/page${index + 2}` : "/";

  return (
    <div>
      <h1>test</h1>
      <h1>{pages[index]}</h1>
      {index + 1 < pages.length ? (
        <button onClick={() => navigate(nextPage)}>次のページへ</button>
      ) : (
        <button onClick={() => navigate("/PythonSetting")}>TOPへ戻る</button>
      )}
    </div>
  );
}

export default Page;