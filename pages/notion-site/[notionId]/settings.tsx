import { useRouter } from 'next/router';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useState } from 'react';
import truncate from 'lodash.truncate';

import { useClerkSWR } from '@/lib/fetcher';
import { notionSites } from '@prisma/client';
import SidebarLayout from '@/layouts/SidebarLayout';
import axios from 'axios';
import useUserWithSession from '@/lib/useUrlWithSession';
import toast from 'react-hot-toast';
import { Switch } from '@headlessui/react';
import Link from 'next/link';
import Image from 'next/image';

const Page = () => {
  const router = useRouter();
  const { data } = useClerkSWR<notionSites>(
    `/api/getSiteData/notion/?siteId=${router.query.notionId}`
  );

  const urlWithSession = useUserWithSession(
    '/api/updateSiteData/notion/showcase'
  );
  const deleteUrlWithSession = useUserWithSession('/api/deleteSite/notion');

  const passwordUrlWithSession = useUserWithSession(
    '/api/updateSiteData/notion/password'
  );
  const [enabled, setEnabled] = useState(data?.inShowcase);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  return (
    <div>
      <div>
        <SidebarLayout activeTab='settings'>
          <h1 className='text-4xl font-extrabold'>Settings</h1>
          <p className='mt-4 text-gray-800 font-base'>
            {data?.siteName || 'Just a second...'}
          </p>
          <div className='mt-8'>
            <h2 className='text-2xl font-bold'>Showcase Settings</h2>
            <div className='flex items-center my-5'>
              <span className='inline-block mr-2'>
                I prefer not to display{' '}
                <strong title={data?.siteName}>
                  {truncate(data?.siteName, {
                    length: 15,
                  })}
                </strong>{' '}
                in showcase
              </span>
              <Switch
                checked={enabled}
                onChange={setEnabled}
                style={{ zoom: 0.5 }}
                className={`${enabled ? 'bg-gray-900' : 'bg-gray-700'}
          relative inline-flex flex-shrink-0 h-[38px] w-[74px] border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}>
                <span className='sr-only'>Use setting</span>
                <span
                  aria-hidden='true'
                  className={`${enabled ? 'translate-x-9' : 'translate-x-0'}
            pointer-events-none inline-block h-[34px] w-[34px] rounded-full bg-white shadow-lg transform ring-0 transition ease-in-out duration-200`}
                />
              </Switch>
              <span className='inline-block ml-2'>
                Display{' '}
                <strong title={data?.siteName}>
                  {truncate(data?.siteName, {
                    length: 15,
                  })}
                </strong>{' '}
                in{' '}
                <Link href='/showcase'>
                  <a className='text-blue-500 hover:underline'>Showcase</a>
                </Link>
              </span>
            </div>
            <button
              onClick={() => {
                setIsLoading(true);
                axios
                  .post(urlWithSession, {
                    inShowcase: enabled,
                    siteId: data.id,
                  })
                  .then((res) => {
                    console.log(res);
                    toast.success(
                      enabled
                        ? `Yay 🎉, ${data?.siteName} will be displayed in showcase soon.`
                        : `${data?.siteName} will be removed showcase soon.`,
                      {
                        duration: 5000,
                      }
                    );
                    setIsLoading(false);
                  });
              }}
              className={`h-10 px-3 mb-10 bg-gray-800 rounded shadow-md text-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 hover:bg-gray-700 ${
                isLoading && 'opacity-50 cursor-wait'
              }`}>
              Update Showcase Settings
            </button>
          </div>
          <hr className='w-[70vw] my-3 text-gray-200' />
          <div className='mt-8'>
            <h2 className='text-2xl font-bold'>Password protection</h2>
            {data?.isPasswordProtected ? (
              <div>
                <div className='flex items-center my-5'>
                  <span className='inline-block'>
                    <strong>{data?.siteName}</strong> has already been password
                    protected
                  </span>
                </div>
                <button className='h-10 px-3 mb-10 bg-gray-800 rounded shadow-md text-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 hover:bg-gray-700'>
                  <a
                    href='https://staticshield.vercel.app/dashboard'
                    target='_blank'
                    rel='noopener noreferrer'>
                    View details
                  </a>
                </button>
              </div>
            ) : (
              <div>
                <div className='flex items-center my-5'>
                  <span className='inline-block'>
                    Password protect <strong>{data?.siteName}</strong>
                  </span>
                </div>
                <button
                  onClick={() => {
                    window.open(
                      `https://staticshield.vercel.app/new/?name=${data?.siteName}&desc=${data?.siteDesc}&url=${data?.subdomain}.pagely.site&id=${data?.id}`,
                      '_blank'
                    );
                  }}
                  className={`mb-10 h-10 inline-flex items-center px-3 bg-gray-800 rounded shadow-md text-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 hover:bg-gray-700`}>
                  Password protect{' '}
                  <strong className='mx-1'>{data?.siteName}</strong> with{' '}
                  <span className='inline-flex !items-center justify-center p-1 mx-1 bg-white rounded'>
                    <Image
                      src='/staticshield.png'
                      alt=''
                      width='20'
                      height='20'
                      // className='block mt-2'
                    />
                  </span>
                  StaticShield
                </button>
              </div>
            )}
          </div>
          <hr className='w-[70vw] my-3 text-gray-200' />
          <div className='mt-8'>
            <h2 className='text-2xl font-bold text-red-500'>Danger Zone</h2>
            <div className='mt-5'>
              <button
                onClick={openModal}
                className='h-10 px-3 mb-10 bg-red-600 rounded shadow-md text-red-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-800 hover:bg-red-400'>
                {/* <button className='px-2 py-1 text-red-600 border border-red-500 rounded shadow bg-red-50 hover:bg-red-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-red-200'> */}
                Delete <strong>{data?.siteName}</strong>
              </button>
            </div>
          </div>
        </SidebarLayout>
        <Transition appear show={isOpen} as={Fragment}>
          <Dialog
            as='div'
            className='fixed inset-0 z-10 overflow-y-auto'
            onClose={closeModal}>
            <div className='min-h-screen px-4 text-center'>
              <Transition.Child
                as={Fragment}
                enter='ease-out duration-300'
                enterFrom='opacity-0'
                enterTo='opacity-100'
                leave='ease-in duration-200'
                leaveFrom='opacity-100'
                leaveTo='opacity-0'>
                <Dialog.Overlay className='fixed inset-0 backdrop-filter backdrop-blur-sm bg-white/40' />
              </Transition.Child>

              {/* This element is to trick the browser into centering the modal contents. */}
              <span
                className='inline-block h-screen align-middle'
                aria-hidden='true'>
                &#8203;
              </span>
              <Transition.Child
                as={Fragment}
                enter='ease-out duration-300'
                enterFrom='opacity-0 scale-95'
                enterTo='opacity-100 scale-100'
                leave='ease-in duration-200'
                leaveFrom='opacity-100 scale-100'
                leaveTo='opacity-0 scale-95'>
                <div className='inline-block w-full max-w-lg p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white border rounded-md shadow-xl border-gray-500/40'>
                  <Dialog.Title
                    as='h3'
                    className='text-lg font-medium leading-6 text-red-700'>
                    Are you sure that you want to delete{' '}
                    <strong>{data?.siteName}</strong>?
                  </Dialog.Title>
                  <div className='mt-2 mb-10'>
                    <p className='text-sm text-gray-500'>
                      Proceed with caution. This action cannot be reversed.
                    </p>
                  </div>

                  <div className='mt-4'>
                    <button
                      type='button'
                      className='inline-flex justify-center px-4 py-1 mr-2 text-sm font-medium text-blue-900 bg-blue-100 border border-blue-500 rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500'
                      onClick={closeModal}>
                      Cancel
                    </button>
                    <button
                      type='button'
                      className='inline-flex justify-center px-4 py-1 text-sm font-medium text-red-900 bg-red-100 border border-red-500 rounded-md hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-red-500'
                      onClick={() => {
                        axios
                          .post(deleteUrlWithSession, {
                            siteId: data?.id,
                          })
                          .then((res) => {
                            if (res.data.success) {
                              toast.success('Site deleted successfully', {
                                duration: 2000,
                              });
                              setTimeout(() => {
                                router.push('/dashboard');
                              }, 2000);
                            } else {
                              toast.error('Site deletion failed');
                            }
                          });
                      }}>
                      Delete
                    </button>
                  </div>
                </div>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition>
      </div>
    </div>
  );
};

export default Page;
