import { useMemo } from 'react';
import { useParams } from 'react-router-dom';

import DataRenderer from '@/components/DataRenderer';
import ListingList from '@/components/ListingList';
import UserProfile from '@/components/UserProfile';
import useFetch from '@/hooks/useFetch';
import { useListingStore } from '@/state/useListingsStore';

const AccountPage = () => {
  const { listings, favoriteListingIds } = useListingStore();

  const favoriteListings = useMemo(
    () =>
      listings.filter((listing) => favoriteListingIds.includes(listing._id)),
    [listings, favoriteListingIds],
  );

  // const { data, error, isLoading } = useFetch(`/api/v1/users/${user}`);

  return (
    <>
      <section className='container mt-[270px] h-full py-4 sm:mt-[170px]'>
        <DataRenderer>
          {/* <UserProfile data={data} /> */}
          <ListingList listings={favoriteListings} />
        </DataRenderer>
      </section>
    </>
  );
};

export default AccountPage;
