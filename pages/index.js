import { useEffect, useState } from "react";

export default function Home() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("/api/stats")
      .then((res) => res.json())
      .then(setData);
  }, []);

  if (!data) return <p>Loading...</p>;

  return (
    <div style={{ padding: 20 }}>
      <h1>📊 Xyra Analytics</h1>

      <h2>Total Visits: {data.total}</h2>
      <h3>Today: {data.today}</h3>

      <h3>Top Sources:</h3>
      <ul>
        {data.sources.map((s, i) => (
          <li key={i}>
            {s.referrer} — {s.count}
          </li>
        ))}
      </ul>
    </div>
  );
}