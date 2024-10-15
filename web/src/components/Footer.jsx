import { Separator } from '@/components/ui';

const Footer = () => {
  return (
    <footer className='container mt-2 flex h-10 flex-col items-center justify-center'>
      <Separator className='w-full' />
      <span className='p-2'>Made with ❤️ by Arnaud</span>
    </footer>
  );
};

export default Footer;
