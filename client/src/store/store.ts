import create from 'zustand';

interface AppState {
  isPopupOpen: boolean;
  togglePopup: () => void;
}

export const useStore = create<AppState>((set) => ({
  isPopupOpen: false,
  togglePopup: () => set((state) => ({ isPopupOpen: !state.isPopupOpen })),
}));
