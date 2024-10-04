import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import { Api } from './api/main';
import { WordRepository } from './model/wordModel';
dotenv.config();

const app = express();
const port = process.env.PORT || 8888;

app.use(cors());
app.use(express.json());


const wordRepositoryInst = new WordRepository();
//@ts-ignore
const ApiInst = new Api(wordRepositoryInst);

app.get('/', (req: Request, res: Response) => {
    res.send('Hello, world!');
});

//create
app.post('/api/create/word', ApiInst.createWord);
//get words
app.get('/api/get/words', ApiInst.getAllWords);
//get word
app.post('/api/get/word', ApiInst.findWord);
// delete word 
app.delete('/api/delete/word', ApiInst.deleteWord);
// quiz 
app.post('/api/quiz', ApiInst.quiz);

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
