import { NextApiRequest, NextApiResponse } from 'next';
import { requireSession } from '@clerk/clerk-sdk-node';

import prisma from '@/utils/prisma';

export default requireSession(
  async (req: NextApiRequest, res: NextApiResponse) => {
    const siteData = await prisma.ghSites.update({
      data: {
        inShowcase: req.body.inShowcase,
      },
      where: {
        id: req.body.siteId.toString(),
      },
    });
    res.json(siteData);
  }
);
