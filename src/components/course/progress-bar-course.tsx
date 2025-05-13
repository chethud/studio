"use client";

import { useEffect, useState } from 'react';
import { Progress } from '@/components/ui/progress';
import { useLocalStorage } from '@/hooks/use-local-storage';
import type { Lesson } from '@/lib/data';

interface ProgressBarCourseProps {
  courseId: string;
  totalLessons: number;
}

export function ProgressBarCourse({ courseId, totalLessons }: ProgressBarCourseProps) {
  const [completedLessons, setCompletedLessons] = useLocalStorage<string[]>(`completedLessons_${courseId}`, []);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (totalLessons > 0) {
      const newProgress = (completedLessons.length / totalLessons) * 100;
      setProgress(newProgress);
    } else {
      setProgress(0);
    }
  }, [completedLessons, totalLessons]);

  return (
    <div className="w-full">
      <Progress value={progress} className="w-full h-3" />
      <p className="text-sm text-muted-foreground mt-1">
        {completedLessons.length} of {totalLessons} lessons completed ({Math.round(progress)}%)
      </p>
    </div>
  );
}
