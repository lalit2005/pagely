import DashboardNav from '@/components/dashboard/DashboardNav';

const MainLayout: React.FC<{ profileDropdown?: boolean }> = ({
  profileDropdown = true,
  ...props
}) => {
  return (
    <div className='min-h-screen'>
      <DashboardNav profileDropdown={profileDropdown} />
      <main className='px-10'>
        <div className='max-w-5xl mx-auto pagely-container'>
          {props.children}
        </div>
      </main>
    </div>
  );
};

export default MainLayout;
