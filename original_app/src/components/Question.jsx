export default function Question({ page }) {
    return (
      <div>
        <h2>問題: {page.question}</h2>
        <ul>
          {page.select.map((choice, i) => (
            <li key={i}>{choice}</li>
          ))}
        </ul>
      </div>
    );
  }
