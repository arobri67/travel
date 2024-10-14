import { Spinner } from '@/components/ui';

const DataRenderer = ({ children, error, isLoading }) => {
  if (isLoading) {
    return (
      <div className='flex h-screen justify-center'>
        <Spinner size='lg' />
      </div>
    );
  }

  if (error) {
    return (
      <div className='min-h-screen  text-center'>{error.response.message}</div>
    );
  }

  return children;
};

export default DataRenderer;
