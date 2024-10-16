import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import api from '@/api';
import { useAuth } from '@/components/AuthProvider';
import LogoTravel from '@/components/LogoTravel';
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Input,
  Separator,
} from '@/components/ui';

const signInFormSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

const SignInForm = () => {
  const { setToken, setUser } = useAuth();

  const {
    formState: { errors, isSubmitting },
    handleSubmit,
    register,
    setError,
  } = useForm({
    resolver: zodResolver(signInFormSchema),
  });

  const onSubmit = async (data) => {
    try {
      const response = await api.post('/api/v1/auth', data);
      setToken(response.data.accessToken);
      setUser(response.data.userId);
    } catch (e) {
      console.error('Login error:', e);
      setError('root', {
        message: e.response?.data?.message || 'An error occurred',
      });
    }
  };

  return (
    <section className='flex flex-col items-center gap-8'>
      <LogoTravel />
      <Card className='mx-auto w-full shadow-md sm:w-[500px]'>
        <CardHeader>
          <h2 className='pb-4 text-center text-2xl'>Sign In to Your Account</h2>
          <p className='pb-4 text-center text-muted-foreground'>
            Access exclusive listings and manage your favorite listings.
            <span className='font-bold text-muted-foreground'>
              (Demo login: demo@travel.com, password: demotravel)
            </span>
          </p>
          <Separator />
        </CardHeader>
        <CardContent>
          <form className='flex flex-col gap-4'>
            <div>
              <Input
                {...register('email')}
                placeholder='Enter your email address'
              />
              {errors['email'] && (
                <div className='mt-2 text-sm text-red-500'>
                  {errors['email'].message}
                </div>
              )}
            </div>

            <div>
              <Input
                {...register('password')}
                type='password'
                placeholder='Enter your email password'
              />
              {errors['password'] && (
                <div className='mt-2 text-sm text-red-500'>
                  {errors['password'].message}
                </div>
              )}
            </div>

            <Button disabled={isSubmitting} onClick={handleSubmit(onSubmit)}>
              {isSubmitting ? 'Loading...' : 'Sign In'}
            </Button>

            {errors.root && (
              <div className='text-center text-sm text-red-500'>
                {errors.root.message}
              </div>
            )}
          </form>
        </CardContent>
      </Card>
    </section>
  );
};

export default SignInForm;
