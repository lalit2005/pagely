import Image from 'next/image';
import { zodResolver } from '@hookform/resolvers/zod';

import InfoPopover from '@/components/popovers/InfoPopover';
import TweetTitleImage from '@/public/popover-images/og-title.png';
import TweetDescImage from '@/public/popover-images/og-desc.png';
import OgImage from '@/public/popover-images/og-image.png';
import NoOgImage from '@/public/no-og-image.png';

import { NotionSeoSettings } from 'types/types';
import { newNotionSiteSchemata } from '@/lib/notion/newNotionSiteSchema';

import { useClerkSWR } from '@/lib/fetcher';
import { notionSites } from '@prisma/client';

import SidebarLayout from '@/layouts/SidebarLayout';
import Skeleton from 'react-loading-skeleton';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import TwitterPreview from '@/components/notion/TwitterPreview';

const Page = () => {
  const router = useRouter();
  const { data } = useClerkSWR<notionSites>(
    `/api/getSiteData/notion/?siteId=${router.query.notionId}`
  );

  const [isImageLoading, setIsImageLoading] = useState<boolean>(true);

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<NotionSeoSettings>({
    resolver: zodResolver(newNotionSiteSchemata),
    defaultValues: {
      ogImageUrl: data?.ogImageUrl,
      siteName: data?.siteName,
      siteDesc: data?.siteDesc,
    },
  });

  return (
    <div>
      <SidebarLayout activeTab='seo'>
        <h1 className='text-4xl font-extrabold'>
          {data?.siteName || 'Just a second...'}
        </h1>
        <p className='mt-4 text-gray-800 font-base'>
          {data?.siteDesc ||
            'Crunching the data for you. Please give a second.'}
        </p>
        <div className='my-5'>
          <h2 className='mb-5 text-2xl font-bold'>Twitter Preview</h2>
          <TwitterPreview data={data} />
        </div>
        <form>
          <div className='mt-8'>
            <hr className='my-10 text-gray-400' />
            <h2 className='mb-5 text-2xl font-bold'>OG Image</h2>
            <div className='max-w-[600px] max-h-[315px]'>
              {data?.ogImageUrl === 'https://no-og.image' ? (
                <Image
                  alt='No OG Image'
                  src={NoOgImage}
                  onLoad={() => setIsImageLoading(false)}
                  className='border border-gray-400 rounded'
                />
              ) : (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={
                    data?.ogImageUrl ||
                    'https://ogimage.glitch.me/i/' +
                      encodeURIComponent(data?.siteName)
                  }
                  alt={data?.siteName}
                  className='object-cover rounded-md'
                  onLoad={() => setIsImageLoading(false)}
                />
              )}
              {isImageLoading && <Skeleton width='600px' height='315px' />}
            </div>
            <div>
              <label className='block mt-3'>
                <span className='mt-1 text-sm text-gray-600'>
                  If left blank, the OG Image will be automatically generated
                  from site name and Notion page&apos;s title!!
                </span>
                <InfoPopover content='This is the image that will appear in the OG cards and Twitter cards. 1200x630 is the recommended dimension for the OG image. This can boost your conversion rate by upto 2 times!!'>
                  <Image
                    placeholder='blur'
                    src={OgImage}
                    alt=''
                    className='inline-block w-full rounded'
                  />
                </InfoPopover>
                <div className='flex items-center'>
                  <input
                    type='text'
                    className='inline-block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200'
                    placeholder='https://picsum.photos/1200/630'
                    {...register('ogImageUrl')}
                  />
                </div>
                <p className='mt-2 text-sm text-red-500'>
                  {errors.ogImageUrl && errors.ogImageUrl.message}
                </p>
              </label>
            </div>
          </div>
          <hr className='my-10 text-gray-200' />

          <div>
            <h2 className='mb-5 text-2xl font-bold'>OG Title</h2>
            <p className='text-gray-800'>{data?.siteName}</p>
            <div>
              <label className='block mt-3'>
                <span className='mt-1 text-sm text-gray-600'>
                  This name will be used for generating OG title
                </span>
                <InfoPopover content='This is the name of your website. It is also the title in Twitter cards and OG cards.'>
                  <Image
                    placeholder='blur'
                    src={TweetTitleImage}
                    alt=''
                    className='inline-block w-full rounded'
                  />
                </InfoPopover>
                <div className='flex items-center'>
                  <input
                    type='text'
                    className='inline-block w-full mt-1 mr-1 border-gray-300 rounded-md shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200'
                    placeholder='Blog - Elon'
                    {...register('siteName')}
                  />
                </div>
                <p className='mt-2 text-sm text-red-500'>
                  {errors.siteName && errors.siteName.message}
                </p>
              </label>
            </div>
          </div>
          <hr className='my-10 text-gray-200' />

          <div className='mb-5'>
            <h2 className='mb-5 text-2xl font-bold'>OG Description</h2>
            <p className='text-gray-800'>{data?.siteDesc}</p>
            <div>
              <label className='block mt-3'>
                <span className='mt-1 text-sm text-gray-600'>
                  This name will be used for generating OG and Twitter
                  descriptions
                </span>

                <InfoPopover content='This is the description of your website. It is also the description in Twitter cards and OG cards.'>
                  <Image
                    placeholder='blur'
                    src={TweetDescImage}
                    alt=''
                    className='inline-block w-full rounded'
                  />
                </InfoPopover>
                <textarea
                  className='block w-full mt-1 text-base border-gray-300 rounded-md shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50'
                  rows={4}
                  placeholder='Read my blog to...'
                  {...register('siteDesc')}
                />
                <p className='mt-2 text-sm text-red-500'>
                  {errors.siteDesc && errors.siteDesc.message}
                </p>
              </label>
            </div>
          </div>
          <div>
            <button
              type='submit'
              className='h-10 px-3 mb-10 bg-gray-800 rounded shadow-md text-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 hover:bg-gray-700'>
              Save Changes
            </button>
          </div>
        </form>
      </SidebarLayout>
    </div>
  );
};

export default Page;
