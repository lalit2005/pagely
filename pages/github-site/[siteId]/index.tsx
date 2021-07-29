import { useRouter } from 'next/router';
import { useClerkSWR } from '@/lib/fetcher';
import { ghSites, notionSites } from '@prisma/client';
import { SiGithub, SiLighthouse } from 'react-icons/si';
import { VscGlobe } from 'react-icons/vsc';

import GitHubSiteLayout from '@/layouts/GitHubSiteLayout';

const Page = () => {
  const router = useRouter();

  const { data } = useClerkSWR<ghSites>(
    `/api/getSiteData/github/?siteId=${router.query.siteId}`
  );

  return (
    <div>
      <GitHubSiteLayout activeTab='setup'>
        <h1 className='text-4xl font-extrabold capitalize'>
          {data?.siteName || 'Just a second...'}
        </h1>
        <div className='flex flex-wrap mt-8'>
          <a href={data?.repoUrl} target='_blank' rel='noopener noreferrer'>
            <div className='inline-block px-3 py-4 my-2 mr-3 transition-all bg-yellow-100 border rounded-md hover:shadow hover:border-yellow-500'>
              <SiGithub className='relative inline-block mx-2 bottom-[2px]' />
              Open in GitHub
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
      </GitHubSiteLayout>
    </div>
  );
};

export default Page;
