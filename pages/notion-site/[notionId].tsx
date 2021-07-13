import { useRouter } from "next/router";

const Page = () => {
  const router = useRouter();

  return <div>{router.query.notionId}</div>;
};

export default Page;
