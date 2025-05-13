
'use client';

import type { ReactNode } from 'react';
import { useAuth } from '@/contexts/auth-context';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Loader2 } from 'lucide-react';

export default function CoursesLayout({ children }: { children: ReactNode }) {
  const { user, isLoading, isAuthenticated } = useAuth(); // Removed isAdmin, isUser as they are not needed for the general check
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      // If not loading and not authenticated, redirect to login
      router.replace('/login');
    }
  }, [isLoading, isAuthenticated, router]);

  if (isLoading || !isAuthenticated) {
    // Show loader if auth is loading or user is not authenticated
    // This will allow any authenticated user (admin or regular user) to pass once loaded.
    return (
      <div className="flex flex-col justify-center items-center min-h-[calc(100vh-theme(space.16))]"> {/* Adjust height considering header */}
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
        <p className="mt-4 text-lg text-muted-foreground">Loading course content...</p>
      </div>
    );
  }

  return <>{children}</>;
}

