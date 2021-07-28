import SidebarLayout from '@/layouts/SidebarLayout';

const Page = () => {
  return (
    <div>
      <div>
        <SidebarLayout activeTab='pages'>
          <h1 className='text-4xl font-extrabold'>Pages</h1>
          <p className='mt-5 text-lg'>
            Pretty URLs, Per page SEO settings and many more. Coming soon!!!
          </p>
        </SidebarLayout>
      </div>
    </div>
  );
};

export default Page;
