// @ts-check

/**
 * @type {import('next/dist/next-server/server/config').NextConfig}
 **/

// @ts-ignore
module.exports = {
  async rewrites() {
    return [
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
