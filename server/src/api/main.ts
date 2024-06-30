import axios from "axios";
import { Request, Response } from "express";
import { ResponseDataDictionaryApi } from '../type/responseDataDictionnary.type';

export class Api {
    constructor() { }

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

            //????????
            // const meaning = definitions[0].meanings.find((m: any) => m.partOfSpeech === part_of_speech);

            const meaning: any = [];

            for (let i = 0; i < definitions.length; i++) {
                for (let j = 0; j < definitions[i].meanings.length; j++) {
                    if (definitions[i].meanings[j].partOfSpeech === part_of_speech) {
                        //take only definition === part_of_speech
                        meaning.push(definitions[i].meanings[i].definitions[0].definition);
                        //take all definition
                        // meaning.push(definitions[i].meanings);
                    }
                }
            }

            if (meaning.length === 0) {
                BaseResponseInst.setValue(404, "No definition found for the given part of speech", null);
                return res.status(404).json(BaseResponseInst.buildResponse());
            }

            BaseResponseInst.setValue(200, "Definition found", meaning);
            return res.status(200).json(BaseResponseInst.buildResponse());

        } catch (error) {
            BaseResponseInst.setValue(500, "An error occurred while fetching the definition", null);
            return res.status(500).json(BaseResponseInst.buildResponse());
        }
    };
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

// Example usage with Express
import express from 'express';
const app = express();
app.use(express.json());

const api = new Api();

app.post('/createWord', api.createWord);

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
