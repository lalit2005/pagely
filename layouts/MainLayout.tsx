import DashboardNav from "@/components/dashboard/DashboardNav";

const MainLayout = (props) => {
  return (
    <div className="min-h-screen">
      <DashboardNav />
      <main className="">
        <div className="pagely-container">{props.children}</div>
      </main>
    </div>
  );
};

export default MainLayout;
