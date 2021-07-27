import { useRouter } from 'next/router';
import TextareaAutosize from 'react-textarea-autosize';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useState } from 'react';

import { useClerkSWR } from '@/lib/fetcher';
import { notionSites } from '@prisma/client';
import SidebarLayout from '@/layouts/SidebarLayout';
import handleHotkeys from '@/lib/handleHotkeys';
import Utility from '@/components/popovers/Utility';
import { useEffect } from 'react';
import axios from 'axios';
import useUserWithSession from '@/lib/useUrlWithSession';
import toast from 'react-hot-toast';

const Page = () => {
  const router = useRouter();
  const { data } = useClerkSWR<notionSites>(
    `/api/getSiteData/notion/?siteId=${router.query.notionId}`
  );

  const [css, setCss] = useState<string>(data?.customCss);
  const [head, setHead] = useState<string>(data?.customHead);
  let [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const urlWithSession = useUserWithSession('/api/updateSiteData/notion/code');

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  useEffect(() => {
    window.addEventListener('keydown', (e) => {
      if (e.metaKey && e.key === 's') {
        e.preventDefault();
        document.getElementById('update-custom-code-btn').click();
      }
    });
  }, []);

  return (
    <div>
      <div>
        <SidebarLayout activeTab='code'>
          <h1 className='text-4xl font-extrabold'>Code Injection</h1>
          <p className='mt-4 text-gray-800 font-base'>
            {data?.siteName || 'Just a second...'}
          </p>
          <div className='my-3'>
            <button
              onClick={openModal}
              className='px-2 py-1 text-green-600 border border-green-500 rounded shadow bg-green-50 hover:bg-green-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-green-200'>
              Open styling tools
            </button>
          </div>
          <div className='mt-8'>
            <p className='my-3 font-mono text-xl font-bold text-gray-500'>{`<style>`}</p>
            <TextareaAutosize
              spellCheck={false}
              value={css}
              onChange={(e) => setCss(e.target.value)}
              className='w-[70vw] py-5 font-mono border text-sm min-h-[100px] border-gray-600 rounded-md shadow-sm block text-gray-500 focus:outline-none focus:border-gray-700 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-gray-500'
              onKeyDown={(e) => handleHotkeys(e)}
            />
            <p className='my-3 font-mono text-xl font-bold text-gray-500'>{`</style>`}</p>
          </div>
          <hr className='my-10 text-gray-300' />
          <div className='mt-8'>
            <p className='my-3 font-mono text-xl font-bold text-gray-500'>{`<head>`}</p>
            <TextareaAutosize
              spellCheck={false}
              value={head}
              onChange={(e) => setHead(e.target.value)}
              className='w-[70vw] py-5 font-mono border text-sm min-h-[100px] border-gray-600 rounded-md shadow-sm block text-gray-500 focus:outline-none focus:border-gray-700 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-gray-500'
            />
            <p className='my-3 font-mono text-xl font-bold text-gray-500'>{`</head>`}</p>
            <div className='my-10'>
              <button
                id='update-custom-code-btn'
                onClick={() => {
                  setIsLoading(true);
                  axios
                    .post(urlWithSession, {
                      customCss: css,
                      customHead: head,
                      siteId: data.id,
                    })
                    .then((res) => {
                      console.log(res);
                      toast.success('Successfully updated site code.', {
                        duration: 5000,
                      });
                      setIsLoading(false);
                    });
                }}
                className={`h-10 px-3 mb-10 bg-gray-800 rounded shadow-md text-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 hover:bg-gray-700 ${
                  isLoading && 'opacity-50 cursor-wait'
                }`}>
                {/* className={`h-10 px-3 shadow-md bg-gray-800 rounded text-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 hover:bg-gray-700 ${
                  isLoading && 'opacity-60 cursor-pointer pointer-events-none'
                }`}> */}
                Update Custom Code
              </button>
              <p className='mt-3 text-base text-gray-600'>
                You can press <b>Cmd + S</b> to save the code too ✌️
              </p>
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
                <div className='inline-block w-full max-w-3xl p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white border rounded-md shadow-xl border-gray-500/40'>
                  <Dialog.Title
                    as='h3'
                    className='text-lg font-medium leading-6 text-gray-900'>
                    CSS Utilities 😍
                  </Dialog.Title>
                  <div className='mt-2 mb-10'>
                    <p className='text-sm text-gray-500'>
                      A tiny set of utilities to help you style your app and
                      make it look great. Many more utilities are coming soon.
                    </p>
                    <hr className='w-full mx-auto my-5 text-gray-200' />
                    <Utility />
                  </div>

                  <div className='mt-4'>
                    <button
                      type='button'
                      className='inline-flex justify-center px-4 py-1 text-sm font-medium text-blue-900 bg-blue-100 border border-blue-500 rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500'
                      onClick={openModal}>
                      Thanks!
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
