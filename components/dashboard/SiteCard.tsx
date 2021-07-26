import { notionSites } from '@prisma/client';
import Link from 'next/link';
import truncate from 'lodash.truncate';

const SiteCard: React.FC<{ siteData: notionSites }> = ({ siteData }) => {
  const { siteName, siteDesc, id, ogImageUrl } = siteData;
  return (
    <div className='max-w-[400px] mx-auto'>
      <Link href={`/notion-site/${id}`}>
        <a>
          <div className='mb-8 transition-all duration-500 border border-gray-300 rounded hover:shadow-xl'>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={ogImageUrl || '/no-og-image.png'}
              alt={siteName}
              className='object-cover w-full h-32 mx-auto rounded-t'
            />
            <div className='px-3 pt-4 pb-5'>
              <h2 className='text-2xl font-bold'>{siteName}</h2>
              <p className='mt-1 text-base text-gray-600'>
                {truncate(siteDesc, { length: 50 }) ||
                  'No description ¯\\_(ツ)_/¯'}
              </p>
            </div>
          </div>
        </a>
      </Link>
    </div>
  );
};

export default SiteCard;
