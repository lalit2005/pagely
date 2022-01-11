/* eslint-disable react-hooks/rules-of-hooks */
import GitHubPage from '@/components/github/GitHubPage';
import NotionPage from '@/components/notion/NotionPage';
import getFileUrlFromRepoUrl from '@/lib/github/getFileUrlFromRepoUrl';
import swrFetcher from '@/lib/swrFetcher';
import prisma from '@/utils/prisma';
import axios from 'axios';
import { GetStaticProps, GetStaticPaths } from 'next';
import { NotionAPI } from 'notion-client';
import { parsePageId } from 'notion-utils';
import NotFoundPage from 'pages/404';
import { useEffect, useState } from 'react';
import useSwr from 'swr';

function Page({
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
}) {
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
}

export default Page;

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const subdomain = params.subdomain as string;
  const fetchNotionSite = prisma.notionSites.findUnique({
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

  const fetchGithubSite = prisma.ghSites.findUnique({
    where: {
      subdomain: subdomain,
    },
  });

  const [siteData, githubSiteData] = await prisma.$transaction([
    fetchNotionSite,
    fetchGithubSite,
  ]);

  if (siteData) {
    const notion = new NotionAPI();
    const notionPageId = parsePageId(siteData.notionPageUrl);
    const recordMap = await notion.getPage(notionPageId);
    return {
      props: {
        homepage: false,
        subdomain: subdomain,
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
  } else if (githubSiteData) {
    const response = await axios.get(
      getFileUrlFromRepoUrl(githubSiteData.repoUrl)
    );
    return {
      props: {
        homepage: false,
        integration: 'github',
        subdomain: subdomain,
        repoUrl: githubSiteData.repoUrl,
        githubPageData: response.data,
      },
    };
  } else {
    return {
      props: {
        homepage: false,
        notFound: true,
      },
    };
  }
};

export const getStaticPaths: GetStaticPaths = () => {
  return {
    paths: [],
    fallback: 'blocking',
  };
};
