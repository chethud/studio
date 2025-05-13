"use client";

import { useState } from 'react';
import { summarizeVideo, type SummarizeVideoInput, type SummarizeVideoOutput } from '@/ai/flows/summarize-video';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Loader2, Sparkles, FileWarning, CheckCircle2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useLocalStorage } from '@/hooks/use-local-storage';

interface VideoSummaryAreaProps {
  videoUrl: string;
  courseId: string;
  lessonId: string;
}

export function VideoSummaryArea({ videoUrl, courseId, lessonId }: VideoSummaryAreaProps) {
  const [summary, setSummary] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const [completedLessons, setCompletedLessons] = useLocalStorage<string[]>(`completedLessons_${courseId}`, []);
  const isCompleted = completedLessons.includes(lessonId);

  const handleGenerateSummary = async () => {
    if (!videoUrl) {
      setError('No video URL available for this lesson to generate a summary.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setSummary(null);

    try {
      const input: SummarizeVideoInput = { videoUrl };
      const result: SummarizeVideoOutput = await summarizeVideo(input);
      setSummary(result.summary);
    } catch (e: any) {
      console.error('Error generating summary:', e);
      setError(e.message || 'Failed to generate summary. The AI model might not be able to process the video from this URL directly, or the video format may not be supported.');
    } finally {
      setIsLoading(false);
    }
  };

  const toggleLessonCompletion = () => {
    setCompletedLessons(prev =>
      isCompleted ? prev.filter(id => id !== lessonId) : [...prev, lessonId]
    );
  };

  return (
    <div className="space-y-6 mt-4">
      <Button onClick={handleGenerateSummary} disabled={isLoading || !videoUrl} className="w-full sm:w-auto">
        {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        {isLoading ? 'Generating Summary...' : 'Generate Video Summary (AI)'}
        {!isLoading && <Sparkles className="ml-2 h-4 w-4" />}
      </Button>
      { !videoUrl &&  
        <Alert variant="destructive">
            <FileWarning className="h-4 w-4" />
            <AlertTitle>Missing Video URL</AlertTitle>
            <AlertDescription>Cannot generate summary as the video URL is not available.</AlertDescription>
        </Alert>
      }
      <p className="text-sm text-muted-foreground">
          AI will attempt to summarize the video directly from its URL. This may take a few moments. 
          Ensure the video URL is publicly accessible.
      </p>

      {error && (
        <Alert variant="destructive">
          <FileWarning className="h-4 w-4" />
          <AlertTitle>Error Generating Summary</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {summary && (
        <Card className="bg-secondary/30">
          <CardHeader>
            <CardTitle className="text-lg flex items-center text-primary">
              <Sparkles className="mr-2 h-5 w-5 text-accent" />
              AI Video Summary
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="whitespace-pre-wrap">{summary}</p>
          </CardContent>
        </Card>
      )}

      <div className="mt-8 pt-6 border-t">
        <Button onClick={toggleLessonCompletion} variant={isCompleted ? "outline" : "default"} className="w-full sm:w-auto">
          {isCompleted ? <CheckCircle2 className="mr-2 h-4 w-4 text-green-500" /> : <CheckCircle2 className="mr-2 h-4 w-4" />}
          {isCompleted ? 'Mark as Incomplete' : 'Mark as Complete'}
        </Button>
        {isCompleted && <p className="text-sm text-green-600 mt-2">Lesson marked as complete!</p>}
      </div>
    </div>
  );
}
