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
exports.Api = void 0;
const axios_1 = __importDefault(require("axios"));
class Api {
    constructor(wordRepositoryInst) {
        this.createWord = (req, res) => __awaiter(this, void 0, void 0, function* () {
            //@ts-ignore
            const baseResponseInst = new BaseResponse();
            const { word, part_of_speech } = req.body;
            if (!word || !part_of_speech) {
                baseResponseInst.setValue(400, "Something is missing", null);
                return res.status(400).json(baseResponseInst.buildResponse());
            }
            part_of_speech.toLowerCase();
            try {
                const response = yield axios_1.default.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
                // console.log(response);
                const definitions = response.data;
                const meaning = [];
                for (let i = 0; i < definitions.length; i++) {
                    for (let j = 0; j < definitions[i].meanings.length; j++) {
                        if (definitions[i].meanings[j].partOfSpeech === part_of_speech) {
                            meaning.push(definitions[i].meanings[i].definitions[0].definition);
                        }
                    }
                }
                if (meaning.length === 0) {
                    baseResponseInst.setValue(404, "No definition found for the given part of speech", null);
                    return res.status(404).json(baseResponseInst.buildResponse());
                }
                const wordData = {
                    word: word,
                    part_of_speech: part_of_speech,
                    definition: meaning[0]
                };
                const exitWord = this.wordRepositoryInst.findWord(word, part_of_speech);
                if (exitWord === null) {
                    try {
                        yield this.wordRepositoryInst.createWord(wordData);
                    }
                    catch (error) {
                        console.log(error);
                    }
                    baseResponseInst.setValue(200, "Create word success", wordData);
                    return res.status(200).json(baseResponseInst.buildResponse());
                }
                else {
                    baseResponseInst.setValue(500, `${word} is already exit`, null);
                    return res.status(500).json(baseResponseInst.buildResponse());
                }
            }
            catch (error) {
                baseResponseInst.setValue(500, "Cannot create word", null);
                return res.status(500).json(baseResponseInst.buildResponse());
            }
        });
        this.getAllWords = (req, res) => __awaiter(this, void 0, void 0, function* () {
            //@ts-ignore
            const baseResponseInst = new BaseResponse();
            const words = this.wordRepositoryInst.findAllWord();
            baseResponseInst.setValue(200, "success", words);
            return res.status(200).json(baseResponseInst.buildResponse());
        });
        this.findWord = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { word } = req.body;
            //@ts-ignore
            const baseResponseInst = new BaseResponse();
            //@ts-ignore
            const findword = this.wordRepositoryInst.findWord(word);
            if (findword === null) {
                baseResponseInst.setValue(500, "cannot find word", null);
                return res.status(500).json(baseResponseInst.buildResponse());
            }
            baseResponseInst.setValue(200, "success", findword);
            return res.status(200).json(baseResponseInst.buildResponse());
        });
        this.deleteWord = (req, res) => {
            const { word, part_of_speech } = req.body;
            //@ts-ignore
            const baseResponseInst = new BaseResponse();
            if (!word || !part_of_speech) {
                baseResponseInst.setValue(400, "Word or part of speech is required", null);
                return res.status(400).json(baseResponseInst.buildResponse());
            }
            try {
                const deletedWord = this.wordRepositoryInst.deleteWord(word, part_of_speech);
                baseResponseInst.setValue(200, 'Deleted successfully', deletedWord);
                return res.status(200).json(baseResponseInst.buildResponse());
            }
            catch (error) {
                baseResponseInst.setValue(500, 'Error deleting word', error);
                return res.status(500).json(baseResponseInst.buildResponse());
            }
        };
        this.quiz = (req, res) => __awaiter(this, void 0, void 0, function* () {
            //@ts-ignore
            const baseResponseInst = new BaseResponse();
            const { choiceLength } = req.body; // Number of questions
            //check word length
            if (choiceLength < 3) {
                baseResponseInst.setValue(400, 'Choice length must be at least 3', null);
                return res.status(400).json(baseResponseInst.buildResponse());
            }
            //get all word for chocie
            try {
                const allWords = this.wordRepositoryInst.findAllWord();
                //check chocie length
                if (allWords.length < choiceLength) {
                    baseResponseInst.setValue(500, 'Not enough words to generate the quiz', null);
                    return res.status(500).json(baseResponseInst.buildResponse());
                }
                const quizQuestions = [];
                while (quizQuestions.length < choiceLength) {
                    const correctWord = allWords[Math.floor(Math.random() * allWords.length)];
                    const choices = [correctWord.definition];
                    //add chocie to each question
                    while (choices.length < 3) {
                        const randomWord = allWords[Math.floor(Math.random() * allWords.length)];
                        if (randomWord.definition !== correctWord.definition && !choices.includes(randomWord.definition)) {
                            choices.push(randomWord.definition);
                        }
                    }
                    this.customShuffleArray(choices);
                    quizQuestions.push({
                        word: correctWord.word,
                        choices,
                        correctAnswer: correctWord.definition
                    });
                }
                baseResponseInst.setValue(200, 'Quiz generated successfully', quizQuestions);
                return res.status(200).json(baseResponseInst.buildResponse());
            }
            catch (error) {
                baseResponseInst.setValue(500, 'Error generating quiz', error);
                return res.status(500).json(baseResponseInst.buildResponse());
            }
        });
        this.wordRepositoryInst = wordRepositoryInst;
    }
    customShuffleArray(array) {
        const shuffledIndex = [];
        let newIndexes = [];
        while (array.length !== newIndexes.length) {
            const randomIndex = Math.floor(Math.random() * array.length);
            if (!newIndexes.includes(randomIndex)) {
                newIndexes.push(randomIndex);
            }
        }
        for (let i = 0; i < newIndexes.length; i++) {
            shuffledIndex.push(array[newIndexes[i]]);
        }
        for (let i = 0; i < array.length; i++) {
            array[i] = shuffledIndex[i];
        }
    }
}
exports.Api = Api;
class BaseResponse {
    constructor(code, description, data) {
        this.code = code;
        this.description = description;
        this.data = data;
    }
    buildResponse() {
        return {
            status: {
                code: this.code,
                description: this.description,
            },
            data: this.data
        };
    }
    setValue(code, description, data) {
        this.code = code;
        this.description = description;
        this.data = data;
    }
}
