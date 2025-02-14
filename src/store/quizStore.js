import { create } from 'zustand';

const useQuizStore = create((set) => ({
  errors: 0,
  addError: () => set((state) => ({ errors: state.errors + 1 })),
  resetErrors: () => set({ errors: 0 }),
}));

export default useQuizStore;
