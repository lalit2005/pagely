/* eslint-disable react-hooks/rules-of-hooks */
import { NotionAPI } from 'notion-client';
import { GetServerSideProps } from 'next';
import { parsePageId } from 'notion-utils';

import prisma from '@/utils/prisma';
import axios from 'axios';
import getFileUrlFromRepoUrl from '@/lib/github/getFileUrlFromRepoUrl';

// @ts-ignore
const handleIndexRoute: GetServerSideProps = async ({ req, res }) => {
  try {
    const reqUrl = req.headers.host;
    res.setHeader(
      'Cache-Control',
      'public, s-maxage=900, stale-while-revalidate=59'
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
        console.log('Trying before fetching notion sites');
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

        console.log(siteData);
        // console.log(siteData.toString());
        console.log(typeof siteData);

        if (siteData) {
          console.log('Trying to fetch notion sites');
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
        } else if (githubSiteData) {
          console.log('Trying to fetch github sites');

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
              customCss: githubSiteData.customCss,
              customHead: githubSiteData.customHead,
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
      }
    } else if (new URL('https://' + reqUrl).host === 'pagely.site') {
      return {
        props: {
          homepage: true,
          subdomain: '',
        },
      };
    } else {
      const subdomain = reqUrl.split('.')[0];
      console.log('Trying before fetching notion sites');
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

      console.log(siteData);
      // console.log(siteData.toString());
      console.log(typeof siteData);

      if (siteData) {
        console.log('Trying to fetch notion sites');
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
      } else if (githubSiteData) {
        console.log('Trying to fetch github sites');
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
    }
  } catch (e) {
    console.log(e);
    return {
      props: {
        notFound: true,
      },
    };
  }
};

export default handleIndexRoute;
