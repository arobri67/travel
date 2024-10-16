import { DropdownMenuItem } from '@radix-ui/react-dropdown-menu';
import { UserRound } from 'lucide-react';
import { Link } from 'react-router-dom';

import api from '@/api';
import { useAuth } from '@/components/AuthProvider';
import ListingsFilter from '@/components/ListingsFilter';
import LogoTravel from '@/components/LogoTravel';
import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  Separator,
} from '@/components/ui/';

const NavBar = () => {
  const { setToken, user } = useAuth();

  const handleSignOut = async () => {
    try {
      await api.post('/api/v1/auth/logout');

      setToken(null);
    } catch {
      setToken(null);
    }
  };

  return (
    <>
      <nav className='fixed top-0 z-50 flex w-full flex-col gap-8 bg-white p-1'>
        <div className='container flex flex-row items-center justify-between px-2'>
          <div>
            <Link to='/'>
              <LogoTravel />
            </Link>
          </div>
          <div className='hidden sm:block'>
            <Link to='/new'>
              <Button
                className='rounded-xl text-base text-primary hover:bg-muted/30 hover:text-primary'
                variant='ghost'
              >
                Be part of travel.
              </Button>
            </Link>
          </div>
          <div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <UserRound className='h-12 w-12 cursor-pointer rounded-full p-2 text-primary hover:bg-muted' />
              </DropdownMenuTrigger>
              <DropdownMenuContent align='end'>
                <DropdownMenuItem className='cursor-pointer outline-none hover:bg-muted'>
                  <Link to={`/account/${user}`}>My Favorites</Link>
                </DropdownMenuItem>
                <DropdownMenuItem
                  className='cursor-pointer outline-none hover:bg-muted'
                  onClick={handleSignOut}
                >
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <div className='container flex flex-col justify-between gap-2 p-2 shadow-lg sm:w-full sm:flex-row sm:rounded-full sm:border sm:border-border md:max-w-4xl'>
          <ListingsFilter />
        </div>
        <Separator className='container' />
      </nav>
    </>
  );
};

export default NavBar;
