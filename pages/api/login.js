import jwt from "jsonwebtoken";

const USER = "Kano";
const PASS = "Kano@123";

export default function handler(req, res) {
  const { username, password } = req.body;

  if (username === USER && password === PASS) {
    const token = jwt.sign({ user: username }, "secret123", { expiresIn: "7d" });
    return res.json({ token });
  }

  return res.status(401).json({ error: "Invalid credentials" });
}