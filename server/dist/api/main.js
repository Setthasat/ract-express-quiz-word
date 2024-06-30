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
    constructor() {
        this.createWord = (req, res) => __awaiter(this, void 0, void 0, function* () {
            //@ts-ignore
            const BaseResponseInst = new BaseResponse();
            const { word, part_of_speech } = req.body;
            if (!word || !part_of_speech) {
                BaseResponseInst.setValue(400, "Something is missing", null);
                return res.status(400).json(BaseResponseInst.buildResponse());
            }
            part_of_speech.toLowerCase();
            try {
                const response = yield axios_1.default.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
                // console.log(response);
                const definitions = response.data;
                //????????
                // const meaning = definitions[0].meanings.find((m: any) => m.partOfSpeech === part_of_speech);
                const meaning = [];
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
                BaseResponseInst.setValue(200, "Definition found", meaning);
                return res.status(200).json(BaseResponseInst.buildResponse());
            }
            catch (error) {
                BaseResponseInst.setValue(500, "An error occurred while fetching the definition", null);
                return res.status(500).json(BaseResponseInst.buildResponse());
            }
        });
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
// Example usage with Express
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
const api = new Api();
app.post('/createWord', api.createWord);
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
