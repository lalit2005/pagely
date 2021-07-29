/* eslint-disable react-hooks/rules-of-hooks */
import Head from 'next/head';
import { NextSeo } from 'next-seo';
import Minimal from '../templates/github/minimal';

export default function Home({
  data,
  subdomain,
  repoUrl,
  customHead,
  customCss,
}) {
  if (!data) {
    return null;
  }

  const {
    title,
    ogImageUrl,
    name: siteName,
    description: siteDesc,
    template,
    faviconLink,
  } = data;
  const url = 'https://' + subdomain + '.pagely.site';

  const ogImage =
    ogImageUrl === ''
      ? 'https://ogimage.glitch.me/i/' + encodeURIComponent(title)
      : ogImageUrl;

  return (
    <div>
      <Head>
        <style>{`
					.pagely-container {
						font-family: 'Inter', 'monospace' !important;
					}
				`}</style>
        <link rel='shortcut icon' href={faviconLink} type='image/x-icon' />
        <style dangerouslySetInnerHTML={{ __html: customCss }} />
        <div dangerouslySetInnerHTML={{ __html: customHead }} />
      </Head>
      <NextSeo
        title={siteName}
        description={siteDesc}
        canonical={url}
        openGraph={{
          title: siteName,
          url: url,
          images: [
            {
              url: ogImage === 'https://no-og.image' ? '' : ogImage,
              alt: title,
            },
          ],
          description: siteDesc,
        }}
        twitter={{
          cardType: 'summary_large_image',
        }}
      />
      {/* <h1 className='text-3xl font-bold'>{customHead}</h1> */}
      {template === 'minimal' && <Minimal repoUrl={repoUrl} {...data} />}
    </div>
  );
}
