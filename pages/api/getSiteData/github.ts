import { NextApiRequest, NextApiResponse } from 'next';
import { requireSession } from '@clerk/clerk-sdk-node';

import prisma from '@/utils/prisma';

export default requireSession(
  async (req: NextApiRequest, res: NextApiResponse) => {
    // @ts-ignore
    const userId = req.session.userId;
    console.log(req.query.siteId.toString());
    const siteData = await prisma.ghSites.findFirst({
      where: {
        createdBy: userId,
        id: req.query.siteId.toString(),
      },
    });

    console.log(siteData);

    res.json(siteData);
  }
);
