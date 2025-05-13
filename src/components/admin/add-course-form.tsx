"use client";

import { useForm, useFieldArray, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CourseFormSchema, type CourseFormValues, type LessonFormValues } from "@/schemas/course-form-schema";
import { addCourse, type Course, type Lesson } from "@/lib/data"; // Ensure Lesson type is imported
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { PlusCircle, Trash2, Save, Loader2 } from "lucide-react"; // Added Loader2
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

export function AddCourseForm() {
  const { toast } = useToast();
  const router = useRouter();

  const form = useForm<CourseFormValues>({
    resolver: zodResolver(CourseFormSchema),
    defaultValues: {
      id: "",
      title: "",
      description: "",
      longDescription: "",
      thumbnailUrl: "https://picsum.photos/seed/placeholder/600/400",
      lessons: [
        { id: "L1", title: "", duration: "00:00", videoUrl: "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4", description: "" },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "lessons",
  });

  const onSubmit = (data: CourseFormValues) => {
    try {
      const newCourse: Course = {
        ...data,
        lessons: data.lessons.map(lesson => ({...lesson} as Lesson)) // Ensure type compatibility
      };
      addCourse(newCourse);
      toast({
        title: "Course Added",
        description: `Course "${data.title}" has been successfully added.`,
        variant: "default",
      });
      form.reset();
      router.push("/"); // Redirect to homepage or courses page
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to add course.",
        variant: "destructive",
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl">Course Details</CardTitle>
            <CardDescription>Fill in the information for the new course.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <FormField
              control={form.control}
              name="id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Course ID (Slug)</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., learn-modern-react" {...field} />
                  </FormControl>
                  <FormDescription>A unique identifier for the course, used in the URL. Use lowercase letters, numbers, and hyphens.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Course Title</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Modern React for Beginners" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Short Description</FormLabel>
                  <FormControl>
                    <Textarea placeholder="A brief summary of the course." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="longDescription"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Long Description</FormLabel>
                  <FormControl>
                    <Textarea rows={5} placeholder="A detailed description of what the course covers." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="thumbnailUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Thumbnail URL</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., https://example.com/image.jpg" {...field} />
                  </FormControl>
                  <FormDescription>URL for the course thumbnail image. Use picsum.photos for placeholders if needed.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl">Lessons</CardTitle>
            <CardDescription>Add lessons for this course. At least one lesson is required.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {fields.map((field, index) => (
              <div key={field.id} className="space-y-4 p-4 border rounded-md relative">
                <h4 className="font-semibold text-lg">Lesson {index + 1}</h4>
                <FormField
                  control={form.control}
                  name={`lessons.${index}.id`}
                  render={({ field: lessonField }) => (
                    <FormItem>
                      <FormLabel>Lesson ID</FormLabel>
                      <FormControl>
                        <Input placeholder={`e.g., L${index + 1}01`} {...lessonField} />
                      </FormControl>
                      <FormDescription>Unique ID for this lesson within the course.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={`lessons.${index}.title`}
                  render={({ field: lessonField }) => (
                    <FormItem>
                      <FormLabel>Lesson Title</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., Introduction to State" {...lessonField} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={`lessons.${index}.duration`}
                  render={({ field: lessonField }) => (
                    <FormItem>
                      <FormLabel>Duration</FormLabel>
                      <FormControl>
                        <Input placeholder="MM:SS (e.g., 10:30)" {...lessonField} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={`lessons.${index}.videoUrl`}
                  render={({ field: lessonField }) => (
                    <FormItem>
                      <FormLabel>Video URL</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., https://example.com/video.mp4" {...lessonField} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={`lessons.${index}.description`}
                  render={({ field: lessonField }) => (
                    <FormItem>
                      <FormLabel>Lesson Description</FormLabel>
                      <FormControl>
                        <Textarea placeholder="A short description of this lesson." {...lessonField} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {fields.length > 1 && (
                   <Button
                    type="button"
                    variant="destructive"
                    size="icon"
                    onClick={() => remove(index)}
                    className="absolute top-4 right-4"
                    aria-label="Remove lesson"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                )}
              </div>
            ))}
             <FormMessage>{form.formState.errors.lessons?.root?.message || form.formState.errors.lessons?.message}</FormMessage>
            <Button
              type="button"
              variant="outline"
              onClick={() => append({ 
                  id: `L${fields.length + 1}-${Date.now().toString().slice(-3)}`, // Auto-generate a somewhat unique ID
                  title: "", 
                  duration: "00:00", 
                  videoUrl: "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4", 
                  description: "" 
              })}
            >
              <PlusCircle className="mr-2 h-4 w-4" /> Add Lesson
            </Button>
          </CardContent>
        </Card>
        
        <Button type="submit" size="lg" className="w-full sm:w-auto" disabled={form.formState.isSubmitting}>
          {form.formState.isSubmitting ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Save className="mr-2 h-4 w-4" />
          )}
          {form.formState.isSubmitting ? "Saving Course..." : "Save Course"}
        </Button>
      </form>
    </Form>
  );
}
