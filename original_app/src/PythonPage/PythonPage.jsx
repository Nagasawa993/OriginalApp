import { useLocation, useNavigate, useParams } from "react-router-dom";
import Question from "../components/Question";

export default function Page() {
  const location = useLocation();
  const navigate = useNavigate();
  const { index } = useParams();
  const pageIndex = parseInt(index, 10);
  const pages = location.state?.filteredPages || [];

  if (!pages.length) {
    return <p>エラー: 問題がありません</p>;
  }

  const currentPage = pages[pageIndex];

  return (
    <div>
      <Question page={currentPage} />
      <div>
        {pageIndex > 0 && (
          <button onClick={() => navigate(`/page/${pageIndex - 1}`, { state: { filteredPages: pages } })}>
            戻る
          </button>
        )}
        {pageIndex < pages.length - 1 && (
          <button onClick={() => navigate(`/page/${pageIndex + 1}`, { state: { filteredPages: pages } })}>
            次へ
          </button>
        )}
        {pageIndex +1 === pages.length && (
          <button onClick={() => navigate("/PythonSetting")}>
            TOPへ戻る
          </button>
        )}
      </div>
    </div>
  );
}
