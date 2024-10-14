import { Link } from 'react-router-dom';

import { Button, Card } from '@/components/ui';

const NotFoundPage = () => {
  return (
    <section className='container flex h-screen w-screen items-center justify-center py-4 text-center'>
      <Card className='p-8 shadow-md'>
        <h1>Page not found</h1>
        <p className='pb-2'>
          Unfortunately, the page that you're looking for does not exist.
        </p>
        <Button asChild>
          <Link to='/' replace>
            Back to Home
          </Link>
        </Button>
      </Card>
    </section>
  );
};

export default NotFoundPage;
