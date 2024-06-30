import { create } from "zustand";

interface Word {
  Word: string;
  part_of_speech: string;
}

interface StoreState {
  Words: Word[];
  addWord: (word: Word) => void;
  getWords: () => Word[];
}

const useStore = create<StoreState>((set, get) => ({
  Words: [],
  addWord: (word) => set((state) => ({ Words: [...state.Words, word] })),
  getWords: () => get().Words,
}));

export default useStore;
