import Image from 'next/image';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import toast, { Toaster } from 'react-hot-toast';
import { useRouter } from 'next/router';

import InfoPopover from '@/components/popovers/InfoPopover';
import TweetTitleImage from '@/public/popover-images/og-title.png';
import TweetDescImage from '@/public/popover-images/og-desc.png';
import SubdomainImage from '@/public/popover-images/subdomain.png';
import NotionImage from '@/public/popover-images/notion.png';
import OgImage from '@/public/popover-images/og-image.png';

import MainLayout from '@/layouts/MainLayout';
import { NewNotionSiteFormValues } from 'types/types';
import { newNotionSiteSchema } from '@/lib/notion/newNotionSiteSchema';
import validateData from '@/lib/notion/validateData';
import axios from 'axios';
import { useState } from 'react';
import Loader from 'react-loader-spinner';
import { useEffect } from 'react';
import { BiCloudUpload } from 'react-icons/bi';
import Dropzone from 'react-dropzone';
import uploadImage from '@/lib/uploadImage';

const Notion = () => {
  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors },
  } = useForm<NewNotionSiteFormValues>({
    resolver: zodResolver(newNotionSiteSchema),
  });

  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    router.prefetch('/dashboard');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleFormSubmit = async (data: NewNotionSiteFormValues) => {
    setLoading(true);
    if (validateData(data) !== null) {
      setLoading(false);
      return;
    }
    const { name, description, subdomain, ogImageUrl, notionPageUrl } = data;
    const res = await axios.post('/api/new/notion', {
      siteName: name,
      siteDesc: description,
      subdomain,
      ogImageUrl,
      notionPageUrl,
    });
    if (res.data.success) {
      toast.success('Notion site created!');
      setLoading(false);
      router.push('/dashboard');
    } else if (res.data.success === false) {
      toast.error(res.data.error);
      setLoading(false);
    }
  };

  return (
    <MainLayout>
      <div>
        <div className='max-w-5xl mx-auto'>
          <h1 className='mt-10 text-4xl font-bold'>
            That&apos;s. Just fill out this quick form now
          </h1>
          <form
            className='max-w-sm mt-10'
            onSubmit={handleSubmit(handleFormSubmit)}>
            <label className='block'>
              <span className='mb-2 text-gray-700'>
                Subdomain (URL for your website)
                <InfoPopover content='This is the subdomain of your website. It is the part of the URL before the domain name. For example, in the image below thesubdomain is "one". (And its free!!)'>
                  <Image
                    placeholder='blur'
                    src={SubdomainImage}
                    alt='Subdomain'
                    className='inline-block w-full rounded'
                  />
                </InfoPopover>
              </span>
              <p className='mt-1 text-sm text-gray-600'>
                You cannot change this later
              </p>
              <div className='flex items-baseline'>
                <input
                  type='text'
                  className='inline-block w-full mt-1 border-gray-300 shadow-sm rounded-l-md focus:border-blue-300 focus:ring focus:ring-blue-200'
                  placeholder='elon'
                  {...register('subdomain')}
                />
                <span className='inline-block py-[0.5rem] select-none border-t border-b border-r pl-1 pr-2 bg-gray-100 rounded-r-md'>
                  .pagely.site
                </span>
              </div>
              <p className='mt-2 text-sm text-red-500'>
                {errors.subdomain && errors.subdomain.message}
              </p>
            </label>
            <label className='block mt-10'>
              <span className='mb-2 text-gray-700'>Name of your website</span>
              <InfoPopover content='This is the name of your website. It is also the title in Twitter cards and OG cards.'>
                <Image
                  placeholder='blur'
                  src={TweetTitleImage}
                  alt=''
                  className='inline-block w-full rounded'
                />
              </InfoPopover>
              <p className='mt-1 text-sm text-gray-600'>
                This name will be used for generating OG title
              </p>
              <div className='flex items-center'>
                <input
                  type='text'
                  className='inline-block w-full mt-1 mr-1 border-gray-300 rounded-md shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200'
                  placeholder='Blog - Elon'
                  {...register('name')}
                />
              </div>
              <p className='mt-2 text-sm text-red-500'>
                {errors.name && errors.name.message}
              </p>
            </label>
            <label className='block mt-10'>
              <span className='text-gray-700'>Description</span>
              <InfoPopover content='This is the description of your website. It is also the description in Twitter cards and OG cards.'>
                <Image
                  placeholder='blur'
                  src={TweetDescImage}
                  alt=''
                  className='inline-block w-full rounded'
                />
              </InfoPopover>
              <p className='mt-1 text-sm text-gray-600'>
                This description will be used for generating OG and Twitter description
              </p>
              <textarea
                className='block w-full mt-1 text-base border-gray-300 rounded-md shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50'
                rows={4}
                placeholder='Read my blog to...'
                {...register('description')}
              />
              <p className='mt-2 text-sm text-red-500'>
                {errors.description && errors.description.message}
              </p>
            </label>

            <label className='block mt-10'>
              <span className='text-gray-700'>OG Image URL</span>
              <InfoPopover content='This is the image that will appear in the OG cards and Twitter cards. 1200x630 is the recommended dimension for the OG image. If you do not need, just set it to https://no-og.image'>
                <Image
                  placeholder='blur'
                  src={OgImage}
                  alt=''
                  className='inline-block w-full rounded'
                />
              </InfoPopover>
              <p className='mt-1 text-sm text-gray-600'>
                If left blank, the OG Image will be automatically generated from
                site name and Notion page&apos;s title!!
              </p>
              <div className='flex items-center'>
                <input
                  type='text'
                  className='inline-block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200'
                  placeholder='https://picsum.photos/1200/630'
                  {...register('ogImageUrl')}
                />
              </div>
              <p className='mt-2 text-sm text-red-500'>
                {errors.ogImageUrl && errors.ogImageUrl.message}
              </p>
              <div>
                <div className='inline-block px-2 py-px mt-2 text-sm text-gray-700 border border-gray-200 rounded cursor-pointer bg-gray-50 hover:bg-gray-100'>
                  <Dropzone
                    onDrop={(files) => {
                      uploadImage(files, setValue);
                    }}>
                    {({ getRootProps, getInputProps }) => (
                      <div {...getRootProps()}>
                        <input type='file' {...getInputProps()} />
                        <BiCloudUpload className='relative inline-block w-5 h-5 bottom-px' />{' '}
                        Upload image
                      </div>
                    )}
                  </Dropzone>
                </div>
                <p className='mt-1 text-sm text-gray-500'>
                  Or just drag &apos;n&apos; drop an image over the button !
                </p>
              </div>
            </label>

            <label className='block mt-10'>
              <span className='text-gray-700'>Notion Page URL</span>
              <InfoPopover content="You can find your Notion page URL in the Notion dashboard once you share the page to web. Pagely uses this URL to fetch the page's content.">
                <Image
                  placeholder='blur'
                  src={NotionImage}
                  alt=''
                  className='inline-block w-full rounded'
                />
              </InfoPopover>
              <p className='mt-1 text-sm text-gray-600'>
                <span className="font-bold">Make sure your Notion page is public</span>. You will get the URL once you share your page to web
              </p>
              <input
                type='text'
                className='block w-full mt-1 text-base border-gray-300 rounded-md shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50'
                placeholder='https://notion.so/My-Notion-Page-...'
                {...register('notionPageUrl')}
              />
              <p className='mt-2 text-sm text-red-500'>
                {errors.notionPageUrl && errors.notionPageUrl.message}
              </p>
            </label>
            <button
              type='submit'
              className='inline-flex items-center justify-center my-10 text-lg font-medium text-white border border-transparent rounded shadow-md bg-custom-blue hover:bg-blue-700 focus:outline-none focus:ring-blue-500 focus:ring-2 focus:ring-offset-2'>
              {loading ? (
                <span className={`px-5 py-[6px] ${loading && 'py-[11px]'}`}>
                  <Loader height={18} width={200} color='#fff' type='Puff' />
                </span>
              ) : (
                <span className='px-5 py-[6px] '>
                  Get the website now -&gt;
                </span>
              )}
            </button>
          </form>
        </div>
      </div>
      <Toaster />
    </MainLayout>
  );
};

export default Notion;
