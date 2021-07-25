import { GetStaticProps } from 'next';
import truncate from 'lodash.truncate';

import Navbar from '@/components/Navbar';
import prisma from '@/utils/prisma';

export default function Page({ sites }) {
  console.log(sites);

  return (
    <div>
      <Navbar />
      <div className='mx-10'>
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
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={ogImageUrl}
                      alt={siteName}
                      className='w-[80%] mx-auto mb-4 rounded-lg group-hover:scale-105 object-cover transform transition-all duration-500 border border-gray-300'
                    />
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
              href={'https://pagely.site'}
              target='_blank'
              rel='noopener noreferrer'>
              <div className='max-w-sm px-3 mx-auto my-3 text-center transition-all duration-500 rounded-lg py-7 hover:border border-bluegray-200 hover:shadow-lg group'>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src='/add-new-site.png'
                  alt='Click to add new site'
                  className='w-[80%] mx-auto mb-4 rounded-lg group-hover:scale-105 object-cover transform transition-all duration-500 border border-gray-300'
                />
                <h3 className='font-medium'>Add New Site</h3>
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
      ogImageUrl: true,
      subdomain: true,
      siteName: true,
    },
  });

  return {
    props: {
      sites,
    },
    revalidate: 1800,
  };
};
