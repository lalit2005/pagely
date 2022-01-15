import { GetStaticProps } from 'next';
import truncate from 'lodash.truncate';

import Navbar from '@/components/Navbar';
import prisma from '@/utils/prisma';
import Skeleton from 'react-loading-skeleton';

export default function Page({ sites }) {
  console.log(sites);

  return (
    <div>
      <Navbar />
      <div className='mx-10'>
        <div className='my-8 text-center'>
          <h1 className='text-4xl font-extrabold'>Showcase</h1>
          <h2 className='mt-2 text-gray-600 font-base'>
            Beautiful websites created with Pagely
          </h2>
        </div>
        <div className='flex flex-row flex-wrap px-10 mt-10 justify-evenly'>
          {/* @ts-ignore */}
          {sites.map(({ siteName, subdomain, ogImageUrl }) => {
            return (
              <div key={siteName}>
                <a
                  href={'https://' + subdomain + '.pagely.site'}
                  target='_blank'
                  rel='noopener noreferrer'>
                  <div className='max-w-sm px-3 mx-auto my-3 text-center transition-all duration-500 rounded-lg py-7 hover:border border-bluegray-200 hover:shadow-lg group'>
                    {(
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={ogImageUrl}
                        alt={siteName}
                        width='80%'
                        height={'auto'}
                        className='w-[80%] mx-auto mb-4 rounded-lg group-hover:scale-105 object-cover transform transition-all duration-500 border border-gray-300'
                      />
                    ) || (
                      <Skeleton className='w-[80%] mx-auto mb-4 rounded-lg group-hover:scale-105 object-cover transform transition-all duration-500 border border-gray-300' />
                    )}
                    <h3 className='font-medium'>
                      {truncate(siteName, { length: 30 })}
                    </h3>
                  </div>
                </a>
              </div>
            );
          })}
          <div>
            <a
              href={
                'https://guides.pagely.site/a1e56c779b61400b818bb572652ca2ce'
              }
              target='_blank'
              rel='noopener noreferrer'>
              <div className='max-w-sm px-3 mx-auto my-3 text-center transition-all duration-500 rounded-lg py-7 hover:border border-bluegray-200 hover:shadow-lg group'>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src='/add-new-site.png'
                  alt='Click to add new site'
                  className='w-[80%] mx-auto mb-4 rounded-lg group-hover:scale-105 object-cover transform transition-all duration-500 border border-gray-300'
                />
                <h3 className='font-medium'>Add Your Site</h3>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const sites = await prisma.notionSites.findMany({
    where: {
      inShowcase: true,
    },
    select: {
      siteName: true,
      subdomain: true,
      ogImageUrl: true,
      id: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  return {
    props: {
      sites,
    },
    revalidate: 1800,
  };
};
