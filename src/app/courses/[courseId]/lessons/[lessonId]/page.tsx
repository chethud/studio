import { getLessonById, getCourseById } from '@/lib/data';
import type { Lesson, Course } from '@/lib/data';
import { notFound } from 'next/navigation';
import { VideoPlayer } from '@/components/video/video-player';
import { VideoSummaryArea } from './video-summary-area';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Lightbulb, Video } from "lucide-react";

interface LessonPageProps {
  params: {
    courseId: string;
    lessonId: string;
  };
}

export default function LessonPage({ params }: LessonPageProps) {
  const course = getCourseById(params.courseId);
  const lesson = getLessonById(params.courseId, params.lessonId);

  if (!course || !lesson) {
    notFound();
  }

  return (
    <div className="space-y-8">
      <Card className="shadow-lg">
        <CardHeader>
          <p className="text-sm text-accent font-semibold">{course.title}</p>
          <CardTitle className="text-3xl font-bold text-primary">{lesson.title}</CardTitle>
          <CardDescription className="text-muted-foreground">{lesson.description}</CardDescription>
        </CardHeader>
        <CardContent>
            <div className="aspect-video mb-6 bg-muted rounded-lg overflow-hidden">
                 <VideoPlayer src={lesson.videoUrl} title={lesson.title} />
            </div>
            <Alert>
                <Lightbulb className="h-4 w-4" />
                <AlertTitle>AI Video Summary</AlertTitle>
                <AlertDescription>
                    <VideoSummaryArea videoUrl={lesson.videoUrl} courseId={params.courseId} lessonId={params.lessonId} />
                </AlertDescription>
            </Alert>
        </CardContent>
      </Card>

    </div>
  );
}
