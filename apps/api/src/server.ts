import express from "express";

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());

app.get("/api/health", (req, res) => {
  res.json({ status: "ok", message: "Backend is running" });
});

app.listen(PORT, () => {
  console.log(`Backend server running on port ${PORT}`);
});
