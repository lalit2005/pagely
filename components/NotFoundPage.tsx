import Navbar from './Navbar';

const NotFoundPage = () => {
  return (
    <div>
      <Navbar />
      <div className='mt-10 text-center'>
        <h1 className='text-4xl font-bold'>404</h1>
        <h2 className='text-3xl font-bold'>Page not found 🤨</h2>
        <p className='mt-10'>
          You are in a place that does not exist in the internet (yet)
        </p>
        <div className='mt-10'>
          <a
            href='https://pagely.site/'
            className='px-3 py-1 mt-10 text-xl border border-blue-500 rounded shadow bg-blue-50 hover:bg-blue-100'>
            {'<'}- Go back to home
          </a>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
