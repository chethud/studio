
'use server';

import { COURSES, type Course, type Lesson } from '@/lib/data';
import type { CourseFormValues } from '@/schemas/course-form-schema';
import { revalidatePath } from 'next/cache';

export async function addNewCourseAction(data: CourseFormValues): Promise<{success: boolean, error?: string, courseId?: string}> {
  try {
    const existingCourse = COURSES.find(course => course.id === data.id);
    
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

    if (existingCourse) {
      console.warn(`Server Action: Course with ID ${data.id} already exists. Updating it.`);
      COURSES = COURSES.map(course => course.id === data.id ? newCourseData : course);
    } else {
      COURSES.push(newCourseData);
    }
    
    console.log('Server Action: Course added/updated. Server COURSES count:', COURSES.length);
    COURSES.forEach(c => console.log(`Server Course ID: ${c.id}`));


    // Revalidate paths to ensure UI updates
    revalidatePath('/'); // For the home page listing
    revalidatePath(`/courses/${data.id}`); // For the specific course page
    revalidatePath('/courses', 'layout'); // Revalidate all course pages under /courses

    return { success: true, courseId: newCourseData.id };
  } catch (error: any) {
    console.error("Error in addNewCourseAction:", error);
    return { success: false, error: error.message || "Failed to add course on server." };
  }
}
