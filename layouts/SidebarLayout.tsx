import { useRouter } from 'next/router';
import { notionSites } from '@prisma/client';
import Link from 'next/link';
import { BiCode, BiSearchAlt } from 'react-icons/bi';
import { GoInbox } from 'react-icons/go';
import { FiSettings } from 'react-icons/fi';
import { useUser, useClerk } from '@clerk/clerk-react';
import { useClerkSWR } from '@/lib/fetcher';
import ProfileDropdown from '@/components/popovers/ProfileDropdown';
import DashboardNav from '@/components/dashboard/DashboardNav';
import { HiOutlineNewspaper } from 'react-icons/hi';

const SidebarLayout: React.FC<{
  activeTab: 'code' | 'setup' | 'pages' | 'settings' | 'seo';
}> = ({ activeTab, ...props }) => {
  const { emailAddresses, profileImageUrl, fullName, firstName } = useUser();
  const { signOut } = useClerk();

  const router = useRouter();
  const { data } = useClerkSWR<notionSites>(
    `/api/getSiteData/notion/?siteId=${router.query.notionId}`
  );

  return (
    <div>
      <div className='block lg:hidden'>
        <DashboardNav />
      </div>
      <div className='lg:flex'>
        {/* <div className='sticky top-0 overflow-y-hidden'> */}
        <div
          style={{ position: 'sticky' }}
          className='absolute top-0 h-screen left-0 px-10 py-5 bg-gray-50 w-[20vw] border-r hidden flex-col justify-between lg:flex'>
          <div>
            <Link href='/dashboard'>
              <a>
                <small className='text-gray-700 hover:text-gray-500'>
                  {' '}
                  {'<'}- Go back
                </small>
              </a>
            </Link>
            <ul className='mt-10'>
              <li
                className={`my-2 rounded ${
                  activeTab === 'setup' ? ' bg-gray-200' : ' hover:bg-gray-300'
                }`}>
                <Link href={'/notion-site/' + data?.id}>
                  <a className='block px-3 py-2 my-2'>
                    {' '}
                    <GoInbox className='relative inline-block bottom-[2px]' />{' '}
                    Setup
                  </a>
                </Link>
              </li>
              <li
                className={`my-2 rounded ${
                  activeTab === 'seo' ? ' bg-gray-200' : ' hover:bg-gray-300'
                }`}>
                <Link href={`/notion-site/${data?.id}/seo`}>
                  <a className='block px-3 py-2 my-2'>
                    {' '}
                    <BiSearchAlt className='relative inline-block bottom-[2px]' />{' '}
                    SEO
                  </a>
                </Link>
              </li>
              <li
                className={`my-2 rounded ${
                  activeTab === 'code' ? ' bg-gray-200' : ' hover:bg-gray-300'
                }`}>
                <Link href={`/notion-site/${data?.id}/code`}>
                  <a className='block px-3 py-2 my-2'>
                    {' '}
                    <BiCode className='relative inline-block bottom-[2px]' />{' '}
                    Code injection
                  </a>
                </Link>
              </li>
              <li
                className={`my-2 rounded ${
                  activeTab === 'settings'
                    ? ' bg-gray-200'
                    : ' hover:bg-gray-300'
                }`}>
                <Link href=''>
                  <a className='block px-3 py-2 my-2'>
                    {' '}
                    <FiSettings className='relative inline-block bottom-[2px]' />{' '}
                    Settings
                  </a>
                </Link>
              </li>
              <li
                className={`my-2 rounded ${
                  activeTab === 'pages' ? ' bg-gray-200' : ' hover:bg-gray-300'
                }`}>
                <Link href=''>
                  <a className='block px-3 py-2 my-2'>
                    {' '}
                    <HiOutlineNewspaper className='relative inline-block bottom-[2px]' />{' '}
                    Pages
                  </a>
                </Link>
              </li>
            </ul>
          </div>
          <ProfileDropdown
            emailAddresses={emailAddresses}
            profileImageUrl={profileImageUrl}
            fullName={fullName}
            firstName={firstName}
            signOut={signOut}
          />
          {/* </div> */}
        </div>
        <div className='mx-10 mt-20'>{props.children}</div>
      </div>
      {/* </MainLayout> */}
    </div>
  );
};

export default SidebarLayout;
