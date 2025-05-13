
import { COURSES } from '@/lib/data';
import HomePageClient from './home-page-client';
import type { Course } from '@/lib/data';

export default async function HomePage() {
  // This function runs on the server.
  // It fetches the current state of COURSES from the server-side module.
  // After a server action mutates COURSES and calls revalidatePath('/'),
  // this component will re-render with the updated COURSES.
  const courses: Course[] = JSON.parse(JSON.stringify(COURSES));

  return <HomePageClient courses={courses} />;
}
