/* eslint-disable react-hooks/rules-of-hooks */
import NotionSubPage from '@/components/notion/NotionSubPage';
import swrFetcher from '@/lib/swrFetcher';
import prisma from '@/utils/prisma';
import { GetStaticPaths, GetStaticProps } from 'next';
import { NotionAPI } from 'notion-client';
import { parsePageId } from 'notion-utils';
import { useState, useEffect } from 'react';
import useSwr from 'swr';

function Page({
  recordMap,
  customCss,
  customHead,
  pageId,
  subdomain,
  ogImageUrl,
  siteName,
  siteDesc,
}) {
  const [pageData, setPageData] = useState(recordMap);
  let notionPageData = useSwr(
    `/api/getSiteData/notionPageData/?pageId=${pageId}&subdomain=${subdomain}`,
    swrFetcher
  ).data;

  useEffect(() => {
    if (notionPageData?.success) {
      setPageData(notionPageData?.recordMap);
    }
  }, [notionPageData]);

  return (
    <div>
      <NotionSubPage
        recordMap={pageData}
        customCss={customCss}
        pageId={pageId}
        url={`https://${subdomain}.pagely.site`}
        ogImageUrl={ogImageUrl}
        siteName={siteName}
        siteDesc={siteDesc}
        customHead={customHead}
      />
    </div>
  );
}

export default Page;

export const getStaticProps: GetStaticProps = async ({ params }) => {
  try {
    const subdomain = params.subdomain as string;
    const pageId = params.pageId as string;
    const notion = new NotionAPI();
    const recordMap = await notion.getPage(pageId);
    console.log({
      subdomain,
      pageId,
    });

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
        pageId: parsePageId(pageId),
        subdomain: subdomain,
      },
    };
  } catch (e) {
    return {
      notFound: true,
    };
  }
};

export const getStaticPaths: GetStaticPaths = () => {
  return {
    paths: [],
    fallback: 'blocking',
  };
};
