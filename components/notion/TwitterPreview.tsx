import { notionSites } from '@prisma/client';
import Image from 'next/image';
import Elon from '@/public/elon.jpg';
import Skeleton from 'react-loading-skeleton';
import { useState } from 'react';
import { useUser } from '@clerk/clerk-react';

const TwitterPreview: React.FC<{ data: notionSites }> = ({ data }) => {
  const [isImageLoading, setIsImageLoading] = useState<boolean>(true);
  const { firstName, primaryEmailAddress } = useUser();
  return (
    <div>
      <div className='w-full max-w-xl px-5 py-3 border border-gray-300 rounded-2xl'>
        <div className='flex'>
          <div className='mr-2 w-14'>
            <Image
              src={Elon}
              alt='Elon'
              className='object-cover rounded-full'
            />
          </div>
          <div>
            <div className='flex space-x-1'>
              <span className='font-bold'>Elon Musk</span>
              <span className='text-twitter-blue' title='Verified account'>
                <svg
                  className='w-6 h-6'
                  fill='currentColor'
                  viewBox='0 0 24 24'
                  aria-label='Verified account'>
                  <g>
                    <path d='M22.5 12.5c0-1.58-.875-2.95-2.148-3.6.154-.435.238-.905.238-1.4 0-2.21-1.71-3.998-3.818-3.998-.47 0-.92.084-1.336.25C14.818 2.415 13.51 1.5 12 1.5s-2.816.917-3.437 2.25c-.415-.165-.866-.25-1.336-.25-2.11 0-3.818 1.79-3.818 4 0 .494.083.964.237 1.4-1.272.65-2.147 2.018-2.147 3.6 0 1.495.782 2.798 1.942 3.486-.02.17-.032.34-.032.514 0 2.21 1.708 4 3.818 4 .47 0 .92-.086 1.335-.25.62 1.334 1.926 2.25 3.437 2.25 1.512 0 2.818-.916 3.437-2.25.415.163.865.248 1.336.248 2.11 0 3.818-1.79 3.818-4 0-.174-.012-.344-.033-.513 1.158-.687 1.943-1.99 1.943-3.484zm-6.616-3.334l-4.334 6.5c-.145.217-.382.334-.625.334-.143 0-.288-.04-.416-.126l-.115-.094-2.415-2.415c-.293-.293-.293-.768 0-1.06s.768-.294 1.06 0l1.77 1.767 3.825-5.74c.23-.345.696-.436 1.04-.207.346.23.44.696.21 1.04z' />
                  </g>
                </svg>
              </span>
            </div>
            <div className='leading-4 text-gray-500'>@elonmusk</div>
          </div>
          <div className='ml-auto text-twitter-blue'>
            <svg viewBox='0 0 24 24' fill='currentColor' className='w-6 h-6'>
              <g>
                <path d='M23.643 4.937c-.835.37-1.732.62-2.675.733.962-.576 1.7-1.49 2.048-2.578-.9.534-1.897.922-2.958 1.13-.85-.904-2.06-1.47-3.4-1.47-2.572 0-4.658 2.086-4.658 4.66 0 .364.042.718.12 1.06-3.873-.195-7.304-2.05-9.602-4.868-.4.69-.63 1.49-.63 2.342 0 1.616.823 3.043 2.072 3.878-.764-.025-1.482-.234-2.11-.583v.06c0 2.257 1.605 4.14 3.737 4.568-.392.106-.803.162-1.227.162-.3 0-.593-.028-.877-.082.593 1.85 2.313 3.198 4.352 3.234-1.595 1.25-3.604 1.995-5.786 1.995-.376 0-.747-.022-1.112-.065 2.062 1.323 4.51 2.093 7.14 2.093 8.57 0 13.255-7.098 13.255-13.254 0-.2-.005-.402-.014-.602.91-.658 1.7-1.477 2.323-2.41z' />
              </g>
            </svg>
          </div>
        </div>
        <div className='py-3'>
          <p className='text-lg'>
            Check this website out. Made by{' '}
            {firstName || primaryEmailAddress.emailAddress.split('@')[0]}
          </p>
          <p className='text-lg text-twitter-blue'>
            https://{data?.subdomain}.pagely.site
          </p>
          <div className='my-2 w-[90%] hover:bg-gray-100 cursor-pointer'>
            <div>
              {data?.ogImageUrl !== 'https://no-og.image' && (
                <>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={
                      data?.ogImageUrl ||
                      'https://ogimage.glitch.me/i/' +
                        encodeURIComponent(data?.siteName)
                    }
                    alt={data?.siteName}
                    className='rounded-t-xl'
                    onLoad={() => setIsImageLoading(false)}
                  />
                  {isImageLoading && (
                    <Skeleton
                      height='240px'
                      className='!rounded-t-xl w-[90%]'
                    />
                  )}
                </>
              )}
              <div
                className={`px-2 py-3 border border-gray-400 bg-gray-50/10 ${
                  data?.ogImageUrl == 'https://no-og.image'
                    ? 'rounded-md'
                    : 'rounded-b-xl'
                }`}>
                <h3 className='font-bold text-gray-600'>
                  {data?.siteName || 'OG title loading'}
                </h3>
                <div className='text-base text-gray-400'>
                  {data?.siteDesc || 'OG description loading'}
                </div>
              </div>
            </div>
          </div>
          <div className='flex'>
            <p className='pt-1 text-gray-500'>1:57 PM · Feb 4, 2021</p>
            <svg
              className='w-6 h-6 ml-auto text-gray-500'
              fill='currentColor'
              viewBox='0 0 24 24'>
              <g>
                <path d='M12 18.042c-.553 0-1-.447-1-1v-5.5c0-.553.447-1 1-1s1 .447 1 1v5.5c0 .553-.447 1-1 1z' />
                <circle cx={12} cy='8.042' r='1.25' />
                <path d='M12 22.75C6.072 22.75 1.25 17.928 1.25 12S6.072 1.25 12 1.25 22.75 6.072 22.75 12 17.928 22.75 12 22.75zm0-20C6.9 2.75 2.75 6.9 2.75 12S6.9 21.25 12 21.25s9.25-4.15 9.25-9.25S17.1 2.75 12 2.75z' />
              </g>
            </svg>
          </div>
        </div>
        <div className='flex pt-3 space-x-5 text-gray-500 border-t border-gray-300'>
          <div className='flex space-x-2'>
            <svg
              viewBox='0 0 24 24'
              fill='currentColor'
              className='w-6 h-6'
              style={{}}>
              <g>
                <path d='M12 21.638h-.014C9.403 21.59 1.95 14.856 1.95 8.478c0-3.064 2.525-5.754 5.403-5.754 2.29 0 3.83 1.58 4.646 2.73.814-1.148 2.354-2.73 4.645-2.73 2.88 0 5.404 2.69 5.404 5.755 0 6.376-7.454 13.11-10.037 13.157H12zM7.354 4.225c-2.08 0-3.903 1.988-3.903 4.255 0 5.74 7.034 11.596 8.55 11.658 1.518-.062 8.55-5.917 8.55-11.658 0-2.267-1.823-4.255-3.903-4.255-2.528 0-3.94 2.936-3.952 2.965-.23.562-1.156.562-1.387 0-.014-.03-1.425-2.965-3.954-2.965z' />
              </g>
            </svg>
            <span>783.9k</span>
          </div>
          <div className='flex space-x-2'>
            <svg viewBox='0 0 24 24' fill='currentColor' className='w-6 h-6'>
              <g>
                <path d='M14.046 2.242l-4.148-.01h-.002c-4.374 0-7.8 3.427-7.8 7.802 0 4.098 3.186 7.206 7.465 7.37v3.828c0 .108.044.286.12.403.142.225.384.347.632.347.138 0 .277-.038.402-.118.264-.168 6.473-4.14 8.088-5.506 1.902-1.61 3.04-3.97 3.043-6.312v-.017c-.006-4.367-3.43-7.787-7.8-7.788zm3.787 12.972c-1.134.96-4.862 3.405-6.772 4.643V16.67c0-.414-.335-.75-.75-.75h-.396c-3.66 0-6.318-2.476-6.318-5.886 0-3.534 2.768-6.302 6.3-6.302l4.147.01h.002c3.532 0 6.3 2.766 6.302 6.296-.003 1.91-.942 3.844-2.514 5.176z' />
              </g>
            </svg>
            <span>139.7k</span>
          </div>
          <div className='hidden space-x-2 sm:flex'>
            <svg
              viewBox='0 0 24 24'
              fill='currentColor'
              className='w-6 h-6'
              style={{}}>
              <g>
                <path d='M11.96 14.945c-.067 0-.136-.01-.203-.027-1.13-.318-2.097-.986-2.795-1.932-.832-1.125-1.176-2.508-.968-3.893s.942-2.605 2.068-3.438l3.53-2.608c2.322-1.716 5.61-1.224 7.33 1.1.83 1.127 1.175 2.51.967 3.895s-.943 2.605-2.07 3.438l-1.48 1.094c-.333.246-.804.175-1.05-.158-.246-.334-.176-.804.158-1.05l1.48-1.095c.803-.592 1.327-1.463 1.476-2.45.148-.988-.098-1.975-.69-2.778-1.225-1.656-3.572-2.01-5.23-.784l-3.53 2.608c-.802.593-1.326 1.464-1.475 2.45-.15.99.097 1.975.69 2.778.498.675 1.187 1.15 1.992 1.377.4.114.633.528.52.928-.092.33-.394.547-.722.547z' />
                <path d='M7.27 22.054c-1.61 0-3.197-.735-4.225-2.125-.832-1.127-1.176-2.51-.968-3.894s.943-2.605 2.07-3.438l1.478-1.094c.334-.245.805-.175 1.05.158s.177.804-.157 1.05l-1.48 1.095c-.803.593-1.326 1.464-1.475 2.45-.148.99.097 1.975.69 2.778 1.225 1.657 3.57 2.01 5.23.785l3.528-2.608c1.658-1.225 2.01-3.57.785-5.23-.498-.674-1.187-1.15-1.992-1.376-.4-.113-.633-.527-.52-.927.112-.4.528-.63.926-.522 1.13.318 2.096.986 2.794 1.932 1.717 2.324 1.224 5.612-1.1 7.33l-3.53 2.608c-.933.693-2.023 1.026-3.105 1.026z' />
              </g>
            </svg>
            <span>Copy link to tweet</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TwitterPreview;
