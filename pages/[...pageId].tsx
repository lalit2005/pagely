/* eslint-disable react-hooks/rules-of-hooks */
import { NotionAPI } from 'notion-client';
import { GetServerSideProps } from 'next';
import { parsePageId } from 'notion-utils';

import prisma from '@/utils/prisma';
import NotFoundPage from '@/components/NotFoundPage';
import NotionSubPage from '@/components/notion/NotionSubPage';
import { useEffect, useState } from 'react';
import useSwr from 'swr';
import swrFetcher from '@/lib/swrFetcher';

const Page = ({
  notFound,
  recordMap,
  customCss,
  customHead,
  pageId,
  subdomain,
  ogImageUrl,
  siteName,
  siteDesc,
}) => {
  if (notFound) {
    return <NotFoundPage />;
  }

  const [pageData, setPageData] = useState(recordMap);
  const [css, setCss] = useState<string>(customCss);
  const [head, setHead] = useState<string>(customHead);
  let notionPageData = useSwr(
    `/api/getSiteData/notionPageData/?pageId=${pageId}&subdomain=${subdomain}`,
    swrFetcher
  ).data;

  useEffect(() => {
    if (notionPageData?.success) {
      setPageData(notionPageData?.recordMap);
      setCss(notionPageData?.customCss);
      setHead(notionPageData?.customHead);
    }
  }, [notionPageData]);

  return (
    <div>
      <NotionSubPage
        recordMap={pageData}
        customCss={css}
        pageId={pageId}
        url={`https://${subdomain}.pagely.site`}
        ogImageUrl={ogImageUrl}
        siteName={siteName}
        siteDesc={siteDesc}
        customHead={head}
      />
    </div>
  );
};

export default Page;

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  res.setHeader(
    'Cache-Control',
    'public, s-maxage=900, stale-while-revalidate=59'
  );

  try {
    const notion = new NotionAPI();
    // console.log(req.url);
    const recordMap = await notion.getPage(req.url.substr(0));

    const subdomain = req.headers.host.split('.')[0];

    const pageMetaData = await prisma.notionSites.findUnique({
      where: {
        subdomain: subdomain,
      },
      select: {
        customCss: true,
        customHead: true,
        siteName: true,
        siteDesc: true,
      },
    });

    return {
      props: {
        recordMap,
        notFound: false,
        customCss: pageMetaData.customCss,
        customHead: pageMetaData.customHead,
        siteName: pageMetaData.siteName,
        siteDesc: pageMetaData.siteDesc,
        pageId: parsePageId(req.url.substr(0)),
        subdomain: subdomain,
      },
    };
  } catch (e) {
    return {
      notFound: true,
    };
  }
};
