import { SignedIn, useClerk } from '@clerk/clerk-react';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

const RedirectIfUser = () => {
  const router = useRouter();

  const { user } = useClerk();

  useEffect(() => {
    router.prefetch('/dashboard');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (user) {
    router.push('/dashboard');
  }

  return <></>;
};

export default RedirectIfUser;
