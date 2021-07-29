/* eslint-disable react-hooks/rules-of-hooks */
import { NotionAPI } from 'notion-client';
import Homepage from '@/components/Homepage';
import { GetServerSideProps } from 'next';
import NotionPage from '@/components/notion/NotionPage';
import GitHubPage from '@/components/github/GitHubPage';
import { parsePageId } from 'notion-utils';
import NotFoundPage from '@/components/NotFoundPage';

import prisma from '@/utils/prisma';
import useSwr from 'swr';
import { useState } from 'react';
import swrFetcher from '@/lib/swrFetcher';
import { useEffect } from 'react';
import axios from 'axios';
import getFileUrlFromRepoUrl from '@/lib/github/getFileUrlFromRepoUrl';
import handleIndexRoute from '@/lib/handleIndexRoute';

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
  githubPageData,
  repoUrl,
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

  if (integration === 'github') {
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
        <GitHubPage
          repoUrl={repoUrl}
          data={githubPageData}
          subdomain={subdomain}
          customCss={customCss}
          customHead={customHead}
        />
      </div>
    );
  }

  if (integration === 'notion') {
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
        <NotionPage
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

  return <div>{subdomain} not found</div>;
};

export default Page;

// @ts-ignore
export const getServerSideProps: GetServerSideProps = handleIndexRoute;
