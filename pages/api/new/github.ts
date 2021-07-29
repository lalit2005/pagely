import { NextApiRequest, NextApiResponse } from 'next';
import { ghSites } from '@prisma/client';
import { requireSession } from '@clerk/clerk-sdk-node';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';

import prisma from '@/utils/prisma';

export default requireSession(
  async (req: NextApiRequest, res: NextApiResponse) => {
    // @ts-ignore
    const userId = req.session.userId;
    const data = req.body;

    // destructure data object
    const { siteName, subdomain, repoUrl } = data;
    console.log(data);
    try {
      const response = await prisma.ghSites.create({
        data: {
          createdBy: userId,
          subdomain: subdomain,
          repoUrl: repoUrl,
          siteName: siteName,
        },
      });
      res.json({
        success: true,
        data: response,
      });
    } catch (error) {
      console.log(error);
      const e: PrismaClientKnownRequestError = error;
      if (e.code === 'P2002') {
        // @ts-ignore
        if (e.meta.target[0] === 'repoUrl') {
          res.json({
            success: false,
            error: 'GitHub repo url already exists',
          });
        } else {
          res.json({
            success: false,
            error: 'Subdomain already exists',
          });
        }
      } else {
        res.json({
          success: false,
          error: error.message,
        });
      }
    }
  }
);
