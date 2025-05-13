import { CourseCard } from '@/components/course/course-card';
import { COURSES } from '@/lib/data';
import type { Course } from '@/lib/data';

export default function HomePage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-8 text-primary">Explore Our Courses</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {COURSES.map((course: Course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>
    </div>
  );
}
