// @ts-nocheck
import axios from "axios";
import { Request, Response } from "express";
import { ResponseDataDictionaryApi } from "../type/responseDataDictionnary.type";
import { WordRepository } from "./repository/WordRepository";

type ChoiceType = {
    word: string;
    choices: string[];
    correctAnswer: string;
};

export class Api {
    private wordRepository: WordRepository;

    constructor(wordRepository: WordRepository) {
        this.wordRepository = wordRepository;
    }

    createWord = async (req: Request, res: Response) => {
        const baseResponseInst = new BaseResponse();
        const { user_id, word, part_of_speech } = req.body;

        if (!user_id || !word || !part_of_speech) {
            baseResponseInst.setValue(400, "User ID, word, and part of speech are required", null);
            const responseData = baseResponseInst.buildResponse();
            console.log("Create Word Response:", responseData);
            return res.status(400).json(responseData);
        }

        try {
            const existWord = await this.wordRepository.findExistWord(user_id, word, part_of_speech);
            if (existWord) {
                baseResponseInst.setValue(409, `${word} already exists`, null);
                const responseData = baseResponseInst.buildResponse();
                console.log("Create Word Response:", responseData);
                return res.status(409).json(responseData);
            }

            const response = await axios.get<ResponseDataDictionaryApi[]>(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
            const definitions = response.data;
            const meaning = definitions.flatMap(d =>
                d.meanings
                    .filter(m => m.partOfSpeech === part_of_speech)
                    .map(m => m.definitions[0]?.definition)
            );

            if (meaning.length === 0) {
                baseResponseInst.setValue(404, "No definition found for the given part of speech", null);
                const responseData = baseResponseInst.buildResponse();
                console.log("Create Word Response:", responseData);
                return res.status(404).json(responseData);
            }

            const wordData = { word, part_of_speech, definition: meaning[0] };
            const createdWord = await this.wordRepository.createWord(user_id, wordData);

            baseResponseInst.setValue(200, "Create word success", createdWord);
            const responseData = baseResponseInst.buildResponse();
            console.log("Create Word Response:", responseData);
            return res.status(200).json(responseData);
        } catch (error) {
            console.error("Error creating word:", error);
            baseResponseInst.setValue(500, "Cannot create word", null);
            const responseData = baseResponseInst.buildResponse();
            console.log("Create Word Response:", responseData);
            return res.status(500).json(responseData);
        }
    };

    getAllWords = async (req: Request, res: Response) => {
        const baseResponseInst = new BaseResponse();
        const { user_id } = req.body;

        if (!user_id) {
            baseResponseInst.setValue(400, "User ID is required", null);
            const responseData = baseResponseInst.buildResponse();
            console.log("Get All Words Response:", responseData);
            return res.status(400).json(responseData);
        }

        try {
            const words = await this.wordRepository.findAllWords(user_id);
            baseResponseInst.setValue(200, "Success", words);
            const responseData = baseResponseInst.buildResponse();
            console.log("Get All Words Response:", responseData);
            return res.status(200).json(responseData);
        } catch (error) {
            console.error("Error fetching words:", error);
            baseResponseInst.setValue(500, "Error fetching words", null);
            const responseData = baseResponseInst.buildResponse();
            console.log("Get All Words Response:", responseData);
            return res.status(500).json(responseData);
        }
    };

    deleteWord = async (req: Request, res: Response) => {
        const baseResponseInst = new BaseResponse();
        const { user_id, word, part_of_speech } = req.body;

        if (!user_id || !word || !part_of_speech) {
            baseResponseInst.setValue(400, "User ID, word, and part of speech are required", null);
            const responseData = baseResponseInst.buildResponse();
            console.log("Delete Word Response:", responseData);
            return res.status(400).json(responseData);
        }

        try {
            const deletedWord = await this.wordRepository.deleteWord(user_id, word, part_of_speech);
            baseResponseInst.setValue(200, "Deleted successfully", deletedWord);
            const responseData = baseResponseInst.buildResponse();
            console.log("Delete Word Response:", responseData);
            return res.status(200).json(responseData);
        } catch (error) {
            console.error("Error deleting word:", error); 
            baseResponseInst.setValue(500, "Error deleting word", error.message);
            const responseData = baseResponseInst.buildResponse();
            console.log("Delete Word Response:", responseData);
            return res.status(500).json(responseData);
        }
    };

    findWord = async (req: Request, res: Response) => {
        const { user_id, word, part_of_speech } = req.body;
        const baseResponseInst = new BaseResponse();

        if (!user_id || !word || !part_of_speech) {
            baseResponseInst.setValue(400, "User ID, word, and part of speech are required", null);
            const responseData = baseResponseInst.buildResponse();
            console.log("Find Word Response:", responseData);
            return res.status(400).json(responseData);
        }

        try {
            const foundWord = await this.wordRepository.findExistWord(user_id, word, part_of_speech);
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
        } catch (error) {
            console.error("Error finding word:", error);
            baseResponseInst.setValue(500, "Error finding word", null);
            const responseData = baseResponseInst.buildResponse();
            console.log("Find Word Response:", responseData);
            return res.status(500).json(responseData);
        }
    };

    quiz = async (req: Request, res: Response) => {
        const { user_id, choiceLength } = req.body;
        const baseResponseInst = new BaseResponse();
    
        if (!user_id || choiceLength < 3) {
            baseResponseInst.setValue(400, "User ID is required, and choice length must be at least 3", null);
            const responseData = baseResponseInst.buildResponse();
            console.log("Quiz Response:", responseData);
            return res.status(400).json(responseData);
        }
    
        try {
            const allWords = await this.wordRepository.findAllWords(user_id);
            console.log("Fetched1 words:", allWords);
            console.log("Total words available:", allWords.length);
    
            if (allWords.length < choiceLength) {
                baseResponseInst.setValue(400, "Not enough words to generate the quiz", null);
                const responseData = baseResponseInst.buildResponse();
                console.log("Quiz Response:", responseData);
                return res.status(400).json(responseData);
            }
    
            const quizQuestions: Array<ChoiceType> = [];
            const usedWords: string[] = [];
            while (quizQuestions.length < choiceLength) {
                const correctWord = allWords[Math.floor(Math.random() * allWords.length)];
                if (usedWords.includes(correctWord.word)) continue;
                usedWords.push(correctWord.word);
    
                const choices = [correctWord.definition];
                while (choices.length < 3) {
                    const randomWord = allWords[Math.floor(Math.random() * allWords.length)];
                    if (!choices.includes(randomWord.definition) && randomWord.definition !== correctWord.definition) {
                        choices.push(randomWord.definition);
                    }
                }
                this.shuffleArray(choices);
                quizQuestions.push({ word: correctWord.word, part_of_speech: correctWord.part_of_speech, choices, correctAnswer: correctWord.definition });
            }
    
            baseResponseInst.setValue(200, "Quiz generated successfully", quizQuestions);
            const responseData = baseResponseInst.buildResponse();
            console.log("Quiz Response:", responseData);
            return res.status(200).json(responseData);
        } catch (error) {
            console.error("Error generating quiz:", error);
            baseResponseInst.setValue(500, "Error generating quiz", error);
            const responseData = baseResponseInst.buildResponse();
            console.log("Quiz Response:", responseData);
            return res.status(500).json(responseData);
        }
    };
    

    private shuffleArray(array: any[]) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }
}

class BaseResponse {
    code: number;
    description: string;
    data: any;

    constructor(code: number = 200, description: string = "", data: any = null) {
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

    setValue(code: number, description: string, data: any) {
        this.code = code;
        this.description = description;
        this.data = data;
    }
}
