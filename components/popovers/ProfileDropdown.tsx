import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import * as Tooltip from '@radix-ui/react-tooltip';
import Link from 'next/link';

const ProfileDropdown = ({
  emailAddresses,
  profileImageUrl,
  fullName,
  firstName,
  signOut,
}) => {
  return (
    <div>
      <DropdownMenu.Root>
        <DropdownMenu.Trigger className='focus:outline-none focus:ring-transparent'>
          <Tooltip.Root delayDuration={1}>
            <Tooltip.Trigger>
              <div className='w-10 h-10'>
                <Link href='/dashboard'>
                  <a>
                    {/* eslint-disable-next-line  @next/next/no-img-element */}
                    <img
                      className='rounded-full'
                      src={profileImageUrl}
                      alt={fullName}
                    />
                  </a>
                </Link>
              </div>
            </Tooltip.Trigger>
            <Tooltip.Content
              side='left'
              sideOffset={10}
              className='px-2 py-px text-gray-100 bg-gray-900 rounded'>
              {fullName === '' || ' '
                ? emailAddresses.toString().split('@')[0]
                : fullName}
              <Tooltip.Arrow />
            </Tooltip.Content>
          </Tooltip.Root>
        </DropdownMenu.Trigger>
        <DropdownMenu.Content>
          <div className='list-none bg-white'>
            <ul className='py-2 my-2 border border-gray-300 rounded-md shadow-lg'>
              <DropdownMenu.Group>
                <li className='focus:bg-blue-100 hover:bg-blue-100'>
                  <div className='block px-5 py-2'>
                    <p>Hello {firstName} 👋</p>
                    <p className='text-base text-gray-500'>
                      {emailAddresses.toString()}
                    </p>
                  </div>
                </li>
              </DropdownMenu.Group>
              <DropdownMenu.Group>
                <li className='focus:bg-blue-100 hover:bg-blue-100'>
                  <Link href='#'>
                    <a className='block px-5 py-2'>Support</a>
                  </Link>
                </li>
              </DropdownMenu.Group>
              <DropdownMenu.Group>
                <li className='focus:bg-blue-100 hover:bg-blue-100'>
                  <Link href='#'>
                    <a className='block px-5 py-2'>Templates</a>
                  </Link>
                </li>
              </DropdownMenu.Group>
              <DropdownMenu.Group>
                <li className='focus:bg-blue-100 hover:bg-blue-100'>
                  <Link href='/showcase'>
                    <a className='block px-5 py-2'>Showcase</a>
                  </Link>
                </li>
              </DropdownMenu.Group>
              <DropdownMenu.Group>
                <li className='focus:bg-blue-100 hover:bg-blue-100'>
                  <Link href='/user'>
                    <a className='block px-5 py-2'>Manage Account</a>
                  </Link>
                </li>
              </DropdownMenu.Group>
              <DropdownMenu.Group>
                <li className='focus:bg-blue-100 hover:bg-blue-100'>
                  <button
                    className='block px-5 py-2'
                    onClick={() => {
                      signOut();
                    }}>
                    Logout
                  </button>
                </li>
              </DropdownMenu.Group>
            </ul>
          </div>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    </div>
  );
};

export default ProfileDropdown;
