import Navbar from '@/components/Navbar';
import Link from 'next/link';
import { SiNotion, SiGooglesheets, SiAirtable, SiGithub } from 'react-icons/si';
import { FaRegEdit, FaRobot } from 'react-icons/fa';
import { HiOutlineGlobeAlt } from 'react-icons/hi';
import { VscRocket } from 'react-icons/vsc';
import { GoBrowser } from 'react-icons/go';
import { AiOutlineThunderbolt } from 'react-icons/ai';
import { SignedIn } from '@clerk/clerk-react';

import RedirectIfUser from '@/components/RedirectIfUser';
import Script from 'next/script';
import Head from 'next/head';
import { NextSeo } from 'next-seo';

export default function Page() {
  return (
    <div>
      <Navbar />
      <SignedIn>
        <RedirectIfUser />
      </SignedIn>
      <Head>
        {/* eslint-disable-next-line @next/next/no-sync-scripts */}
        <script
          data-name='BMC-Widget'
          data-cfasync='false'
          src='https://cdnjs.buymeacoffee.com/1.0.0/widget.prod.min.js'
          data-id='lalitcodes'
          data-description='Support me on Buy me a coffee!'
          data-message="If you like my app, please consider buying me a coffee ☕️If you cannot, it's fine 🤗. Hope you enjoy my app"
          data-color='#5F7FFF'
          data-position='Right'
          data-x_margin='18'
          data-y_margin='18'></script>
      </Head>
      <NextSeo
        title='Pagely'
        description='Launch SEO friendly, blazing fast websites from Notion, Google Sheets, GitHub, Airtable with Pagely"'
        canonical='https://www.pagely.site'
        openGraph={{
          title: 'Pagely',
          url: 'https://www.pagely.site',
          images: [
            {
              url: 'https://pagely.site/ogimage.png',
              alt: 'Launch SEO friendly, blazing fast websites from Notion, Google Sheets, GitHub, Airtable with Pagely',
            },
          ],
          description:
            'Launch SEO friendly, blazing fast websites from Notion,Google Sheets, GitHub, Airtable with Pagely',
        }}
        twitter={{
          cardType: 'summary_large_image',
        }}
      />
      <div className='mx-10'>
        <div className='max-w-5xl mx-auto mt-24'>
          <div className='text-center'>
            <p className='mb-1 text-xs font-semibold tracking-widest text-gray-500 uppercase title-font'>
              No coding required
            </p>
            <h1 className='text-5xl font-extrabold'>
              Build beautiful websites. In light speed
            </h1>
            <h2 className='mt-5 text-xl text-gray-600'>
              Launch websites from{' '}
              <span className='relative inline-block mx-1 top-1'>
                <SiNotion />
              </span>
              <span className='font-medium text-gray-700'>Notion</span>,
              <span className='relative inline-block mx-1 top-1'>
                <SiGooglesheets />
              </span>
              <span className='font-medium text-gray-700'>Google Sheets</span>,{' '}
              <span className='relative inline-block mx-1 top-1'>
                <SiGithub />
              </span>
              <span className='font-medium text-gray-700'>GitHub </span>or{' '}
              <span className='relative inline-block mx-1 top-1'>
                <SiAirtable />
              </span>{' '}
              <span className='font-medium text-gray-700'>Airtable</span>
            </h2>
          </div>
        </div>

        <Link href='/sign-up' passHref={true}>
          <div className='max-w-xs py-4 mx-auto my-20 text-center text-gray-100 rounded-md shadow-sm cursor-pointer focus:ring-1 focus:ring-blue-500 bg-custom-blue hover:bg-blue-600'>
            <a>Get started now -{'>'}</a>
          </div>
        </Link>

        <div className='py-12 bg-gray-100 rounded-xl'>
          <div className='px-4 mx-auto max-w-7xl sm:px-6 lg:px-8'>
            <div className='lg:text-center'>
              <h2 className='mb-1 text-xs font-semibold tracking-widest text-gray-500 uppercase title-font'>
                Mind-blowing
              </h2>
              <p className='mt-2 text-3xl font-extrabold leading-8 tracking-tight text-gray-900 sm:text-4xl'>
                Features
              </p>
              <p className='max-w-2xl mt-4 text-xl text-gray-500 lg:mx-auto'>
                Customize most of your Pagely site <br />
                with widgets, styles and more…
              </p>
            </div>

            <div className='mt-10'>
              <dl className='space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10'>
                {features.map((feature) => (
                  <div key={feature.name} className='relative'>
                    <dt>
                      <div className='absolute flex items-center justify-center w-12 h-12 text-white bg-blue-500 rounded-md'>
                        <feature.icon className='w-6 h-6' aria-hidden='true' />
                      </div>
                      <p className='ml-16 text-lg font-medium leading-6 text-gray-900'>
                        {feature.name}
                      </p>
                    </dt>
                    <dd className='mt-2 ml-16 text-base text-gray-500'>
                      {feature.description}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
        <div className='my-10'>
          <a
            href='https://lalit2005.hashnode.dev/pagely'
            target='_blank'
            rel='noopener noreferrer'>
            <p className='text-4xl font-bold text-center text-blue-700 transition-all hover:text-blue-500 hover:underline'>
              Made by Lalit
            </p>
          </a>
        </div>
      </div>
    </div>
  );
}

const features = [
  {
    name: 'Takes less than a minute',
    description:
      'Creating and deploying a Pagely site from Notion, Airtable, Google Sheets or GitHub takes less than a minute of your valuable time',
    icon: HiOutlineGlobeAlt,
  },
  {
    name: 'Static Pages',
    description:
      'All the Pagely sites are statically rendered in the server so that your site always remains lightning fast. Your Pagely site can have some dynamics pieces too',
    icon: AiOutlineThunderbolt,
  },
  {
    name: 'SEO Friendly',
    description:
      'Since all the sites are static, it makes it easy for crawlers such as Googlebot to index the pages which results in better seo',
    icon: FaRobot,
  },
  {
    name: 'Custom styles',
    description:
      "Don't like the default styles? You can style your Pagely site and customize it to your hearts content and make it look different",
    icon: FaRegEdit,
  },
  {
    name: 'Automatic pretty URLs',
    description:
      'Get a SEO and human friendly, recogonizable URL for all your sub pages. This makes the URLs not look like spammy ones.',
    icon: GoBrowser,
  },
  {
    name: 'And much more',
    description:
      "This is only the tip of the iceberg. There's still a loooot more that you can do with Pagely. Discover them in the guides section",
    icon: VscRocket,
  },
];
