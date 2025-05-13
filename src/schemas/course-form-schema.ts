import { z } from 'zod';

export const LessonFormSchema = z.object({
  id: z.string().min(1, "Lesson ID is required (e.g., L101)"),
  title: z.string().min(3, "Lesson title must be at least 3 characters"),
  duration: z.string().regex(/^\d{2,3}:\d{2}$/, "Duration must be in MM:SS or MMM:SS format (e.g., 08:15 or 120:30)"),
  videoUrl: z.string().url("Must be a valid video URL"),
  description: z.string().min(10, "Lesson description must be at least 10 characters"),
});

export type LessonFormValues = z.infer<typeof LessonFormSchema>;

export const CourseFormSchema = z.object({
  id: z.string().min(3, "Course ID must be at least 3 characters (e.g., new-course-slug)").regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Course ID must be a valid slug (e.g., my-new-course)"),
  title: z.string().min(5, "Course title must be at least 5 characters"),
  description: z.string().min(10, "Short description must be at least 10 characters"),
  longDescription: z.string().min(20, "Long description must be at least 20 characters"),
  thumbnailUrl: z.string().url("Must be a valid URL for thumbnail (e.g., https://picsum.photos/seed/newcourse/600/400)"),
  lessons: z.array(LessonFormSchema).min(1, "At least one lesson is required"),
});

export type CourseFormValues = z.infer<typeof CourseFormSchema>;
