const express = require("express");
const notes = require("./Data/notes");
const dotenv = require("dotenv");
const cors = require("cors");
const { connectDB } = require("./config/db");
const userRoutes = require("./routes/userroutes");
const noteRoutes = require("./routes/noteroutes");
const { notFound, erroHandler } = require("./middleware/errorMiddleware");

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/users", userRoutes);
app.use("/api/notes", noteRoutes);

app.get("/", (req, res) => {
  res.send("API is running...");
});

app.get("/api/notes", (req, res) => {
  res.json(notes);
});

app.use(notFound);
app.use(erroHandler);

const PORT = process.env.config || 5500;

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
