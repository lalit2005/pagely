/* eslint-disable react-hooks/rules-of-hooks */
import { NotionAPI } from 'notion-client';
import Homepage from '@/components/Homepage';
import { GetServerSideProps } from 'next';
import NotionPage from '@/components/notion/NotionPage';
import { parsePageId } from 'notion-utils';
import NotFoundPage from '@/components/NotFoundPage';

import prisma from '@/utils/prisma';
import useSwr from 'swr';
import { useState } from 'react';
import swrFetcher from '@/lib/swrFetcher';
import { useEffect } from 'react';

const Page = ({
  homepage,
  subdomain,
  integration,
  recordMap,
  customHead,
  customCss,
  notFound,
  pageId,
  siteName,
  siteDesc,
  ogImageUrl,
}) => {
  if (homepage) {
    return (
      <div>
        <Homepage />
      </div>
    );
  }

  if (notFound) {
    return <NotFoundPage />;
  }

  if (integration === 'notion') {
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
        <NotionPage
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
  }

  return <div>{subdomain} not found</div>;
};

export default Page;

// @ts-ignore
export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  try {
    const reqUrl = req.headers.host;
    res.setHeader(
      'Cache-Control',
      'public, s-maxage=60, stale-while-revalidate=59'
    );

    if (process.env.NODE_ENV !== 'production') {
      if (
        new URL('http://' + reqUrl).origin.split('.')[0] ===
        'http://localhost:3000'
      ) {
        return {
          props: {
            homepage: true,
            subdomain: false,
          },
        };
      } else if (
        new URL('http://' + reqUrl).origin.includes('localhost:3000')
      ) {
        const subdomain = reqUrl.split('.')[0];
        const siteData = await prisma.notionSites.findUnique({
          where: {
            subdomain: subdomain,
          },
          select: {
            notionPageUrl: true,
            siteName: true,
            siteDesc: true,
            customCss: true,
            ogImageUrl: true,
            customHead: true,
          },
        });

        const notion = new NotionAPI();
        const notionPageId = parsePageId(siteData.notionPageUrl);
        const recordMap = await notion.getPage(notionPageId);
        return {
          props: {
            homepage: false,
            subdomain: reqUrl.split('.')[0],
            recordMap: recordMap,
            integration: 'notion',
            pageId: notionPageId,
            siteName: siteData.siteName,
            siteDesc: siteData.siteDesc,
            ogImageUrl: siteData.ogImageUrl,
            customCss: siteData.customCss,
            customHead: siteData.customHead,
          },
        };
      }
    }

    if (new URL('https://' + reqUrl).host === 'pagely.site') {
      return {
        props: {
          homepage: true,
          subdomain: '',
        },
      };
    } else {
      const subdomain = reqUrl.split('.')[0];
      const siteData = await prisma.notionSites.findUnique({
        where: {
          subdomain: subdomain,
        },
        select: {
          notionPageUrl: true,
          siteName: true,
          siteDesc: true,
          customCss: true,
          ogImageUrl: true,
          customHead: true,
        },
      });

      const notion = new NotionAPI();
      const notionPageId = parsePageId(siteData.notionPageUrl);
      const recordMap = await notion.getPage(notionPageId);
      return {
        props: {
          homepage: false,
          subdomain: subdomain,
          recordMap: recordMap,
          integration: 'notion',
          customCss: siteData.customCss,
          pageId: notionPageId,
          siteName: siteData.siteName,
          siteDesc: siteData.siteDesc,
          ogImageUrl: siteData.ogImageUrl,
          customHead: siteData.customHead,
        },
      };
    }
  } catch (e) {
    return {
      props: {
        notFound: true,
      },
    };
  }
};
