import SiteCard from '@/components/dashboard/SiteCard';
import { useClerkSWR } from '@/lib/fetcher';
import { notionSites } from '@prisma/client';
import MainLayout from '@/layouts/MainLayout';
import Skeleton from 'react-loading-skeleton';
import Link from 'next/link';
import { ShowcaseWebsites } from 'types/types';
import truncate from 'lodash.truncate';
import { HiOutlinePlusCircle } from 'react-icons/hi';

const Dashboard = () => {
  const { data, error } = useClerkSWR<notionSites[]>('/api/getAllSites/notion');
  const { data: showcaseWebsites } = useClerkSWR<ShowcaseWebsites[]>(
    '/api/getShowcaseWebsites'
  );
  return (
    <MainLayout>
      <div>
        <div className='max-w-5xl mx-auto'>
          <h1 className='text-4xl font-bold text-center lg:text-left md:relative lg:left-10'>
            Your websites
          </h1>
          <div className='flex'>
            <div
              className='flex-1 mr-2 mt-10 h-[70vh] overflow-y-scroll pb-5'
              id='websites'>
              {data?.map((site) => (
                // @ts-ignore
                <SiteCard key={site.id} siteData={site} />
              ))}
              {error && <h1>An error occured</h1>}
              {!error && !data && (
                <Skeleton
                  width='384px'
                  height='130px'
                  count={3}
                  className='!block mb-8 mx-auto'
                />
              )}
            </div>
            <div className='sticky top-0 flex-1 hidden mt-10 lg:block'>
              <div className='text-center transition-all bg-blue-100 border border-blue-300 rounded shadow-sm hover:bg-blue-200'>
                <Link href='/new'>
                  <a className='block px-4 py-3 text-lg'>
                    <HiOutlinePlusCircle className='relative inline-block w-8 h-8 mr-1 text-gray-600 bottom-[2px]' />
                    Create new website
                  </a>
                </Link>
              </div>
              <hr className='my-5 w-[80%] mx-auto text-gray-300' />
              <div className='mt-4 text-center'>
                <h3 className='text-2xl font-medium'>
                  Some awesome websites made with Pagely
                </h3>
                <div
                  className='flex flex-wrap px-2 mt-3 overflow-y-auto h-[50vh] pb-5'
                  id='showcase-websites'>
                  {showcaseWebsites?.map((site) => {
                    return (
                      <div
                        key={site.siteName}
                        style={{ zoom: '0.6' }}
                        className='mr-1'>
                        <a
                          href={'https://' + site.subdomain + '.pagely.site'}
                          target='_blank'
                          rel='noopener noreferrer'>
                          <div className='max-w-sm px-3 mx-auto text-center transition-all duration-500 rounded-lg py-7 hover:border border-bluegray-200 hover:shadow-lg group'>
                            {(
                              // eslint-disable-next-line @next/next/no-img-element
                              <img
                                src={site.ogImageUrl || '/no-og-image.png'}
                                alt={site.siteName}
                                className='w-[80%] mx-auto mb-4 rounded-lg group-hover:scale-105 object-cover transform transition-all duration-500 border border-gray-300'
                              />
                            ) || (
                              <Skeleton className='w-[80%] mx-auto mb-4 rounded-lg group-hover:scale-105 object-cover transform transition-all duration-500 border border-gray-300' />
                            )}
                            <h3 className='text-2xl font-medium'>
                              {truncate(site.siteName, { length: 30 })}
                            </h3>
                          </div>
                        </a>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <style jsx>{`
        #showcase-websites::-webkit-scrollbar {
          display: none;
        }
        #showcase-websites {
          -ms-overflow-style: none;
        }
        #websites::-webkit-scrollbar {
          display: none;
        }
        #websites {
          -ms-overflow-style: none;
        }
      `}</style>
    </MainLayout>
  );
};

export default Dashboard;
