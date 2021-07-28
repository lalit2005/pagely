import { NextApiRequest, NextApiResponse } from 'next';
import { requireSession } from '@clerk/clerk-sdk-node';

import prisma from '@/utils/prisma';

export default requireSession(
  async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      let staleData = await prisma.notionSites.findUnique({
        where: {
          id: req.body.siteId.toString(),
        },
        select: {
          customHead: true,
        },
      });

      staleData.customHead +=
        staleData.customHead +
        '\n' +
        '<!-- Code to password protect site. Do not edit it -->' +
        '\n' +
        req.body.code.toString() +
        '\n' +
        '<!-- End of password protection code -->';

      const siteData = await prisma.notionSites.update({
        data: {
          isPasswordProtected: req.body.isPasswordProtected,
          customHead: staleData.customHead,
        },
        where: {
          id: req.body.siteId.toString(),
        },
      });
      res.json({
        siteData,
        success: true,
      });
    } catch (e) {
      console.log(e);
      res.json({
        success: false,
      });
    }
  }
);
