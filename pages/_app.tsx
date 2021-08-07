/* eslint-disable @next/next/no-page-custom-font */
import {
  ClerkProvider,
  RedirectToSignIn,
  SignedIn,
  SignedOut,
} from '@clerk/clerk-react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Script from 'next/script';

// global styles shared across the entire site
import '../styles/globals.css';

// core styles shared by all of react-notion-x (required)
import 'react-notion-x/src/styles.css';

// used for code syntax highlighting (optional)
import 'prismjs/themes/prism-coy.css';

// this might be better for dark mode
import 'prismjs/themes/prism-okaidia.css';

// used for collection views selector (optional)
// TODO: re-add if we enable collection view dropdowns
import 'rc-dropdown/assets/index.css';

// used for rendering equations (optional)
import 'katex/dist/katex.min.css';

// core styles for static tweet renderer (optional)
// import "react-static-tweets/styles.css";

import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';

// global style overrides for notion
import '../styles/notion.css';

// global style overrides for prism theme (optional)
import '../styles/prism-theme.css';

// here we're bringing in any languages we want to support for
// syntax highlighting via Notion's Code block
import 'prismjs';
import 'prismjs/components/prism-markup';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-bash';

/**
 * List pages you want to be publicly accessible, or leave empty if
 * every page requires authentication. Use this naming strategy:
 *  "/"              for pages/index.js
 *  "/foo"           for pages/foo/index.js
 *  "/foo/bar"       for pages/foo/bar.js
 *  "/foo/[...bar]"  for pages/foo/[...bar].js
 */
// const publicPages = ["/", "/sign-in/[[...index]]", "/sign-up/[[...index]]"];
const privatePages = [
  '/dashboard',
  '/new',
  '/new/notion',
  '/new/airtable',
  '/new/github',
  '/new/sheets',
  '/notion-site/[notionId]',
  '/notion-site/[notionId]/code',
  '/notion-site/[notionId]/seo',
  '/notion-site/[notionId]/settings',
  '/notion-site/[notionId]/pages',
  '/github-site/[siteId]',
  '/github-site/[siteId]/code',
  '/github-site/[siteId]/settings',
  '/password-protecting/[siteId]',
];

const MyApp = ({ Component, pageProps }) => {
  const router = useRouter();
  /**
   * If the current route is listed as public, render it directly.
   * Otherwise, use Clerk to require authentication.
   */
  return (
    <ClerkProvider
      frontendApi={process.env.NEXT_PUBLIC_CLERK_FRONTEND_API}
      navigate={(to) => router.push(to)}>
      {privatePages.includes(router.pathname) ? (
        <>
          {process.env.NODE_ENV === 'production' && (
            <Script
              async
              defer
              data-website-id={process.env.NEXT_PUBLIC_ANALYTICS_ID}
              strategy='afterInteractive'
              src={process.env.NEXT_PUBLIC_ANALYTICS_URL}
            />
          )}
          <Head>
            <link rel='preconnect' href='https://fonts.googleapis.com' />
            <link
              rel='preconnect'
              href='https://fonts.gstatic.com'
              crossOrigin='true'
            />
            <link
              href='https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap'
              rel='stylesheet'
            />
          </Head>
          <SignedIn>
            <Component {...pageProps} />
          </SignedIn>
          <SignedOut>
            <RedirectToSignIn />
          </SignedOut>
        </>
      ) : (
        <>
          <Script
            async
            defer
            data-website-id={process.env.NEXT_PUBLIC_ANALYTICS_ID}
            strategy='afterInteractive'
            src={process.env.NEXT_PUBLIC_ANALYTICS_URL}
          />
          <Head>
            <link rel='preconnect' href='https://fonts.googleapis.com' />
            <link
              rel='preconnect'
              href='https://fonts.gstatic.com'
              crossOrigin='true'
            />
            <link
              href='https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap'
              rel='stylesheet'
            />
          </Head>
          <Component {...pageProps} />
        </>
      )}
    </ClerkProvider>
  );
};

export default MyApp;
