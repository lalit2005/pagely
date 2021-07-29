import { NextSeo } from 'next-seo';
import Head from 'next/head';

/* eslint-disable @next/next/no-img-element */
const Minimal = ({
  repoUrl,
  name,
  backgroundColor,
  projectTitle,
  projectLogo,
  projectDesc,
  docsLink,
  feature1Title,
  feature1Desc,
  feature1Img,
  feature2Title,
  feature2Desc,
  feature2Img,
  feature3Title,
  feature3Desc,
  feature3Img,
  footerText1,
  footerLink1,
  footerText2,
  footerLink2,
  footerText3,
  footerLink3,
  footerText4,
  footerLink4,
}) => {
  return (
    <div className='pagely-container' style={{ backgroundColor }}>
      <nav className='sticky top-0 flex items-center justify-between w-screen px-10 py-4 border-b select-none border-gray-700/20 backdrop-blur-md backdrop-filter'>
        <div className='flex items-center'>
          <img src={projectLogo} alt='' className='w-8 h-8' />
          <p className='ml-2 text-2xl font-bold'>{name}</p>
        </div>
        <div>
          <a
            href={repoUrl}
            target='_blank'
            className='inline-flex items-center px-6 py-2 text-white bg-black rounded'
            rel='noreferrer noopener'>
            <span className='inline-block mr-2'>
              <svg
                stroke='currentColor'
                fill='none'
                strokeWidth={2}
                viewBox='0 0 24 24'
                strokeLinecap='round'
                strokeLinejoin='round'
                height='1em'
                width='1em'
                xmlns='http://www.w3.org/2000/svg'>
                <path d='M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22' />
              </svg>
            </span>
            GitHub
          </a>
        </div>
      </nav>
      <main>
        <section className='px-16 my-20 text-center'>
          <div>
            <img src={projectLogo} alt='' className='mx-auto mb-7 w-[150px]' />
          </div>
          <h1 className='text-5xl font-extrabold'>{projectTitle}</h1>
          <h2 className='mt-3 text-xl'>{projectDesc}</h2>
          <div className='mt-8'>
            <a
              className='px-6 py-2 text-white bg-black rounded'
              href={docsLink}>
              View Documentation →
            </a>
          </div>
        </section>
        <section id='feature' className=''>
          <div className='flex flex-col items-center px-16 py-10 mt-16 bg-gray-200 sm:flex-row'>
            <div className='flex-1 mr-3 text-center md:mr-10'>
              <h2 className='text-2xl font-bold'>{feature1Title}</h2>
              <p>{feature1Desc}</p>
            </div>
            <div className='flex-1'>
              <img
                src={feature1Img}
                className='mx-auto mt-10 rounded shadow-xl sm:max-w-sm sm:mt-auto'
                alt=''
              />
            </div>
          </div>
        </section>
        <section
          id='feature'
          className='flex flex-col-reverse items-center justify-between px-16 py-10 sm:flex-row'>
          <div className='flex-1 mr-3 md:mr-10'>
            <img
              src={feature2Img}
              className='mx-auto mt-5 rounded shadow-xl sm:max-w-sm sm:mt-auto'
              alt=''
            />
          </div>
          <div className='flex-1 text-center'>
            <h2 className='text-2xl font-bold'>{feature2Title}</h2>
            <p>{feature2Desc}</p>
          </div>
        </section>
        <section
          id='feature'
          className='flex flex-col items-center justify-between px-16 py-10 bg-gray-200 sm:flex-row'>
          <div className='flex-1 mr-3 text-center md:mr-10'>
            <h2 className='text-2xl font-bold'>{feature3Title}</h2>
            <p>{feature3Desc}</p>
          </div>
          <div className='flex-1'>
            <img
              src={feature3Img}
              className='mx-auto mt-10 rounded shadow-xl sm:max-w-sm sm:mt-auto'
              alt=''
            />
          </div>
        </section>
        <div className='my-24 text-center'>
          <a
            className='inline-block px-6 py-2 text-white bg-black rounded'
            href={docsLink}>
            View Documentation →
          </a>
        </div>
        <footer className='flex justify-around px-10 py-5 pb-10 mt-16 bg-gray-300'>
          <ul>
            <a href={footerLink1}>{footerText1}</a>
          </ul>
          <ul>
            <a href={footerLink2}>{footerText2}</a>
          </ul>
          <ul>
            <a href={footerLink3}>{footerText3}</a>
          </ul>
          <ul>
            <a href={footerLink4}>{footerText4}</a>
          </ul>
        </footer>
      </main>
      <style jsx>{`
			section#feature {
				max-width: 80rem;
				margin-top: 10rem;
			  margin-bottom: 10rem;
				margin-left: auto;
			  margin-right: auto;
				border-radius: 10px;
			`}</style>
    </div>
  );
};

export default Minimal;
