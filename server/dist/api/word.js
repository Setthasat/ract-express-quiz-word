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
// @ts-nocheck
const axios_1 = __importDefault(require("axios"));
class Api {
    constructor(wordRepository) {
        this.createWord = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const baseResponseInst = new BaseResponse();
            const { user_id, word, part_of_speech } = req.body;
            if (!user_id || !word || !part_of_speech) {
                baseResponseInst.setValue(400, "User ID, word, and part of speech are required", null);
                const responseData = baseResponseInst.buildResponse();
                console.log("Create Word Response:", responseData);
                return res.status(400).json(responseData);
            }
            try {
                const existWord = yield this.wordRepository.findExistWord(user_id, word, part_of_speech);
                if (existWord) {
                    baseResponseInst.setValue(409, `${word} already exists`, null);
                    const responseData = baseResponseInst.buildResponse();
                    console.log("Create Word Response:", responseData);
                    return res.status(409).json(responseData);
                }
                const response = yield axios_1.default.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
                const definitions = response.data;
                const meaning = definitions.flatMap(d => d.meanings
                    .filter(m => m.partOfSpeech === part_of_speech)
                    .map(m => { var _a; return (_a = m.definitions[0]) === null || _a === void 0 ? void 0 : _a.definition; }));
                if (meaning.length === 0) {
                    baseResponseInst.setValue(404, "No definition found for the given part of speech", null);
                    const responseData = baseResponseInst.buildResponse();
                    console.log("Create Word Response:", responseData);
                    return res.status(404).json(responseData);
                }
                const wordData = { word, part_of_speech, definition: meaning[0] };
                const createdWord = yield this.wordRepository.createWord(user_id, wordData);
                baseResponseInst.setValue(200, "Create word success", createdWord);
                const responseData = baseResponseInst.buildResponse();
                console.log("Create Word Response:", responseData);
                return res.status(200).json(responseData);
            }
            catch (error) {
                console.error("Error creating word:", error);
                baseResponseInst.setValue(500, "Cannot create word", null);
                const responseData = baseResponseInst.buildResponse();
                console.log("Create Word Response:", responseData);
                return res.status(500).json(responseData);
            }
        });
        this.getAllWords = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const baseResponseInst = new BaseResponse();
            const { user_id } = req.body;
            if (!user_id) {
                baseResponseInst.setValue(400, "User ID is required", null);
                const responseData = baseResponseInst.buildResponse();
                console.log("Get All Words Response:", responseData);
                return res.status(400).json(responseData);
            }
            try {
                const words = yield this.wordRepository.findAllWords(user_id);
                baseResponseInst.setValue(200, "Success", words);
                const responseData = baseResponseInst.buildResponse();
                console.log("Get All Words Response:", responseData);
                return res.status(200).json(responseData);
            }
            catch (error) {
                console.error("Error fetching words:", error);
                baseResponseInst.setValue(500, "Error fetching words", null);
                const responseData = baseResponseInst.buildResponse();
                console.log("Get All Words Response:", responseData);
                return res.status(500).json(responseData);
            }
        });
        this.deleteWord = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const baseResponseInst = new BaseResponse();
            const { user_id, word, part_of_speech } = req.body;
            if (!user_id || !word || !part_of_speech) {
                baseResponseInst.setValue(400, "User ID, word, and part of speech are required", null);
                const responseData = baseResponseInst.buildResponse();
                console.log("Delete Word Response:", responseData);
                return res.status(400).json(responseData);
            }
            try {
                const deletedWord = yield this.wordRepository.deleteWord(user_id, word, part_of_speech);
                baseResponseInst.setValue(200, "Deleted successfully", deletedWord);
                const responseData = baseResponseInst.buildResponse();
                console.log("Delete Word Response:", responseData);
                return res.status(200).json(responseData);
            }
            catch (error) {
                console.error("Error deleting word:", error);
                baseResponseInst.setValue(500, "Error deleting word", error.message);
                const responseData = baseResponseInst.buildResponse();
                console.log("Delete Word Response:", responseData);
                return res.status(500).json(responseData);
            }
        });
        this.findWord = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { user_id, word, part_of_speech } = req.body;
            const baseResponseInst = new BaseResponse();
            if (!user_id || !word || !part_of_speech) {
                baseResponseInst.setValue(400, "User ID, word, and part of speech are required", null);
                const responseData = baseResponseInst.buildResponse();
                console.log("Find Word Response:", responseData);
                return res.status(400).json(responseData);
            }
            try {
                const foundWord = yield this.wordRepository.findExistWord(user_id, word, part_of_speech);
                if (!foundWord) {
                    baseResponseInst.setValue(404, "Word not found", null);
                    const responseData = baseResponseInst.buildResponse();
                    console.log("Find Word Response:", responseData);
                    return res.status(404).json(responseData);
                }
                baseResponseInst.setValue(200, "Word found", foundWord);
                const responseData = baseResponseInst.buildResponse();
                console.log("Find Word Response:", responseData);
                return res.status(200).json(responseData);
            }
            catch (error) {
                console.error("Error finding word:", error);
                baseResponseInst.setValue(500, "Error finding word", null);
                const responseData = baseResponseInst.buildResponse();
                console.log("Find Word Response:", responseData);
                return res.status(500).json(responseData);
            }
        });
        this.quiz = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { user_id, choiceLength } = req.body;
            const baseResponseInst = new BaseResponse();
            if (!user_id || choiceLength < 3) {
                baseResponseInst.setValue(400, "User ID is required, and choice length must be at least 3", null);
                const responseData = baseResponseInst.buildResponse();
                console.log("Quiz Response:", responseData);
                return res.status(400).json(responseData);
            }
            try {
                const allWords = yield this.wordRepository.findAllWords(user_id);
                console.log("Fetched1 words:", allWords);
                console.log("Total words available:", allWords.length);
                if (allWords.length < choiceLength) {
                    baseResponseInst.setValue(400, "Not enough words to generate the quiz", null);
                    const responseData = baseResponseInst.buildResponse();
                    console.log("Quiz Response:", responseData);
                    return res.status(400).json(responseData);
                }
                const quizQuestions = [];
                const usedWords = [];
                while (quizQuestions.length < choiceLength) {
                    const correctWord = allWords[Math.floor(Math.random() * allWords.length)];
                    if (usedWords.includes(correctWord.word))
                        continue;
                    usedWords.push(correctWord.word);
                    const choices = [correctWord.definition];
                    while (choices.length < 3) {
                        const randomWord = allWords[Math.floor(Math.random() * allWords.length)];
                        if (!choices.includes(randomWord.definition) && randomWord.definition !== correctWord.definition) {
                            choices.push(randomWord.definition);
                        }
                    }
                    this.shuffleArray(choices);
                    quizQuestions.push({ word: correctWord.word, choices, correctAnswer: correctWord.definition });
                }
                baseResponseInst.setValue(200, "Quiz generated successfully", quizQuestions);
                const responseData = baseResponseInst.buildResponse();
                console.log("Quiz Response:", responseData);
                return res.status(200).json(responseData);
            }
            catch (error) {
                console.error("Error generating quiz:", error);
                baseResponseInst.setValue(500, "Error generating quiz", error);
                const responseData = baseResponseInst.buildResponse();
                console.log("Quiz Response:", responseData);
                return res.status(500).json(responseData);
            }
        });
        this.wordRepository = wordRepository;
    }
    shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }
}
exports.Api = Api;
class BaseResponse {
    constructor(code = 200, description = "", data = null) {
        this.code = code;
        this.description = description;
        this.data = data;
    }
    buildResponse() {
        return {
            status: { code: this.code, description: this.description },
            data: this.data,
        };
    }
    setValue(code, description, data) {
        this.code = code;
        this.description = description;
        this.data = data;
    }
}
