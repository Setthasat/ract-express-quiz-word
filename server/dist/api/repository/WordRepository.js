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
exports.WordRepository = void 0;
const User_1 = __importDefault(require("../../model/User"));
class WordRepository {
    constructor() {
        // Find all words of a user (no need for user_id here if it's inferred)
        this.findAllWords = (user_id) => __awaiter(this, void 0, void 0, function* () {
            const user = yield User_1.default.findOne({ user_id });
            if (user && user.words) {
                console.log("Words for user:", user.words); // Verify that words are correctly retrieved
                return user.words;
            }
            return [];
        });
    }
    // Create word (requires user_id to associate the word with the user)
    createWord(user_id, wordData) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield User_1.default.findOne({ user_id });
            if (!user) {
                console.log(`User with ID ${user_id} not found`);
                return null;
            }
            const existingWord = user.words.find(w => w.word.toLowerCase() === wordData.word.toLowerCase() &&
                w.part_of_speech.toLowerCase() === wordData.part_of_speech.toLowerCase());
            if (existingWord) {
                console.log(`Word "${wordData.word}" already exists for user with ID ${user_id}`);
                return null;
            }
            user.words.push(wordData);
            yield user.save();
            return wordData;
        });
    }
    // Delete word (requires user_id to delete word)
    deleteWord(user_id, word, part_of_speech) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield User_1.default.findOne({ user_id });
            if (!user) {
                console.log(`User with ID ${user_id} not found`);
                return null;
            }
            const wordIndex = user.words.findIndex(w => w.word.toLowerCase() === word.toLowerCase() &&
                w.part_of_speech.toLowerCase() === part_of_speech.toLowerCase());
            if (wordIndex === -1) {
                console.log(`Word "${word}" with part of speech "${part_of_speech}" not found for user with ID ${user_id}`);
                return null;
            }
            const deletedWord = user.words.splice(wordIndex, 1);
            yield user.save();
            return { deletedWordName: word, deletedPartOfSpeech: part_of_speech };
        });
    }
    // Find a specific word for a user (requires user_id)
    findExistWord(user_id, word, part_of_speech) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield User_1.default.findOne({ user_id });
            if (!user) {
                console.log(`User with ID ${user_id} not found`);
                return null;
            }
            const foundWord = user.words.find(w => w.word.toLowerCase() === word.toLowerCase() &&
                w.part_of_speech.toLowerCase() === part_of_speech.toLowerCase());
            return foundWord || null;
        });
    }
    // Find all words by user_id (this can be inferred as well)
    findAllWordsByUserId(user_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield User_1.default.findOne({ user_id });
            if (!user) {
                console.log(`User with ID ${user_id} not found`);
                return [];
            }
            return user.words;
        });
    }
}
exports.WordRepository = WordRepository;
