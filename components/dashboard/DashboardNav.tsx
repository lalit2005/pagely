import Image from 'next/image';
import { useUser, useClerk } from '@clerk/clerk-react';

import Logo from '@/public/logo.png';
import ProfileDropdown from '../popovers/ProfileDropdown';

const DashboardNav: React.FC<{ profileDropdown?: boolean }> = ({
  profileDropdown = true,
}) => {
  const { emailAddresses, profileImageUrl, fullName, firstName } = useUser();
  const { signOut } = useClerk();
  return (
    <div>
      <div className='!sticky !top-0 z-50 backdrop-blur-sm bg-white/90 backdrop-filter px-10'>
        <div className='flex items-center justify-between max-w-5xl py-5 mx-auto mb-10'>
          <div className='max-w-[120px]'>
            <Image src={Logo} alt='Pagely' placeholder='blur' />
          </div>
          <div>
            {profileDropdown && (
              <ProfileDropdown
                emailAddresses={emailAddresses}
                profileImageUrl={profileImageUrl}
                fullName={fullName}
                firstName={firstName}
                signOut={signOut}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardNav;
