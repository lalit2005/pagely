/* eslint-disable react-hooks/rules-of-hooks */
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
import { useState } from 'react';

const Tweet = dynamic(() => import('react-tweet-embed'));

const Modal = dynamic(
  () => import('react-notion-x').then((notion) => notion.Modal),
  { ssr: false }
);

export default function Home({
  recordMap,
  customCss: css,
  customHead: head,
  pageId,
  url,
  ogImageUrl,
  siteName,
  siteDesc,
}) {
  if (!recordMap) {
    return null;
  }
  const title = getPageTitle(recordMap) || siteName;
  const ogImage =
    'https://ogimage.glitch.me/i/' + encodeURIComponent(title) || ogImageUrl;

  useEffect(() => {
    window.addEventListener('load', () => {
      const link = document.createElement('link');
      link.rel = 'icon';
      const pageIconEmoji = document.querySelector('.notion-page-icon');
      link.href = `data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>${
        pageIconEmoji?.innerHTML || '⚡️'
      }</text></svg>`;
      document.getElementsByTagName('head')[0]?.appendChild(link);
    });
  }, []);
  const [customCss, setCustomCss] = useState(css);
  const [customHead, setCustomHead] = useState(head);

  return (
    <div>
      <Head>
        <style>{`
					.pagely-container {
						font-family: 'Inter', 'monospace' !important;
					}
				`}</style>
        <style dangerouslySetInnerHTML={{ __html: customCss }} />
        <div dangerouslySetInnerHTML={{ __html: customHead }} />
      </Head>
      <NextSeo
        title={title}
        description={siteDesc}
        canonical={url}
        openGraph={{
          title: title,
          url: url,
          images: [
            {
              url: ogImage,
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
