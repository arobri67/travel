import { Separator } from '@/components/ui';

const Footer = () => {
  return (
    <footer className='container mt-2 h-10'>
      <Separator className='w-full' />
      <ul className=' flex justify-between p-2 text-sm sm:text-base'>
        <li>&copy; {new Date().getFullYear()} All rights reserved.</li>
        <li>Made with ❤️ by Arnaud</li>
        <li>GitHub Repo</li>
      </ul>
    </footer>
  );
};

export default Footer;
