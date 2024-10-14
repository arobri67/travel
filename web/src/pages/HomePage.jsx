import { useEffect, useMemo } from 'react';

import DataRenderer from '@/components/DataRenderer';
import ListingList from '@/components/ListingList';
import { useFilterStore } from '@/state/useFilterStore';
import { useListingStore } from '@/state/useListingsStore';

const HomePage = () => {
  const { filters } = useFilterStore();
  const { listings, fetchListings, status, error } = useListingStore();

  const fetchOptions = useMemo(() => ({ params: filters }), [filters]);

  useEffect(() => {
    fetchListings(fetchOptions);
  }, [fetchOptions, fetchListings]);

  return (
    <section className='mb-3 mt-[270px] h-full sm:mt-[170px]'>
      <DataRenderer error={error} isLoading={status === 'loading'}>
        <ListingList listings={listings} />
      </DataRenderer>
    </section>
  );
};

export default HomePage;
