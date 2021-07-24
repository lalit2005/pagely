import prisma from '@/utils/prisma';
import { NextApiRequest, NextApiResponse } from 'next';
import { NotionAPI } from 'notion-client';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const pageData = await prisma.notionSites.findUnique({
      where: {
        subdomain: req.query.subdomain.toString(),
      },
      select: {
        customCss: true,
        customHead: true,
      },
    });

    const pageId = req.query.pageId;
    const notion = new NotionAPI();
    const recordMap = await notion.getPage(pageId.toString());

    console.log({
      success: true,
      recordMap: recordMap,
      customCss: pageData.customCss,
      customHead: pageData.customHead,
    });

    res.setHeader('Cache-Control', 's-maxage=60');
    res.json({
      success: true,
      recordMap: recordMap,
      customCss: pageData.customCss,
      customHead: pageData.customHead,
    });
  } catch (e) {
    console.log(e);
    res.json({
      success: false,
    });
  }
}
