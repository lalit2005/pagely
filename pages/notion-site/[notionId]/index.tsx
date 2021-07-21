import { useRouter } from 'next/router';
import { useClerkSWR } from '@/lib/fetcher';
import { notionSites } from '@prisma/client';
import { SiLighthouse, SiNotion } from 'react-icons/si';
import { VscGlobe } from 'react-icons/vsc';

import SidebarLayout from '@/layouts/SidebarLayout';

const Page = () => {
  const router = useRouter();
  const { data } = useClerkSWR<notionSites>(
    `/api/getSiteData/notion/?siteId=${router.query.notionId}`
  );

  return (
    <div>
      <SidebarLayout activeTab='setup'>
        <h1 className='text-4xl font-extrabold'>
          {data?.siteName || 'Just a second...'}
        </h1>
        <p className='mt-4 text-gray-800 font-base'>
          {data?.siteDesc ||
            'Crunching the data for you. Please give a second.'}
        </p>
        <div className='flex flex-wrap mt-8'>
          <a
            href={data?.notionPageUrl}
            target='_blank'
            rel='noopener noreferrer'>
            <div className='inline-block px-3 py-4 my-2 mr-3 transition-all bg-yellow-100 border rounded-md hover:shadow hover:border-yellow-500'>
              <SiNotion className='relative inline-block mx-2 bottom-[2px]' />
              Open in Notion
            </div>
          </a>
          <a
            href={
              'https://developers.google.com/speed/pagespeed/insights/?url=https://' +
              data?.subdomain +
              '.pagely.site'
            }
            target='_blank'
            rel='noopener noreferrer'>
            <div className='inline-block px-3 py-4 my-2 mr-3 transition-all bg-blue-100 border rounded-md hover:shadow hover:border-blue-500'>
              <SiLighthouse className='relative inline-block mx-2 bottom-[2px]' />
              Open Lighthouse score
            </div>
          </a>
          <a
            href={'https://' + data?.subdomain + '.pagely.site'}
            target='_blank'
            rel='noopener noreferrer'>
            <div className='inline-block px-3 py-4 my-2 mr-3 transition-all bg-green-100 border rounded-md hover:shadow hover:border-green-500'>
              <VscGlobe className='relative inline-block mx-2 bottom-[2px]' />
              Open website
            </div>
          </a>
        </div>
      </SidebarLayout>
    </div>
  );
};

export default Page;
