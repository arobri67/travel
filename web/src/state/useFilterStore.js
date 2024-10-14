import { create } from 'zustand';

export const useFilterStore = create((set) => ({
  filters: {
    dates: undefined,
    guests: 0,
    search: '',
  },
  setFilters: (filters) => set((state) => ({ filters })),
}));
