import { headers } from 'next/headers';

import { getCurrentUser } from '@/services/auth';

import Header from './header';

export default async function Home() {
  const data = await getCurrentUser();

  const { currentUser } = data;

  return (
    <div>
      <Header currentUser={currentUser} />
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        Ticketing Dashboard
        <div>{currentUser?.email}</div>
      </main>
    </div>
  );
}
