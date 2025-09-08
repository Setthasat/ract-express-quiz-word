import User, { IUser, IWord } from "../../model/User";

export class WordRepository {
  // Create word (requires user_id to associate the word with the user)
  async createWord(user_id: string, wordData: IWord): Promise<IWord | null> {
    const user = await User.findOne({ user_id });
    if (!user) {
      console.log(`User with ID ${user_id} not found`);
      return null;
    }

    const existingWord = user.words.find(
      (w: IWord) =>
        w.word.toLowerCase() === wordData.word.toLowerCase() &&
        w.part_of_speech.toLowerCase() === wordData.part_of_speech.toLowerCase()
    );
    if (existingWord) {
      console.log(
        `Word "${wordData.word}" already exists for user with ID ${user_id}`
      );
      return null;
    }

    user.words.push(wordData);
    await user.save();
    return wordData;
  }

  // Delete word (requires user_id to delete word)
  async deleteWord(
    user_id: string,
    word: string,
    part_of_speech: string
  ): Promise<{ deletedWordName: string; deletedPartOfSpeech: string } | null> {
    const user = await User.findOne({ user_id });
    if (!user) {
      console.log(`User with ID ${user_id} not found`);
      return null;
    }

    const wordIndex = user.words.findIndex(
      (w) =>
        w.word.toLowerCase() === word.toLowerCase() &&
        w.part_of_speech.toLowerCase() === part_of_speech.toLowerCase()
    );
    if (wordIndex === -1) {
      console.log(
        `Word "${word}" with part of speech "${part_of_speech}" not found for user with ID ${user_id}`
      );
      return null;
    }

    const deletedWord = user.words.splice(wordIndex, 1);
    await user.save();

    return { deletedWordName: word, deletedPartOfSpeech: part_of_speech };
  }

  // Find a specific word for a user (requires user_id)
  async findExistWord(
    user_id: string,
    word: string,
    part_of_speech: string
  ): Promise<IWord | null> {
    const user = await User.findOne({ user_id });
    if (!user) {
      console.log(`User with ID ${user_id} not found`);
      return null;
    }

    const foundWord = user.words.find(
      (w) =>
        w.word.toLowerCase() === word.toLowerCase() &&
        w.part_of_speech.toLowerCase() === part_of_speech.toLowerCase()
    );
    return foundWord || null;
  }

  // Find all words of a user (no need for user_id here if it's inferred)
  findAllWords = async (user_id: string) => {
    const user = await User.findOne({ user_id });
    if (user && user.words) {
      console.log("Words for user:", user.words); // Verify that words are correctly retrieved
      return user.words;
    }
    return [];
  };

  // Find all words by user_id (this can be inferred as well)
  async findAllWordsByUserId(user_id: string): Promise<IWord[]> {
    const user = await User.findOne({ user_id });
    if (!user) {
      console.log(`User with ID ${user_id} not found`);
      return [];
    }

    return user.words;
  }
}
