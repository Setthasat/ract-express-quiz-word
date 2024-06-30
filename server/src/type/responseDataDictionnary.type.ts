
export type ResponseDataDictionaryApi = {
    word: string,
    phonetic: string,
    phonetics: Array<phoneticsType>;
    meanings: Array<meaningtype>;
    license: {
        name: string,
        url: string;
    };
    sourceUrls: Array<string>;
};

type phoneticsType = {
    text: string,
    audio: string;
    sourceUrl?: string;
    license?: {
        name: string;
        url: string;
    };
};

type meaningtype = {
    partOfSpeech: string,
    definitions: Array<definitionstype>;
    synonyms: Array<string>;
    antonyms: Array<string>;
};

type definitionstype = {
    definition: string,
    synonyms: Array<any>;
    antonyms: Array<any>;
};