
'use client';

import Link from 'next/link';
import { LearnifyLogo } from '@/components/icons/logo';
import { Button } from '@/components/ui/button';
import { BookOpen, PlusCircle, LogIn, LogOut } from 'lucide-react';
import { useAuth } from '@/contexts/auth-context';
import { usePathname } from 'next/navigation';


export function Header() {
  const { isAuthenticated, logout, isAdmin, isUser } = useAuth();
  const pathname = usePathname();

  // Don't render header on the login page
  if (pathname === '/login') {
    return null;
  }

  return (
    <header className="bg-card border-b border-border sticky top-0 z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href={isAuthenticated && isUser ? "/" : (isAuthenticated && isAdmin ? "/admin/add-course" : "/login")} className="flex items-center gap-2 text-xl font-semibold">
          <LearnifyLogo />
          <span>Learnify</span>
        </Link>
        <nav className="flex items-center gap-2">
          {isAuthenticated && isUser && (
            <Button variant="ghost" asChild>
              <Link href="/">
                <BookOpen className="mr-2 h-4 w-4" />
                Courses
              </Link>
            </Button>
          )}
          {isAuthenticated && isAdmin && (
            <Button variant="ghost" asChild>
              <Link href="/admin/add-course">
                <PlusCircle className="mr-2 h-4 w-4" />
                Add Course
              </Link>
            </Button>
          )}
          {isAuthenticated ? (
            <Button variant="ghost" onClick={logout}>
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          ) : (
            <Button variant="ghost" asChild>
              <Link href="/login">
                <LogIn className="mr-2 h-4 w-4" />
                Login
              </Link>
            </Button>
          )}
        </nav>
      </div>
    </header>
  );
}
