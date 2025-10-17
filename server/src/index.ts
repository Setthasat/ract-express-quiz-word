import express, { Request, Response } from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { Api } from "./api/word";
import { Auth } from "./api/auth";
import { WordRepository } from "./api/repository/WordRepository";

const app = express();
const port = process.env.PORT || 8888;

app.use(cors());
app.use(express.json());
dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_URL!);
    console.log("Database connected ...");
  } catch (err) {
    console.error(err);
  }
};

if (process.env.DB_URL) {
  connectDB();
} else {
  console.log("can't find DB_URL");
}

const WordRepositoryInst = new WordRepository();
const ApiInst = new Api(WordRepositoryInst);
const AuthInst = new Auth();

// ============================================
// API ROUTES FIRST - BEFORE STATIC FILES!
// ============================================

//create
app.post("/api/create/word", ApiInst.createWord);
//get words
app.post("/api/get/words", ApiInst.getAllWords);
//get word
app.post("/api/get/word", ApiInst.findWord);
// delete word
app.delete("/api/delete/word", ApiInst.deleteWord);
// quiz
app.post("/api/quiz", ApiInst.quiz);

//auth register
app.post("/api/auth/register", AuthInst.register);
//auth login
app.post("/api/auth/login", AuthInst.login);
//auth verify
app.post("/api/auth/verify-email", AuthInst.verifyOTP);
//auth get all users
app.get("/api/auth/users", AuthInst.getAllUsers);

// ============================================
// STATIC FILES AND REACT ROUTING LAST!
// ============================================

// Serve static files from the React app
const clientPath = path.resolve(__dirname, "..", "..", "client", "dist");
console.log("Serving static files from:", clientPath);
app.use(express.static(clientPath));

// Handle React routing, return all requests to React app
// THIS MUST BE LAST - it's a catch-all!
app.get("*", (req, res) => {
  const indexPath = path.resolve(clientPath, "index.html");
  console.log("Serving index.html from:", indexPath);
  res.sendFile(indexPath);
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});