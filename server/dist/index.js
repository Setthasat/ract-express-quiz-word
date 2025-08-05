"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const word_1 = require("./api/word");
const auth_1 = require("./api/auth");
const WordRepository_1 = require("./api/repository/WordRepository");
const app = (0, express_1.default)();
const port = process.env.PORT || 8888;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
dotenv_1.default.config();
const connectDB = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield mongoose_1.default.connect(process.env.DB_URL);
        console.log('Database connected ...');
    }
    catch (err) {
        console.error(err);
    }
});
if (process.env.DB_URL) {
    connectDB();
}
else {
    console.log("can't find DB_URL");
}
//@ts-ignore
const WordRepositoryInst = new WordRepository_1.WordRepository();
const ApiInst = new word_1.Api(WordRepositoryInst);
const AuthInst = new auth_1.Auth();
app.get('/', (req, res) => {
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
