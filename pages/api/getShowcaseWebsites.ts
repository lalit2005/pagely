import { NextApiRequest, NextApiResponse } from 'next';
import { requireSession } from '@clerk/nextjs/api';
import prisma from '@/utils/prisma';

export default requireSession(
  async (req: NextApiRequest, res: NextApiResponse) => {
    const showcaseWebsites = await prisma.notionSites.findMany({
      where: {
        inShowcase: true,
      },
      select: {
        siteName: true,
        subdomain: true,
        ogImageUrl: true,
        id: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
    res.setHeader('Cache-Control', 's-maxage=1800');
    res.json(showcaseWebsites);
  }
);
