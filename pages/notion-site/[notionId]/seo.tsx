import SidebarLayout from '@/layouts/SidebarLayout';

const seo = () => {
  return (
    <div>
      <SidebarLayout activeTab='seo'>
        <div className='page-title'>
          <h1 className='text-4xl font-bold bg-gray-100'>SEO</h1>
        </div>
        <div className='page-content'>
          <p>This page is a stub for the SEO section of a site.</p>
          <p>
            Please use the links below to navigate to the appropriate sections.
          </p>
          <ul>
            <li>
              <a href='#title'>Title</a>
            </li>
            <li>
              <a href='#description'>Description</a>
            </li>
            <li>
              <a href='#keywords'>Keywords</a>
            </li>
          </ul>
        </div>
      </SidebarLayout>
    </div>
  );
};

export default seo;
