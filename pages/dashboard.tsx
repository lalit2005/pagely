import SiteCard from "@/components/dashboard/SiteCard";
import { useClerkSWR } from "@/lib/fetcher";
import { notionSites } from "@prisma/client";
import MainLayout from "layouts/mainLayout";
import Skeleton from "react-loading-skeleton";

const Dashboard = () => {
  const { data, error } = useClerkSWR<notionSites[]>("/api/getAllSites");
  console.log(data);
  return (
    <MainLayout>
      <div>
        <div className="max-w-5xl mx-auto">
          <h1 className="text-4xl font-bold">Your websites</h1>
          <div className="mt-20">
            {data?.map((site) => (
              // @ts-ignore
              <SiteCard key={site.id} siteData={site} />
            ))}
            {error && <h1>An error occured</h1>}
            {!error && !data && (
              <Skeleton
                width="384px"
                height="130px"
                count={3}
                className="!block mt-5"
              />
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Dashboard;
