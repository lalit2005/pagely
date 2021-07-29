import { ghSites, notionSites } from '@prisma/client';
import Link from 'next/link';
import truncate from 'lodash.truncate';
import gh from 'parse-github-url';

const SiteCard: React.FC<{ siteData: ghSites }> = ({ siteData }) => {
  const { siteName, id, repoUrl } = siteData;
  return (
    <div className='max-w-[400px] mx-auto'>
      <Link href={`/github-site/${id}`}>
        <a>
          <div className='mb-8 transition-all duration-500 border border-gray-300 rounded hover:shadow-xl'>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`https://opengraph.githubassets.com/pagely/${
                gh(repoUrl).repository
              }`}
              alt={siteName}
              className='object-scale-down w-full h-32 mx-auto rounded-t'
            />
            <div className='px-3 pt-4 pb-5'>
              <h2 className='text-2xl font-bold'>{siteName}</h2>
            </div>
          </div>
        </a>
      </Link>
    </div>
  );
};

export default SiteCard;
