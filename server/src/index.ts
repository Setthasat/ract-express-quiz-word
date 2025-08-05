import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import { Api } from './api/word';
import { Auth } from './api/auth';
import { WordRepository } from './api/repository/WordRepository';



const app = express();
const port = process.env.PORT || 8888;

app.use(cors());
app.use(express.json());
dotenv.config();

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DB_URL!);
        console.log('Database connected ...');
    } catch (err) {
        console.error(err);
    }
};

if (process.env.DB_URL) {
    connectDB();
} else {
    console.log("can't find DB_URL");
}

//@ts-ignore
const WordRepositoryInst = new WordRepository();
const ApiInst = new Api(WordRepositoryInst);
const AuthInst = new Auth();


app.get('/', (req: Request, res: Response) => {
    res.send('Hello, world!');
});

//create
app.post('/api/create/word', ApiInst.createWord);
//get words
app.post('/api/get/words', ApiInst.getAllWords);
//get word
app.post('/api/get/word', ApiInst.findWord);
// delete word 
app.delete('/api/delete/word', ApiInst.deleteWord);
// quiz 
app.post('/api/quiz', ApiInst.quiz);

//auth

//auth register
app.post('/api/auth/register', AuthInst.register);
//auth login
app.post('/api/auth/login', AuthInst.login);
//auth verify
app.post('/api/auth/verify-email', AuthInst.verifyOTP);

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
