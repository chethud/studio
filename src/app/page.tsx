
'use client';

import { CourseCard } from '@/components/course/course-card';
import { COURSES } from '@/lib/data';
import type { Course } from '@/lib/data';
import { useAuth } from '@/contexts/auth-context';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Loader2 } from 'lucide-react';

export default function HomePage() {
  const { isLoading, isAuthenticated } = useAuth(); // Removed user, isUser, isAdmin as direct dependencies for this effect/check
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      // If not loading and not authenticated, redirect to login
      router.replace('/login');
    }
    // Admins are no longer redirected away from this page.
    // Users are also allowed.
  }, [isLoading, isAuthenticated, router]);

  if (isLoading || !isAuthenticated) {
    // Show loading spinner if auth is loading, or if user is not authenticated.
    // This applies to both admins and regular users before they are confirmed as authenticated.
    return (
      <div className="flex flex-col justify-center items-center min-h-[calc(100vh-theme(space.16))]"> {/* Adjust height considering header */}
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
         <p className="mt-4 text-lg text-muted-foreground">Loading courses...</p>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8 text-primary">Explore Our Courses</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {COURSES.map((course: Course) => (
          <CourseCard key={course.id} course={course} />
        ))}
        {COURSES.length === 0 && (
          <p className="col-span-full text-center text-muted-foreground">No courses available at the moment. Admins can add new courses.</p>
        )}
      </div>
    </div>
  );
}

