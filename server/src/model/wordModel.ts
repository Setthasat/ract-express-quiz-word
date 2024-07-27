import { WordDataType, DeletedDataType } from "../type/wordModel";

interface WordRepositoryInterface {
    createWord(word: WordDataType): WordDataType;
    deleteWord(Wordname: string, part_of_speech: string): DeletedDataType;
    findWord(Wordname: string, part_of_speech: string): WordDataType | null;
    findAllWord(): Array<WordDataType>;
    findWordByLength(): Array<WordDataType>;
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

        let found = false;
        for (let i = 0; i < this.WordDataDB.length; i++) {
            if (this.WordDataDB[i].word === Wordname && this.WordDataDB[i].part_of_speech === part_of_speech) {
                this.WordDataDB.splice(i, 1);
                found = true;
                break;
            }
        }

        if (!found) {
            console.log(`${Wordname} is not found`)
        }

        return deletedData;
    }

    findWord(Wordname: string, part_of_speech: string): WordDataType | null {
        for (let i = 0; i < this.WordDataDB.length; i++) {
            if (this.WordDataDB[i].word === Wordname && this.WordDataDB[i].part_of_speech === part_of_speech) {
                return this.WordDataDB[i];
            }
        }
        return null;
    }

    findAllWord(): Array<WordDataType> {
        const result = structuredClone(this.WordDataDB);
        return result;
    }

    //@ts-ignore
    findWordByLength(choichLength): Array<WordDataType> | null {
        const shuffledIndex = [] 
        let newIndexes : Array<number> = [] 
        if(choichLength > this.WordDataDB.length){
            return null
        }
        while(choichLength !== newIndexes.length){
            const randomIndex = Math.floor(Math.random() * choichLength)
            //@ts-ignore
            if(!newIndexes.includes(randomIndex)){
                newIndexes.push(randomIndex)
            }
        }

        for(let i = 0; i < newIndexes.length ; i++){
            shuffledIndex.push(this.WordDataDB[newIndexes[i]])
        }

        console.log(shuffledIndex)
        
        return shuffledIndex
    }
}
