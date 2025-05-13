
'use client';

import type { ReactNode } from 'react';
import { useAuth } from '@/contexts/auth-context';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Loader2 } from 'lucide-react';

export default function CoursesLayout({ children }: { children: ReactNode }) {
  const { user, isLoading, isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && (!isAuthenticated || user?.role !== 'user')) {
      // Allow admins to view courses too, if desired. For now, strict to 'user'.
      // If not a 'user', redirect to login.
      // If an admin tries to access a user course page, they'd also be redirected.
      // This could be adjusted if admins should also browse courses as users.
      router.replace('/login');
    }
  }, [user, isLoading, isAuthenticated, router]);

  if (isLoading || !isAuthenticated || user?.role !== 'user') {
    return (
      <div className="flex flex-col justify-center items-center min-h-[calc(100vh-theme(space.16))]"> {/* Adjust height considering header */}
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
        <p className="mt-4 text-lg text-muted-foreground">Loading course content...</p>
      </div>
    );
  }

  return <>{children}</>;
}
