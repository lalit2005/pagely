import axios from 'axios';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import toast from 'react-hot-toast';
import Loader from 'react-loader-spinner';
import useUrlWithSession from '@/lib/useUrlWithSession';

const Page = () => {
  const router = useRouter();
  const siteId = router.query.siteId;
  const urlWithSession = useUrlWithSession(
    '/api/updateSiteData/notion/password'
  );

  useEffect(() => {
    router.prefetch(`/notion-site/${siteId}`);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  axios
    .post(urlWithSession, {
      code: decodeURIComponent(router.query?.code),
      siteId: siteId,
      isPasswordProtected: true,
    })
    .then((res) => {
      if (res.data.success) {
        window.close();
      }
    })
    .catch((err) => {
      toast.error(
        'Your site could not be password proteced. Please try again. You may close this window now.'
      );
    });

  return (
    <div>
      {/* <DashboardNav /> */}
      <div className='flex flex-col items-center justify-center w-screen h-screen text-center'>
        <h1 className='text-4xl font-bold'>
          Your site is being password protected
        </h1>
        <p className='my-3 text-base text-gray-700'>
          This window will close automatically in a few seconds.
        </p>
        <div className='my-5'>
          <Loader height='60px' type='ThreeDots' color='gray' width='60px' />
        </div>
      </div>
    </div>
  );
};

export default Page;
