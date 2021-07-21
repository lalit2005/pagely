import { useRouter } from 'next/router';
import { notionSites } from '@prisma/client';
import { SiLighthouse, SiNotion } from 'react-icons/si';
import Link from 'next/link';
import { VscGlobe } from 'react-icons/vsc';
import { BiCode, BiSearchAlt } from 'react-icons/bi';
import { GoInbox } from 'react-icons/go';
import { FiSettings } from 'react-icons/fi';
import { useUser, useClerk } from '@clerk/clerk-react';
import { useClerkSWR } from '@/lib/fetcher';
import ProfileDropdown from '@/components/popovers/ProfileDropdown';
import DashboardNav from '@/components/dashboard/DashboardNav';
import { useState } from 'react';
import { useEffect } from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import SidebarLayout from '@/layouts/SidebarLayout';
import handleHotkeys from '@/lib/handleHotkeys';

const Page = () => {
  const { emailAddresses, profileImageUrl, fullName, firstName } = useUser();
  const { signOut } = useClerk();

  const router = useRouter();
  const { data } = useClerkSWR<notionSites>(
    `/api/getSiteData/notion/?siteId=${router.query.notionId}`
  );

  const [css, setCss] = useState<string>('// Custom CSS here...');

  return (
    <div>
      <SidebarLayout activeTab='code'>
        <h1 className='text-4xl font-extrabold'>
          {data?.siteName || 'Just a second...'}
        </h1>
        <p className='mt-4 text-gray-800 font-base'>
          {data?.siteDesc ||
            'Crunching the data for you. Please give a second.'}
        </p>
        {/* {window === undefined ? null : ( */}
        <div className='mt-8'>
          <p className='my-3 font-mono text-xl font-bold text-gray-500'>{`<style>`}</p>
          <TextareaAutosize
            autoFocus
            spellCheck={false}
            className='max-w-xl w-full py-5 font-mono border text-sm min-h-[100px] border-gray-600 rounded-md shadow-sm block text-gray-500 focus: focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 p-96'
            onKeyDown={(e) => handleHotkeys(e)}
          />
          <p className='my-3 font-mono text-xl font-bold text-gray-500'>{`</style>`}</p>
        </div>
      </SidebarLayout>
    </div>
  );
};

export default Page;
