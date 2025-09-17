import express from "express";
import cors from "cors";
import { signUp, signIn, getMe } from "./auth";

const app = express();
const PORT = process.env.PORT || 6000;

app.use(cors({
  origin: process.env.FRONTEND_URL || "http://localhost:3000",
  credentials: true,
}));

app.use(express.json());

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", message: "Backend is running" });
});

// Authentication routes
app.post("/api/auth/signup", signUp);
app.post("/api/auth/signin", signIn);
app.get("/api/auth/me", getMe);

app.listen(PORT, () => {
  console.log(`Backend server running on port ${PORT}`);
});
