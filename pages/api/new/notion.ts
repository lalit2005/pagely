import { NextApiRequest, NextApiResponse } from 'next';
import { notionSites } from '@prisma/client';
import { requireSession } from '@clerk/clerk-sdk-node';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';

import prisma from '@/utils/prisma';

export default requireSession(
  async (req: NextApiRequest, res: NextApiResponse) => {
    console.log('Yesssssss :|');
    // @ts-ignore
    const userId = req.session.userId;
    const data: notionSites = req.body;
    // destructure data object
    const { siteName, siteDesc, subdomain, ogImageUrl, notionPageUrl } = data;

    try {
      const response = await prisma.notionSites.create({
        data: {
          siteName,
          siteDesc,
          subdomain,
          ogImageUrl,
          notionPageUrl,
          createdBy: userId,
        },
      });
      res.json({
        success: true,
        data: response,
      });
    } catch (error) {
      const e: PrismaClientKnownRequestError = error;
      if (e.code === 'P2002') {
        // @ts-ignore
        if (e.meta.target[0] === 'notionPageUrl') {
          res.json({
            success: false,
            error: 'Notion page url already exists',
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
