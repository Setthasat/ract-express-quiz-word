import axios from "axios";
import { Request, Response } from "express";
import { ResponseDataDictionaryApi } from '../type/responseDataDictionnary.type';
import { WordRepositoryInterface } from "../model/wordModel";

type ChoiceType = {
    word: string,
    choices: string[],
    correctAnswer: string;
};

export class Api {
    private wordRepositoryInst: WordRepositoryInterface;
    constructor(wordRepositoryInst: WordRepositoryInterface) {
        this.wordRepositoryInst = wordRepositoryInst;
    }

    createWord = async (req: Request, res: Response) => {

        //@ts-ignore
        const baseResponseInst = new BaseResponse();
        const { word, part_of_speech } = req.body;

        // Validate input
        if (!word || !part_of_speech) {
            baseResponseInst.setValue(400, "Something is missing", null);
            return res.status(400).json(baseResponseInst.buildResponse());
        }

        part_of_speech.toLowerCase();

        try {
            // Check if the word already exists
            const existWord = this.wordRepositoryInst.findExistWord(word, part_of_speech);
            if (existWord !== null) {
                console.log("Exist:", word);
                baseResponseInst.setValue(409, `${word} already exists`, null);
                return res.status(409).json(baseResponseInst.buildResponse());
            }

            // Fetch definitions from external dictionary API
            const response = await axios.get<ResponseDataDictionaryApi[]>(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
            const definitions = response.data;

            const meaning: any = [];

            // Find the definition that matches the part of speech
            for (let i = 0; i < definitions.length; i++) {
                for (let j = 0; j < definitions[i].meanings.length; j++) {
                    if (definitions[i].meanings[j].partOfSpeech === part_of_speech) {
                        meaning.push(definitions[i].meanings[j].definitions[0].definition);
                    }
                }
            }

            // Check if no matching definitions were found
            if (meaning.length === 0) {
                baseResponseInst.setValue(404, "No definition found for the given part of speech", null);
                return res.status(404).json(baseResponseInst.buildResponse());
            }

            // Prepare word data to store
            const wordData = {
                word: word,
                part_of_speech: part_of_speech,
                definition: meaning[0]
            };

            await this.wordRepositoryInst.createWord(wordData);
            console.log("Creating:", word);
            baseResponseInst.setValue(200, "Create word success", wordData);
            return res.status(200).json(baseResponseInst.buildResponse());

        } catch (error) {
            console.error("Error creating word:", error);
            baseResponseInst.setValue(500, "Cannot create word", null);
            return res.status(500).json(baseResponseInst.buildResponse());
        }
    };



    getAllWords = async (req: Request, res: Response) => {
        //@ts-ignore
        const baseResponseInst = new BaseResponse();
        const words = this.wordRepositoryInst.findAllWord();
        baseResponseInst.setValue(200, "success", words);
        return res.status(200).json(baseResponseInst.buildResponse());
    };

    findWord = async (req: Request, res: Response) => {

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
    };

    deleteWord = (req: Request, res: Response) => {
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
        } catch (error) {
            baseResponseInst.setValue(500, 'Error deleting word', error);
            return res.status(500).json(baseResponseInst.buildResponse());
        }
    };

    quiz = (req: Request, res: Response) => {
        //@ts-ignore
        const baseResponseInst = new BaseResponse();
        const { choiceLength } = req.body; // Number of questions
        console.log(choiceLength);

        // Check word length
        if (choiceLength < 3) {
            baseResponseInst.setValue(400, 'Choice length must be at least 3', null);
            return res.status(400).json(baseResponseInst.buildResponse());
        }

        // Get all words for choice
        try {
            const allWords = this.wordRepositoryInst.findAllWord();
            console.log(allWords);

            // Check choice length
            if (allWords.length < choiceLength) {
                baseResponseInst.setValue(500, 'Not enough words to generate the quiz', null);
                return res.status(500).json(baseResponseInst.buildResponse());
            }

            const quizQuestions: Array<ChoiceType> = [];
            const usedWords: string[] = []; // Array to keep track of used words

            while (quizQuestions.length < choiceLength) {
                const correctWord = allWords[Math.floor(Math.random() * allWords.length)];

                // Check if the word has already been used
                if (usedWords.includes(correctWord.word)) {
                    continue; // Skip this word if already used
                }

                // Add the word to the usedWords array
                usedWords.push(correctWord.word);

                // Choice array
                const choices = [correctWord.definition];

                // Random choices and add to each question
                while (choices.length < 3) {
                    const randomWord = allWords[Math.floor(Math.random() * allWords.length)];

                    // Check choice
                    const isSameWordDefinition = randomWord.definition === correctWord.definition;
                    const isAlreadyExistWordDefinition = choices.includes(randomWord.definition);

                    if (!isSameWordDefinition && !isAlreadyExistWordDefinition) {
                        choices.push(randomWord.definition);
                    }
                }

                // Shuffle choices
                this.shuffleArray(choices);

                // Push items
                quizQuestions.push({
                    word: correctWord.word,
                    choices,
                    correctAnswer: correctWord.definition
                });
            }

            baseResponseInst.setValue(200, 'Quiz generated successfully', quizQuestions);
            return res.status(200).json(baseResponseInst.buildResponse());
        } catch (error) {
            baseResponseInst.setValue(500, 'Error generating quiz', error);
            return res.status(500).json(baseResponseInst.buildResponse());
        }
    };


    private shuffleArray(array: any[]) {
        const shuffledIndex = [];
        let newIndexes: Array<number> = [];
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

class BaseResponse {
    code: number;
    description: string;
    data: any;

    constructor(code: number, description: string, data: any) {
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

    setValue(code: number, description: string, data: any) {
        this.code = code;
        this.description = description;
        this.data = data;
    }
}