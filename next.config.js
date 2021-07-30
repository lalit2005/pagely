// @ts-check

/**
 * @type {import('next/dist/next-server/server/config').NextConfig}
 **/

// @ts-ignore
module.exports = {
  async rewrites() {
    return [
      {
        source: '/guides/:slug*',
        destination: 'https://guides.pagely.site/:slug*',
      },
      {
        source: '/support',
        destination: 'https://support.pagely.site/',
      },
      {
        source: '/templates',
        destination: 'https://templates.pagely.site/',
      },
    ];
  },
};
