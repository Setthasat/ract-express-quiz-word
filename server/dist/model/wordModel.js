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
        let found = false;
        for (let i = 0; i < this.WordDataDB.length; i++) {
            if (this.WordDataDB[i].word === Wordname && this.WordDataDB[i].part_of_speech === part_of_speech) {
                this.WordDataDB.splice(i, 1);
                found = true;
                break;
            }
        }
        if (!found) {
            console.log(`${Wordname} is not found`);
        }
        return deletedData;
    }
    findWord(Wordname, part_of_speech) {
        for (let i = 0; i < this.WordDataDB.length; i++) {
            if (this.WordDataDB[i].word === Wordname && this.WordDataDB[i].part_of_speech === part_of_speech) {
                return this.WordDataDB[i];
            }
        }
        return null;
    }
    findAllWord() {
        const result = structuredClone(this.WordDataDB);
        return result;
    }
    //@ts-ignore
    findWordByLength(choichLength) {
        const shuffledIndex = [];
        let newIndexes = [];
        if (choichLength > this.WordDataDB.length) {
            return null;
        }
        while (choichLength !== newIndexes.length) {
            const randomIndex = Math.floor(Math.random() * choichLength);
            //@ts-ignore
            if (!newIndexes.includes(randomIndex)) {
                newIndexes.push(randomIndex);
            }
        }
        for (let i = 0; i < newIndexes.length; i++) {
            shuffledIndex.push(this.WordDataDB[newIndexes[i]]);
        }
        console.log(shuffledIndex);
        return shuffledIndex;
    }
}
exports.WordRepository = WordRepository;
