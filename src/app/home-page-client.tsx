
'use client';

import { CourseCard } from '@/components/course/course-card';
import type { Course } from '@/lib/data';
import { useAuth } from '@/contexts/auth-context';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Loader2 } from 'lucide-react';

interface HomePageClientProps {
  courses: Course[];
}

export default function HomePageClient({ courses }: HomePageClientProps) {
  const { isLoading: authIsLoading, isAuthenticated } = useAuth(); // Renamed isLoading to authIsLoading to avoid conflict
  const router = useRouter();

  useEffect(() => {
    if (!authIsLoading && !isAuthenticated) {
      router.replace('/login');
    }
  }, [authIsLoading, isAuthenticated, router]);

  if (authIsLoading || !isAuthenticated) {
    return (
      <div className="flex flex-col justify-center items-center min-h-[calc(100vh-theme(space.16))]">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
         <p className="mt-4 text-lg text-muted-foreground">Loading user data...</p>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8 text-primary">Explore Our Courses</h1>
      {courses && courses.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course: Course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      ) : (
         <p className="col-span-full text-center text-muted-foreground">No courses available at the moment. Admins can add new courses.</p>
      )}
       {courses && courses.length === 0 && !authIsLoading && isAuthenticated && ( // Show only if courses is empty and auth loaded
          <p className="col-span-full text-center text-muted-foreground pt-4">No courses available at the moment. Admins can add new courses via the 'Add Course' link.</p>
        )}
    </div>
  );
}
