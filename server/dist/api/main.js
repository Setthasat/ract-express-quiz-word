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
    constructor(WordRepositoryInst) {
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
                const wordData = {
                    word: word,
                    part_of_speech: part_of_speech,
                    definition: meaning[0]
                };
                const exitWord = this.WordRepositoryInst.findWord(word, part_of_speech);
                if (exitWord === null) {
                    try {
                        yield this.WordRepositoryInst.createWord(wordData);
                    }
                    catch (error) {
                        console.log(error);
                    }
                    BaseResponseInst.setValue(200, "Create word success", wordData);
                    return res.status(200).json(BaseResponseInst.buildResponse());
                }
                else {
                    BaseResponseInst.setValue(500, `${word} is already exit`, null);
                    return res.status(500).json(BaseResponseInst.buildResponse());
                }
            }
            catch (error) {
                BaseResponseInst.setValue(500, "Cannot create word", null);
                return res.status(500).json(BaseResponseInst.buildResponse());
            }
        });
        this.getAllWords = (req, res) => __awaiter(this, void 0, void 0, function* () {
            //@ts-ignore
            const BaseResponseInst = new BaseResponse();
            const words = this.WordRepositoryInst.findAllWord();
            BaseResponseInst.setValue(200, "success", words);
            return res.status(200).json(BaseResponseInst.buildResponse());
        });
        this.WordRepositoryInst = WordRepositoryInst;
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
