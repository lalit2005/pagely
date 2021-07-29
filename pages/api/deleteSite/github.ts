import { NextApiRequest, NextApiResponse } from 'next';
import { requireSession } from '@clerk/clerk-sdk-node';
import prisma from '@/utils/prisma';

export default requireSession(
  async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      const response = await prisma.ghSites.delete({
        where: {
          id: req.body.siteId,
        },
      });

      console.log(response);

      res.json({
        success: true,
        ...response,
      });
    } catch (error) {
      console.log(error);
      res.json({
        success: false,
      });
    }
  }
);
