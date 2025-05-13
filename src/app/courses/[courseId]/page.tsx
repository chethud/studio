import { getCourseById } from '@/lib/data';
import type { Course } from '@/lib/data';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { LessonItem } from '@/components/course/lesson-item';
import { ProgressBarCourse } from '@/components/course/progress-bar-course';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

interface CoursePageProps {
  params: {
    courseId: string;
  };
}

export default function CoursePage({ params }: CoursePageProps) {
  const course = getCourseById(params.courseId);

  if (!course) {
    notFound();
  }

  return (
    <div className="space-y-8">
      <Card className="overflow-hidden shadow-lg">
        <div className="md:flex">
          <div className="md:w-1/3 relative aspect-video md:aspect-auto">
            <Image
              src={course.thumbnailUrl}
              alt={course.title}
              layout="fill"
              objectFit="cover"
              className="md:rounded-l-lg"
              data-ai-hint="education online"
            />
          </div>
          <div className="md:w-2/3">
            <CardHeader>
              <CardTitle className="text-3xl font-bold text-primary">{course.title}</CardTitle>
              <CardDescription className="text-lg text-muted-foreground">{course.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="mb-6">{course.longDescription}</p>
              <div className="mb-4">
                <h3 className="text-lg font-semibold mb-2 text-primary">Your Progress</h3>
                <ProgressBarCourse courseId={course.id} totalLessons={course.lessons.length} />
              </div>
            </CardContent>
          </div>
        </div>
      </Card>

      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold text-primary">Lessons</CardTitle>
        </CardHeader>
        <CardContent>
          {course.lessons.length > 0 ? (
            <ul className="space-y-3">
              {course.lessons.map((lesson, index) => (
                <li key={lesson.id}>
                   <LessonItem courseId={course.id} lesson={lesson} />
                   {index < course.lessons.length - 1 && <Separator className="my-3"/>}
                </li>
              ))}
            </ul>
          ) : (
            <p>No lessons available for this course yet.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
