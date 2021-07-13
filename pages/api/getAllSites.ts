import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import { requireSession } from "@clerk/clerk-sdk-node";

const prisma = new PrismaClient();

export default requireSession(
  async (req: NextApiRequest, res: NextApiResponse) => {
    // @ts-ignore
    const userId = req.session.userId;

    const sites = await prisma.notionSites.findMany({
      where: {
        createdBy: userId,
      },
    });

    console.log(sites);

    res.json(sites);
  }
);
