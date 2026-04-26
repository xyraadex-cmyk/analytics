import { useState } from "react";

export default function Login() {
  const [form, setForm] = useState({
    username: "",
    password: "",
    remember: false,
  });

  const handleLogin = async () => {
    const res = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await res.json();

    if (data.token) {
      if (form.remember) {
        localStorage.setItem("token", data.token);
      } else {
        sessionStorage.setItem("token", data.token);
      }
      window.location.href = "/";
    } else {
      alert("Invalid login");
    }
  };

  return (
    <div style={{ padding: 50 }}>
      <h1>Login</h1>

      <input placeholder="Username"
        onChange={(e) => setForm({ ...form, username: e.target.value })} />

      <br /><br />

      <input type="password" placeholder="Password"
        onChange={(e) => setForm({ ...form, password: e.target.value })} />

      <br /><br />

      <label>
        <input type="checkbox"
          onChange={(e) => setForm({ ...form, remember: e.target.checked })} />
        Remember me
      </label>

      <br /><br />

      <button onClick={handleLogin}>Login</button>
    </div>
  );
}