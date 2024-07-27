import axios from "axios";
import { Request, Response } from "express";
import { ResponseDataDictionaryApi } from '../type/responseDataDictionnary.type';

export class Api {
    private WordRepositoryInst;
    constructor(WordRepositoryInst: any) {
        this.WordRepositoryInst = WordRepositoryInst;
    }

    createWord = async (req: Request, res: Response) => {

        //@ts-ignore
        const BaseResponseInst = new BaseResponse();
        const { word, part_of_speech } = req.body;

        if (!word || !part_of_speech) {
            BaseResponseInst.setValue(400, "Something is missing", null);
            return res.status(400).json(BaseResponseInst.buildResponse());
        }

        part_of_speech.toLowerCase();

        try {
            const response = await axios.get<ResponseDataDictionaryApi[]>(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
            // console.log(response);
            const definitions = response.data;

            const meaning: any = [];

            for (let i = 0; i < definitions.length; i++) {
                for (let j = 0; j < definitions[i].meanings.length; j++) {
                    if (definitions[i].meanings[j].partOfSpeech === part_of_speech) {
                        meaning.push(definitions[i].meanings[i].definitions[0].definition);
                    }
                }
            }

            if (meaning.length === 0) {
                BaseResponseInst.setValue(404, "No definition found for the given part of speech", null);
                return res.status(404).json(BaseResponseInst.buildResponse());
            }

            const wordData = {
                word: word,
                part_of_speech: part_of_speech,
                definition: meaning[0]
            };

            const exitWord = this.WordRepositoryInst.findWord(word, part_of_speech);
            if (exitWord === null) {
                try {
                    await this.WordRepositoryInst.createWord(wordData);
                } catch (error) {
                    console.log(error);
                }
                BaseResponseInst.setValue(200, "Create word success", wordData);
                return res.status(200).json(BaseResponseInst.buildResponse());
            } else {
                BaseResponseInst.setValue(500, `${word} is already exit`, null);
                return res.status(500).json(BaseResponseInst.buildResponse());
            }
        } catch (error) {
            BaseResponseInst.setValue(500, "Cannot create word", null);
            return res.status(500).json(BaseResponseInst.buildResponse());
        }
    };

    getAllWords = async (req: Request, res: Response) => {
        //@ts-ignore
        const BaseResponseInst = new BaseResponse();
        const words = this.WordRepositoryInst.findAllWord();
        BaseResponseInst.setValue(200, "success", words);
        return res.status(200).json(BaseResponseInst.buildResponse());
    };

    findWord = async (req: Request, res: Response) => {

        const { word } = req.body;
        //@ts-ignore
        const BaseResponseInst = new BaseResponse();
        const findword = this.WordRepositoryInst.findWord(word);
        if (findword === null) {
            BaseResponseInst.setValue(500, "cannot find word", null);
            return res.status(500).json(BaseResponseInst.buildResponse());
        }
        BaseResponseInst.setValue(200, "success", findword);
        return res.status(200).json(BaseResponseInst.buildResponse());
    };

    deleteWord = (req: Request, res: Response) => {
        const { word, part_of_speech } = req.body;
        //@ts-ignore
        const BaseResponseInst = new BaseResponse();

        if (!word || !part_of_speech) {
            BaseResponseInst.setValue(400, "Word or part of speech is required", null);
            return res.status(400).json(BaseResponseInst.buildResponse());
        }

        try {
            const deletedWord = this.WordRepositoryInst.deleteWord(word, part_of_speech);
            BaseResponseInst.setValue(200, 'Deleted successfully', deletedWord);
            return res.status(200).json(BaseResponseInst.buildResponse());
        } catch (error) {
            BaseResponseInst.setValue(500, 'Error deleting word', error);
            return res.status(500).json(BaseResponseInst.buildResponse());
        }
    };

    quiz = (req : Request, res : Response) => {
        const { choiceLength } = req.body;
        //@ts-ignore
        const  BaseResponseInst = new BaseResponse();
        //check words length(Array{DB}) ? < chocieLength 
        const words = this.WordRepositoryInst.findWordByLength(choiceLength)
        if(words === null){
            BaseResponseInst.setValue(500, 'Error cannot find words', null);
            return res.status(500).json(BaseResponseInst.buildResponse());
        }
        BaseResponseInst.setValue(200, "success", words);
        return res.status(200).json(BaseResponseInst.buildResponse());
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