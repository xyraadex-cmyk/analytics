import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

export default function Home() {
  const router = useRouter();

  const [activeUsers, setActiveUsers] = useState(0);

  // 🔐 Auth check
  useEffect(() => {
    const token =
      localStorage.getItem("token") ||
      sessionStorage.getItem("token");

    if (!token) {
      router.push("/login");
    }
  }, []);

  // 🔴 Realtime users
  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const res = await fetch("/api/realtime");
        const data = await res.json();

        setActiveUsers(data.active);

        setChartData((prev) => [
          ...prev.slice(-10), // keep last 10 points
          {
            time: new Date().toLocaleTimeString(),
            users: data.active,
          },
        ]);
      } catch (err) {
        console.log("Realtime error");
      }
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const [chartData, setChartData] = useState([]);

  return (
    <div style={{ padding: 40 }}>
      <h1>🚀 Xyra Analytics Dashboard</h1>

      <h2>🔴 Live Users: {activeUsers}</h2>

      <div style={{ marginTop: 40 }}>
        <LineChart width={600} height={300} data={chartData}>
          <XAxis dataKey="time" />
          <YAxis />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="users"
            stroke="#8884d8"
          />
        </LineChart>
      </div>
    </div>
  );
}