import { NextApiRequest, NextApiResponse } from 'next';
import { requireSession } from '@clerk/clerk-sdk-node';

import prisma from '@/utils/prisma';

export default requireSession(
  async (req: NextApiRequest, res: NextApiResponse) => {
    const siteData = await prisma.notionSites.update({
      data: {
        // @ts-ignore
        isPasswordProtected: req.body.isPasswordProtected,
      },
      where: {
        id: req.body.siteId.toString(),
      },
    });
    res.json(siteData);
  }
);
