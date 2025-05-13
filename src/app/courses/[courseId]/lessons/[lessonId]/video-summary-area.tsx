"use client";

import { useState, type ChangeEvent } from 'react';
import { summarizeVideo, type SummarizeVideoInput, type SummarizeVideoOutput } from '@/ai/flows/summarize-video';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Loader2, Sparkles, FileWarning, CheckCircle2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useLocalStorage } from '@/hooks/use-local-storage';

interface VideoSummaryAreaProps {
  videoUrl: string; // The actual GCS or remote URL of the video
  courseId: string;
  lessonId: string;
}

export function VideoSummaryArea({ videoUrl, courseId, lessonId }: VideoSummaryAreaProps) {
  const [summary, setSummary] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [videoDataUri, setVideoDataUri] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  
  const [completedLessons, setCompletedLessons] = useLocalStorage<string[]>(`completedLessons_${courseId}`, []);
  const isCompleted = completedLessons.includes(lessonId);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFileName(file.name);
      const reader = new FileReader();
      reader.onload = (e) => {
        setVideoDataUri(e.target?.result as string);
        setSummary(null); // Clear previous summary
        setError(null); // Clear previous error
      };
      reader.readAsDataURL(file);
    } else {
      setVideoDataUri(null);
      setFileName(null);
    }
  };

  const handleGenerateSummary = async () => {
    if (!videoDataUri) {
      setError('Please select a video file first to generate a summary. The AI requires a data URI.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setSummary(null);

    try {
      const input: SummarizeVideoInput = { videoDataUri };
      const result: SummarizeVideoOutput = await summarizeVideo(input);
      setSummary(result.summary);
    } catch (e: any) {
      console.error('Error generating summary:', e);
      setError(e.message || 'Failed to generate summary.');
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
      <div>
        <p className="text-sm text-muted-foreground mb-2">
          The current AI flow for summarization requires a video file to be uploaded from your device to generate a data URI. 
          This is a temporary measure for demonstration. For large videos hosted remotely (like the one in the player), this method is not efficient.
        </p>
        <div className="space-y-2 max-w-md">
          <Label htmlFor="video-file-for-summary">Upload video for summary (optional)</Label>
          <Input id="video-file-for-summary" type="file" accept="video/*" onChange={handleFileChange} className="file:text-primary file:font-medium"/>
          {fileName && <p className="text-xs text-muted-foreground">Selected: {fileName}</p>}
        </div>
      </div>

      <Button onClick={handleGenerateSummary} disabled={isLoading || !videoDataUri} className="w-full sm:w-auto">
        {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        {isLoading ? 'Generating...' : 'Generate Summary'}
        {!isLoading && <Sparkles className="ml-2 h-4 w-4" />}
      </Button>

      {error && (
        <Alert variant="destructive">
          <FileWarning className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {summary && (
        <Card className="bg-secondary/30">
          <CardHeader>
            <CardTitle className="text-lg flex items-center text-primary">
              <Sparkles className="mr-2 h-5 w-5 text-accent" />
              Video Summary
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
