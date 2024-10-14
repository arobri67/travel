import { Heart } from 'lucide-react';
import { useMemo } from 'react';

import { Button } from '@/components/ui';
import { cn } from '@/lib/utils/cn';
import { useListingStore } from '@/state/useListingsStore';
const ListingFavoriteButton = ({ className, listing }) => {
  const { favoriteListingIds, addFavoriteListing, removeFavoriteListing } =
    useListingStore();

  const isFavorite = useMemo(
    () => favoriteListingIds.includes(listing._id),
    [listing, favoriteListingIds],
  );

  return (
    <Button
      className={className}
      variant='outline'
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();

        if (isFavorite) {
          removeFavoriteListing(listing._id);
        } else {
          addFavoriteListing(listing._id);
        }
      }}
    >
      <Heart
        className={cn('h-4 w-4', { 'fill-primary text-primary': isFavorite })}
      />
    </Button>
  );
};

export default ListingFavoriteButton;
