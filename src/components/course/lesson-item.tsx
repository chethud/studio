"use client";

import Link from 'next/link';
import { Checkbox } from '@/components/ui/checkbox';
import type { Lesson } from '@/lib/data';
import { useLocalStorage } from '@/hooks/use-local-storage';
import { PlayCircle, CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface LessonItemProps {
  courseId: string;
  lesson: Lesson;
}

export function LessonItem({ courseId, lesson }: LessonItemProps) {
  const [completedLessons, setCompletedLessons] = useLocalStorage<string[]>(`completedLessons_${courseId}`, []);
  
  const isCompleted = completedLessons.includes(lesson.id);

  const handleCompletionChange = () => {
    setCompletedLessons(prev => 
      isCompleted ? prev.filter(id => id !== lesson.id) : [...prev, lesson.id]
    );
  };

  return (
    <div className="flex items-center justify-between p-3 rounded-lg hover:bg-secondary/50 transition-colors">
      <div className="flex items-center gap-3">
        <Checkbox
          id={`lesson-${lesson.id}`}
          checked={isCompleted}
          onCheckedChange={handleCompletionChange}
          aria-label={`Mark lesson ${lesson.title} as ${isCompleted ? 'incomplete' : 'complete'}`}
        />
        <Link href={`/courses/${courseId}/lessons/${lesson.id}`} className="group">
          <div className="flex items-center gap-2">
             {isCompleted ? (
              <CheckCircle2 className="h-5 w-5 text-green-500" />
            ) : (
              <PlayCircle className="h-5 w-5 text-muted-foreground group-hover:text-accent" />
            )}
            <div>
                <span className={cn("font-medium group-hover:text-accent", isCompleted && "line-through text-muted-foreground")}>
                    {lesson.title}
                </span>
                <p className="text-xs text-muted-foreground">{lesson.duration}</p>
            </div>
          </div>
        </Link>
      </div>
      
    </div>
  );
}
