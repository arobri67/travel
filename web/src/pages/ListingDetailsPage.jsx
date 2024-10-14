import { useParams } from 'react-router-dom';

import DataRenderer from '@/components/DataRenderer';
import ListingDetailsCard from '@/components/ListingDetailsCard';
import useFetch from '@/hooks/useFetch';

const ListingDetailsPage = () => {
  const { _id } = useParams();

  const {
    data: listing,
    error,
    isLoading,
  } = useFetch(`/api/v1/listings/${_id}`);

  return (
    <section className='container mt-[300px] h-full py-4 sm:mt-[170px]'>
      <DataRenderer error={error} isLoading={isLoading}>
        <ListingDetailsCard listing={listing} />
      </DataRenderer>
    </section>
  );
};

export default ListingDetailsPage;
