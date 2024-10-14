import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAuth } from '@/components/AuthProvider';
import SignInForm from '@/components/SignInForm';

const SignInPage = () => {
  const { token } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      navigate('/', { replace: true });
    }
  }, [navigate, token]);

  return (
    <section className='container flex h-full flex-1 items-center justify-center py-4'>
      <SignInForm />
    </section>
  );
};

export default SignInPage;
