import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { pages } from "../data/questions";

export default function Top() {
  const [selectedKinds, setSelectedKinds] = useState([]);
  const [isRandom, setIsRandom] = useState(false); // ランダム表示のフラグ
  const [questionLimit, setQuestionLimit] = useState("all"); // 問題数の選択
  const navigate = useNavigate();

  // 問題の種類を選択・解除
  const toggleKind = (kind) => {
    setSelectedKinds((prev) =>
      prev.includes(kind) ? prev.filter(k => k !== kind) : [...prev, kind]
    );
  };

  // 選択された種類の問題を取得
  let filteredPages = pages.filter(page => selectedKinds.includes(page.kind));

  // ランダム表示が有効なら、配列をシャッフル
  if (isRandom) {
    filteredPages = [...filteredPages].sort(() => Math.random() - 0.5);
  }

  // 問題数の制限を適用
  if (questionLimit !== "all") {
    const limit = parseInt(questionLimit, 10);
    filteredPages = filteredPages.slice(0, limit);
  }

  // スタートボタン押下時に最初の問題ページへ遷移
  const startQuiz = () => {
    if (filteredPages.length > 0) {
      navigate(`/page/0`, { state: { filteredPages } });
    } else {
      alert("問題を選択してください！");
    }
  };

  return (
    <div>
      <h1>Topページ</h1>
      
      {/* 問題の種類選択 */}
      <div>
        {["python", "VBA", "LPIC"].map((kind) => (
          <button
            key={kind}
            onClick={() => toggleKind(kind)}
            style={{
              margin: "5px",
              padding: "10px",
              backgroundColor: selectedKinds.includes(kind) ? "lightblue" : "white"
            }}
          >
            {kind}
          </button>
        ))}
      </div>

      {/* ランダム表示の切り替えボタン */}
      <button
        onClick={() => setIsRandom((prev) => !prev)}
        style={{
          margin: "10px",
          padding: "10px",
          backgroundColor: isRandom ? "lightgreen" : "white",
        }}
      >
        {isRandom ? "ランダム表示: ON" : "ランダム表示: OFF"}
      </button>

      {/* 問題数の選択 */}
      <div style={{ marginTop: "10px" }}>
        <label htmlFor="questionLimit">問題数:</label>
        <select
          id="questionLimit"
          value={questionLimit}
          onChange={(e) => setQuestionLimit(e.target.value)}
          style={{ marginLeft: "10px", padding: "5px" }}
        >
          <option value="5">5問</option>
          <option value="10">10問</option>
          <option value="all">全て</option>
        </select>
      </div>

      {/* スタートボタン */}
      <button onClick={startQuiz} style={{ marginTop: "10px", padding: "10px" }}>
        スタート
      </button>
    </div>
  );
}
