import {
  NotionRenderer,
  Code,
  Collection,
  CollectionRow,
} from 'react-notion-x';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import Head from 'next/head';
import { useEffect } from 'react';
import { NextSeo } from 'next-seo';
import { getPageTitle } from 'notion-utils';

const Pdf = dynamic(() =>
  import('react-notion-x').then((notion) => notion.Pdf)
);

const Tweet = dynamic(() => import('react-tweet-embed'));

const Modal = dynamic(
  () => import('react-notion-x').then((notion) => notion.Modal),
  { ssr: false }
);

export default function Home({
  recordMap,
  customCss,
  pageId,
  subdomain,
  ogImageUrl,
  siteName,
  siteDesc,
}) {
  if (!recordMap) {
    return null;
  }

  const title = getPageTitle(recordMap);
  console.log('From Notion page ' + title);

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    window.addEventListener('load', () => {
      const link = document.createElement('link');
      link.rel = 'icon';
      const pageIconEmoji = document.querySelector('.notion-page-icon');
      link.href = `data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>${
        pageIconEmoji.innerHTML || '⚡️'
      }</text></svg>`;
      document.getElementsByTagName('head')[0]?.appendChild(link);
    });
  }, []);

  return (
    <div>
      <Head>
        <link rel='preconnect' href='https://fonts.googleapis.com' />
        <link
          rel='preconnect'
          href='https://fonts.gstatic.com'
          crossOrigin='true'
        />
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link
          href='https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap'
          rel='stylesheet'
        />
        <style>{`
					.pagely-container {
						font-family: 'Inter', 'monospace' !important;
					}
				`}</style>
        <style>{customCss}</style>
      </Head>
      <NextSeo
        title={title}
        description={siteDesc}
        openGraph={{
          title: title,
          url: `https://${subdomain}.vercel.app`,
          images: [
            {
              url: ogImageUrl,
              alt: title,
            },
          ],
          description: siteDesc,
        }}
        twitter={{
          cardType: 'summary_large_image',
        }}
      />
      <NotionRenderer
        className='pagely-container'
        showCollectionViewDropdown={false}
        components={{
          pdf: Pdf,
          modal: Modal,
          tweet: Tweet,
          collection: Collection,
          collectionRow: CollectionRow,
          code: Code,
          // eslint-disable-next-line react/display-name
          pageLink: ({
            href,
            as,
            passHref,
            prefetch,
            replace,
            scroll,
            shallow,
            locale,
            ...props
          }) => (
            <Link
              href={href}
              as={as}
              passHref={passHref}
              prefetch={prefetch}
              replace={replace}
              scroll={scroll}
              shallow={shallow}
              locale={locale}>
              <a {...props} />
            </Link>
          ),
        }}
        recordMap={recordMap}
        fullPage={true}
        darkMode={false}
      />
    </div>
  );
}
