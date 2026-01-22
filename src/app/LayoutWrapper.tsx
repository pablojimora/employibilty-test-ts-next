'use client';

import { useAuth } from '@/contexts/AuthContext';
import { useRouter, usePathname } from 'next/navigation';
import { Sidebar } from './components/Sidebar';

export function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const { user, logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  const isAuthPage = pathname === '/login' || pathname === '/register';

  if (isAuthPage || !user) {
    return <>{children}</>;
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar
        title="Menú"
        userName={user.name}
        items={[
          { label: 'Dashboard', icon: '📊', active: pathname === '/dashboard', onClick: () => router.push('/dashboard') },
          { label: 'Home', icon: '🏠', active: pathname === '/home', onClick: () => router.push('/home') },
        ]}
        onLogout={() => {
          logout();
          router.push('/login');
        }}
      />

      <div style={{ marginLeft: '260px', width: 'calc(100% - 260px)' }} className="flex-1">
        {children}
      </div>
    </div>
  );
}
