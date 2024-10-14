import ListingCard from '@/components/ListingCard';

const ListingList = ({ listings }) => {
  return (
    <ul className='container mt-8 flex flex-wrap justify-center gap-8'>
      {listings.length > 0 ? (
        listings.map((listing) => (
          <ListingCard key={listing._id} listing={listing} />
        ))
      ) : (
        <p>No listings found.</p>
      )}
    </ul>
  );
};

export default ListingList;
