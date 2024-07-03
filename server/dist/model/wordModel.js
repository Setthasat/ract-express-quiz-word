"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WordRepository = void 0;
class WordRepository {
    constructor() {
        this.WordDataDB = new Array;
    }
    createWord(word) {
        this.WordDataDB.push(word);
        console.log(this.WordDataDB);
        return word;
    }
    deleteWord(Wordname, part_of_speech) {
        const deletedData = {
            deletedWordName: Wordname,
            deletedPartOfSpeech: part_of_speech
        };
        try {
            for (let i = 0; i < this.WordDataDB.length; i++) {
                if (this.WordDataDB[i].word === Wordname && this.WordDataDB[i].part_of_speech === part_of_speech) {
                    delete this.WordDataDB[i];
                }
            }
        }
        catch (error) {
            throw error;
        }
        return deletedData;
    }
    //@ts-ignore
    findWord(Wordname) {
        let found = false;
        for (let i = 0; i < this.WordDataDB.length; i++) {
            if (this.WordDataDB[i].word === Wordname) {
                found = true;
                return this.WordDataDB[i];
            }
        }
        if (found === false) {
            return null;
        }
    }
    findAllWord() {
        const result = structuredClone(this.WordDataDB);
        return result;
    }
}
exports.WordRepository = WordRepository;
