const UserProfile = ({ data }) => {
  return (
    <>
      <h2 className='mb-4 text-center text-3xl font-semibold tracking-tighter'>
        Favorite Listings of{' '}
        <span className=' text-primary'>
          {data.firstName} {data.lastName}
        </span>
      </h2>
    </>
  );
};

export default UserProfile;
