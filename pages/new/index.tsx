import DashboardNav from '@/components/dashboard/DashboardNav';
import { RadioGroup } from '@headlessui/react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { SiNotion, SiGooglesheets, SiAirtable, SiGithub } from 'react-icons/si';
import { RoughNotation } from 'react-rough-notation';

const Page = () => {
  let [integration, setIntegration] = useState<
    'notion' | 'googleSheets' | 'github' | 'airtable'
  >('notion');
  const [highlight, setHighlight] = useState<boolean>(true);
  useEffect(() => {
    setHighlight(false);
    setTimeout(() => {
      setHighlight(true);
    }, 1);
  }, [integration]);

  return (
    <div>
      <DashboardNav />
      <div className='max-w-5xl mx-auto'>
        <h1 className='text-4xl font-bold'>Create a new Pagely website</h1>
        <div className='mt-10'>
          <h2 className='mt-5 text-2xl font-medium'>
            I would like to make a website with{' '}
            <span className='font-bold capitalize'>
              <RoughNotation
                type='box'
                show={highlight}
                color='rgba(55, 94, 241)'
                animationDuration={600}
                iterations={3}>
                {integration === 'googleSheets' ? 'Google Sheets' : integration}
              </RoughNotation>
            </span>
          </h2>
          <RadioGroup value={integration} onChange={setIntegration}>
            <RadioGroup.Option
              value='notion'
              className='max-w-md px-10 py-5 my-5 transition-all border border-blue-400 rounded-md shadow cursor-pointer focus:ring-4 focus:ring-offset-1 focus:outline-none focus:ring-blue-300'>
              {({ checked }) => (
                <span className={checked ? 'font-bold' : ''}>
                  <span className={checked ? 'opacity-100' : 'opacity-0'}>
                    <SiNotion className='relative inline-block mr-3 bottom-px' />{' '}
                  </span>
                  Notion
                </span>
              )}
            </RadioGroup.Option>
            <RadioGroup.Option
              value='airtable'
              className='max-w-md px-10 py-5 my-5 transition-all border border-blue-400 rounded-md shadow cursor-pointer focus:ring-4 focus:ring-offset-1 focus:outline-none focus:ring-blue-300'>
              {({ checked }) => (
                <span className={checked ? 'font-bold' : ''}>
                  <span className={checked ? 'opacity-100' : 'opacity-0'}>
                    <SiAirtable className='relative inline-block mr-3 bottom-px' />{' '}
                  </span>
                  Airtable
                </span>
              )}
            </RadioGroup.Option>
            <RadioGroup.Option
              value='googleSheets'
              className='max-w-md px-10 py-5 my-5 transition-all border border-blue-400 rounded-md shadow cursor-pointer focus:ring-4 focus:ring-offset-1 focus:outline-none focus:ring-blue-300'>
              {({ checked }) => (
                <span className={checked ? 'font-bold' : ''}>
                  <span className={checked ? 'opacity-100' : 'opacity-0'}>
                    <SiGooglesheets className='relative inline-block mr-3 bottom-px' />{' '}
                  </span>
                  Google Sheets
                </span>
              )}
            </RadioGroup.Option>
            <RadioGroup.Option
              value='github'
              className='max-w-md px-10 py-5 my-5 transition-all border border-blue-400 rounded-md shadow cursor-pointer focus:ring-4 focus:ring-offset-1 focus:outline-none focus:ring-blue-300'>
              {({ checked }) => (
                <span className={checked ? 'font-bold' : ''}>
                  <span className={checked ? 'opacity-100' : 'opacity-0'}>
                    <SiGithub className='relative inline-block mr-3 bottom-px' />{' '}
                  </span>
                  GitHub
                </span>
              )}
            </RadioGroup.Option>
          </RadioGroup>
        </div>
        <Link
          href={`/new/${
            integration === 'googleSheets' ? 'sheets' : integration
          }`}>
          <a className='inline-flex items-center justify-center py-2 mt-10 text-lg font-medium text-blue-600 border border-blue-300 rounded shadow-sm px-7 bg-blue-50 hover:bg-blue-100'>
            Continue -{'>'}
          </a>
        </Link>
      </div>
    </div>
  );
};

export default Page;
