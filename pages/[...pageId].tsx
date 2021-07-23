import { NotionAPI } from 'notion-client';
import { GetServerSideProps } from 'next';
import { parsePageId } from 'notion-utils';

import prisma from '@/utils/prisma';

const Page = () => {
  return <div>Enter</div>;
};

export default Page;

// @ts-ignore
export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const pageId = parsePageId(req.url);
  return;
};
