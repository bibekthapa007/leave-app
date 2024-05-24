import Link from 'next/link';
import React from 'react';

import paths from '@/utils/path';

function Header({ currentUser }: { currentUser: any }) {
  return (
    <div className="flex justify-between m-2 p-2">
      <Link href={paths.home} className="semibold">
        Ticketing
      </Link>

      {!currentUser && (
        <div>
          <Link href={paths.signin}>Sign in</Link>
          <Link href={paths.signup}>Sign up</Link>
        </div>
      )}

      {currentUser && (
        <div>
          <div>Sign out</div>
        </div>
      )}
    </div>
  );
}

export default Header;
