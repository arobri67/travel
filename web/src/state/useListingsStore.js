import { startOfDay, addDays } from 'date-fns';
import { create } from 'zustand';

import api from '@/api';

export const useListingStore = create((set, get) => ({
  listings: [],
  favoriteListingIds: [],
  status: 'idle',
  error: null,
  fetchListings: async (options) => {
    set({ status: 'loading', error: null });
    try {
      // Fetch listings
      const startOfToday = startOfDay(new Date());
      const response = await api.get('/api/v1/listings', options);

      const transformedListings = response.data.map((listing) => {
        return {
          ...listing,
          availability: {
            from: startOfToday,
            to: addDays(startOfToday, listing.addto),
          },
        };
      });
      set({ listings: transformedListings, status: 'succeeded' });
      // Fetch favorite listings for a user
      const favoriteResponse = await api.get('/api/v1/users/favorites');
      set({ favoriteListingIds: favoriteResponse.data });
    } catch (error) {
      set({ status: 'failed', error: error });
    }
  },
  addFavoriteListing: async (listingId) => {
    const { favoriteListingIds } = get();
    if (!favoriteListingIds.includes(listingId)) {
      try {
        await api.patch('/api/v1/users/favorites/add', { listingId });
        set({ favoriteListingIds: [...favoriteListingIds, listingId] });
      } catch (error) {
        console.error('Failed to add favorite listing:', error);
      }
    }
  },

  removeFavoriteListing: async (listingId) => {
    const { favoriteListingIds } = get();
    try {
      await api.patch('/api/v1/users/favorites/remove', { listingId });
      set({
        favoriteListingIds: favoriteListingIds.filter((id) => id !== listingId),
      });
    } catch (error) {
      console.error('Failed to remove favorite listing:', error);
    }
  },
}));
