import { SignedIn, SignedOut } from '@clerk/clerk-react';
import Image from 'next/image';
import Link from 'next/link';
import Logo from '@/public/logo.png';

export default function Navbar() {
  return (
    <div className='!sticky !top-0 z-50 backdrop-blur-sm bg-white/90 backdrop-filter'>
      <div className='flex items-center justify-between py-5 mx-auto mb-10 max-w-7xl'>
        <div className='max-w-[120px]'>
          <Image src={Logo} alt='Pagely' placeholder='blur' />
        </div>
        <div>
          <ul className='flex list-none justify-evenly'>
            <li className='mx-3 text-gray-700 hover:text-gray-900'>
              <Link href='/showcase'>Showcase</Link>
            </li>
            <li className='mx-3 text-gray-700 hover:text-gray-900'>
              <Link href='#'>Guides</Link>
            </li>
            <li className='mx-3 text-gray-700 hover:text-gray-900'>
              <Link href='#'>Templates</Link>
            </li>
            <li className='mx-3 text-gray-700 hover:text-gray-900'>
              <Link href='#'>Support</Link>
            </li>
          </ul>
        </div>
        <div>
          <SignedIn>
            <Link href='/dashboard'>
              <a className='inline-flex items-center justify-center px-5 py-[6px] ml-4 text-base font-medium text-blue-600 border border-blue-100 rounded shadow-sm bg-blue-50 hover:bg-blue-100'>
                Dashboard -{'>'}
              </a>
            </Link>
          </SignedIn>
          <SignedOut>
            <Link href='/sign-in'>
              <a className='inline-flex items-center justify-center px-5 py-[6px] ml-4 text-base font-medium text-blue-600 border border-blue-100 rounded shadow-sm bg-blue-50 hover:bg-blue-100'>
                Login
              </a>
            </Link>
            <Link href='/sign-up'>
              <a className='inline-flex items-center justify-center px-5 py-[6px] ml-4 text-base font-medium text-white border border-transparent rounded shadow-sm bg-custom-blue hover:bg-blue-700'>
                Sign Up
              </a>
            </Link>
          </SignedOut>
        </div>
      </div>
    </div>
  );
}
