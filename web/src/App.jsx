import { Outlet } from 'react-router-dom';

import { useAuth } from '@/components/AuthProvider';
import Footer from '@/components/Footer';
import NavBar from '@/components/NavBar';

function App() {
  const { token } = useAuth();

  return (
    <>
      <header>{token && <NavBar />}</header>
      <main className='flex min-h-[calc(100vh-4rem-1px)] flex-col'>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export default App;
