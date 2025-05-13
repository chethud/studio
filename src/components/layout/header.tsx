import Link from 'next/link';
import { LearnifyLogo } from '@/components/icons/logo';
import { Button } from '@/components/ui/button';
import { BookOpen, PlusCircle } from 'lucide-react';

export function Header() {
  return (
    <header className="bg-card border-b border-border sticky top-0 z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 text-xl font-semibold">
          <LearnifyLogo />
          <span>Learnify</span>
        </Link>
        <nav className="flex items-center gap-2">
          <Button variant="ghost" asChild>
            <Link href="/">
              <BookOpen className="mr-2 h-4 w-4" />
              Courses
            </Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link href="/admin/add-course">
              <PlusCircle className="mr-2 h-4 w-4" />
              Add Course
            </Link>
          </Button>
        </nav>
      </div>
    </header>
  );
}
