
import { getCourses } from '@/lib/data'; // Updated import
import HomePageClient from './home-page-client';
import type { Course } from '@/lib/data';

export default async function HomePage() {
  // This function runs on the server.
  // It fetches the current state of COURSES from the server-side module.
  // After a server action mutates COURSES and calls revalidatePath('/'),
  // this component will re-render with the updated COURSES.
  const courses: Course[] = getCourses(); // Use the new function to get courses

  return <HomePageClient courses={courses} />;
}
