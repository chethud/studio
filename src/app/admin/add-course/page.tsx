import { AddCourseForm } from '@/components/admin/add-course-form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function AddCoursePage() {
  return (
    <div>
      <Card className="shadow-xl">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-primary">Create New Course</CardTitle>
          <CardDescription>
            Fill out the form below to add a new course to the platform.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <AddCourseForm />
        </CardContent>
      </Card>
    </div>
  );
}
