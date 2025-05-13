
'use client';

import { CourseCard } from '@/components/course/course-card';
import { COURSES } from '@/lib/data';
import type { Course } from '@/lib/data';
import { useAuth } from '@/contexts/auth-context';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Loader2 } from 'lucide-react';

export default function HomePage() {
  const { user, isLoading, isAuthenticated, isUser, isAdmin } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading) {
      if (!isAuthenticated) {
        router.replace('/login');
      } else if (isAdmin) {
        // Admins should not land on user dashboard, redirect them to their area
        router.replace('/admin/add-course'); // Or /admin if an admin dashboard page exists
      } else if (!isUser) {
        // If authenticated but not a user (e.g. future roles) or some error state
        router.replace('/login');
      }
    }
  }, [user, isLoading, isAuthenticated, isUser, isAdmin, router]);

  if (isLoading || !isAuthenticated || !isUser) {
    // Show loading spinner if auth is loading, or if user is not authenticated or not a 'user'
    // This also covers the case where an admin might briefly hit this page before redirection
    return (
      <div className="flex flex-col justify-center items-center min-h-[calc(100vh-theme(space.16))]"> {/* Adjust height considering header */}
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
         <p className="mt-4 text-lg text-muted-foreground">Loading your courses...</p>
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
