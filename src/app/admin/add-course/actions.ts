
'use server';

import { addCourse as addOrUpdateCourseInLib, type Course, type Lesson } from '@/lib/data';
import type { CourseFormValues } from '@/schemas/course-form-schema';
import { revalidatePath } from 'next/cache';

export async function addNewCourseAction(data: CourseFormValues): Promise<{success: boolean, error?: string, courseId?: string}> {
  try {
    const newCourseData: Course = {
      id: data.id,
      title: data.title,
      description: data.description,
      longDescription: data.longDescription,
      thumbnailUrl: data.thumbnailUrl,
      lessons: data.lessons.map(lesson => ({
        id: lesson.id,
        title: lesson.title,
        duration: lesson.duration,
        videoUrl: lesson.videoUrl,
        description: lesson.description,
      } as Lesson)),
    };

    // Call the function from lib/data.ts to add or update the course
    // This function will handle whether it's an add or update operation.
    addOrUpdateCourseInLib(newCourseData);
    
    console.log(`Server Action: Course ${data.id} processed by addOrUpdateCourseInLib in @/lib/data.`);
    
    // Revalidate paths to ensure UI updates
    revalidatePath('/'); // For the home page listing (src/app/page.tsx)
    revalidatePath(`/courses/${data.id}`); // For the specific course page
    revalidatePath('/courses'); // For any general course listing page if it exists
    revalidatePath('/courses', 'layout'); // Revalidate layout for course pages
    revalidatePath('/admin/add-course'); // Potentially revalidate admin page if it shows courses


    return { success: true, courseId: newCourseData.id };
  } catch (error: any) {
    console.error("Error in addNewCourseAction:", error);
    return { success: false, error: error.message || "Failed to add course on server." };
  }
}

