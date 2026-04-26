import { useEffect, useState } from "react";
const [activeUsers, setActiveUsers] = useState(0);
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip
} from "recharts";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const interval = setInterval(async () => {
      const res = await fetch("/api/realtime");
      const data = await res.json();
      setActiveUsers(data.active);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

<LineChart width={400} height={200} data={[{name:"Today", value: activeUsers}]}>
  <XAxis dataKey="name" />
  <YAxis />
  <Tooltip />
  <Line type="monotone" dataKey="value" />
</LineChart>