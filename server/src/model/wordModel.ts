import { WordDataType, DeletedDataType } from "../type/wordModel";

interface WordRepositoryInterface {
    createWord(word: WordDataType): WordDataType;
    deleteWord(Wordname: string, part_of_speech: string): DeletedDataType,
    findWord(Wordname: string, part_of_speech: string): WordDataType | null;
    findAllWord(): Array<WordDataType>;
}

export class WordRepository implements WordRepositoryInterface {

    private WordDataDB: Array<WordDataType>;

    constructor() {
        this.WordDataDB = new Array<WordDataType>;
    }

    createWord(word: WordDataType): WordDataType {
        this.WordDataDB.push(word);
        console.log(this.WordDataDB);
        return word;
    }

    deleteWord(Wordname: string, part_of_speech: string): DeletedDataType {

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
        } catch (error) {
            throw error;
        }
        return deletedData;
    }

    //@ts-ignore
    findWord(Wordname: string, part_of_speech: string): WordDataType | null {
        let found = false;
        for (let i = 0; i < this.WordDataDB.length; i++) {
            if (this.WordDataDB[i].word === Wordname && this.WordDataDB[i].part_of_speech === part_of_speech) {
                found = true;
                console.log("heelo");
                return this.WordDataDB[i];
            }
        }
        if (found === false) {
            return null;
        }
    }

    findAllWord(): Array<WordDataType> {
        const result = structuredClone(this.WordDataDB);
        return result;
    }
}

