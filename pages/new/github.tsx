import Image from 'next/image';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import toast, { Toaster } from 'react-hot-toast';
import { useRouter } from 'next/router';

import InfoPopover from '@/components/popovers/InfoPopover';
import GitHubUrlImage from '@/public/popover-images/gh-url.png';
import SubdomainImage from '@/public/popover-images/subdomain.png';

import { DevTool } from '@hookform/devtools';
import MainLayout from '@/layouts/MainLayout';
import { NewGitHubSiteFormValues } from 'types/types';
import newGitHubSiteSchema from '@/lib/github/newGitHubSiteSchema';
import { useState } from 'react';
import Loader from 'react-loader-spinner';
import { useEffect } from 'react';
import useUrlWithSession from '@/lib/useUrlWithSession';
import axios from 'axios';

const GitHub = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const urlWithSession = useUrlWithSession('/api/new/github');
  const router = useRouter();

  useEffect(() => {
    router.prefetch('/dashboard');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const {
    handleSubmit,
    register,
    control,
    formState: { errors },
  } = useForm<NewGitHubSiteFormValues>({
    resolver: zodResolver(newGitHubSiteSchema),
  });

  const handleFormSubmit = async (siteData: NewGitHubSiteFormValues) => {
    setLoading(true);
    axios
      .post(urlWithSession, {
        subdomain: siteData.subdomain,
        repoUrl: siteData.repoUrl,
        siteName: siteData.siteName,
      })
      .then((res) => {
        if (res.data.success) {
          setLoading(false);
          toast.success('Site created successfully');
          router.push('/dashboard');
        } else {
          setLoading(false);
          toast.error('There was an error creating your site');
        }
      })
      .catch(() => {
        setLoading(false);
        toast.error('There was an error creating your site');
      });
  };

  return (
    <MainLayout>
      {process.env.NODE_ENV !== 'production' && (
        <DevTool control={control} placement='top-right' />
      )}
      <div>
        <div className='max-w-5xl mx-auto'>
          <h1 className='mt-10 text-4xl font-bold'>
            That&apos;s. Just fill out this quick form now
          </h1>
          <form
            className='max-w-sm mt-10'
            onSubmit={handleSubmit(handleFormSubmit)}>
            <label className='block mt-10'>
              <span className='text-gray-700'>Site Name</span>
              <InfoPopover content='Name of your site. If OG image URL is not provided, this will be used for generating OG images'>
                <Image
                  placeholder='blur'
                  src={GitHubUrlImage}
                  alt=''
                  className='inline-block w-full rounded'
                />
              </InfoPopover>
              <input
                type='text'
                className='block w-full mt-1 text-base border-gray-300 rounded-md shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50'
                placeholder='My awesome site'
                {...register('siteName', { required: true })}
              />
              <p className='mt-2 text-sm text-red-500'>
                {errors.siteName && errors.siteName.message}
              </p>
            </label>
            <label className='block mt-10'>
              <span className='mb-2 text-gray-700'>
                Subdomain (URL for your website)
                <InfoPopover content='This is the subdomain of your website. It is the part of the URL before the domain name. For example, in the image below thesubdomain is "one". (And its free!!)'>
                  <Image
                    placeholder='blur'
                    src={SubdomainImage}
                    alt='Subdomain'
                    className='inline-block w-full rounded'
                  />
                </InfoPopover>
              </span>
              <p className='mt-1 text-sm text-gray-600'>
                You cannot change this later
              </p>
              <div className='flex items-baseline'>
                <input
                  type='text'
                  className='inline-block w-full mt-1 border-gray-300 shadow-sm rounded-l-md focus:border-blue-300 focus:ring focus:ring-blue-200'
                  placeholder='elon'
                  {...register('subdomain', { required: true })}
                />
                <span className='inline-block py-[0.5rem] select-none border-t border-b border-r pl-1 pr-2 bg-gray-100 rounded-r-md'>
                  .pagely.site
                </span>
              </div>
              <p className='mt-2 text-sm text-red-500'>
                {errors.subdomain && errors.subdomain.message}
              </p>
            </label>
            <label className='block mt-10'>
              <span className='text-gray-700'>Repository URL</span>
              <InfoPopover content='This repo should contain a pagely.json file. It will be used to generate the website. Learn more about the schema at https://pagely.site/guides/github'>
                <Image
                  placeholder='blur'
                  src={GitHubUrlImage}
                  alt=''
                  className='inline-block w-full rounded'
                />
              </InfoPopover>
              <p className='mt-1 mb-2 text-sm text-gray-600'>
                The URL of your GitHub repo which contains a{' '}
                <code className='p-[3px] bg-gray-100 rounded'>pagely.json</code>
              </p>
              <input
                type='text'
                className='block w-full mt-1 text-base border-gray-300 rounded-md shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50'
                placeholder='https://github.com/username/repo'
                {...register('repoUrl')}
              />
              <p className='mt-1 mb-2 text-sm text-gray-600'>
                Support for private repos coming soon!
              </p>
              <p className='mt-2 text-sm text-red-500'>
                {errors.repoUrl && errors.repoUrl.message}
              </p>
            </label>
            <button
              type='submit'
              className='inline-flex items-center justify-center my-10 text-lg font-medium text-white border border-transparent rounded shadow-md bg-custom-blue hover:bg-blue-700 focus:outline-none focus:ring-blue-500 focus:ring-2 focus:ring-offset-2'>
              {loading ? (
                <span className={`px-5 py-[6px] ${loading && 'py-[11px]'}`}>
                  <Loader height={18} width={200} color='#fff' type='Puff' />
                </span>
              ) : (
                <span className='px-5 py-[6px] '>
                  Get the website now -&gt;
                </span>
              )}
            </button>
          </form>
        </div>
      </div>
      <Toaster />
    </MainLayout>
  );
};

export default GitHub;
