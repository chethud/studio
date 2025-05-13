export interface Lesson {
  id: string;
  title: string;
  duration: string; // e.g., "10:32"
  videoUrl: string; 
  description: string;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  thumbnailUrl: string;
  lessons: Lesson[];
}

// Changed from const to let to allow modification
export let COURSES: Course[] = [
  {
    id: 'nextjs-fundamentals',
    title: 'Next.js 14 Fundamentals',
    description: 'Master the basics of Next.js and build modern web applications.',
    longDescription: 'Dive deep into Next.js 14, learning about App Router, Server Components, Server Actions, and more. This course covers everything from setting up your first project to deploying a full-stack application. Perfect for beginners and those looking to update their Next.js skills.',
    thumbnailUrl: 'https://picsum.photos/seed/nextjs/600/400',
    lessons: [
      { id: 'L101', title: 'Introduction to Next.js', duration: '08:15', videoUrl: 'https://www.youtube.com/watch?v=fmj9S3M9MWQ', description: 'Overview of Next.js, its features, and why it\'s a popular choice for web development.' },
      { id: 'L102', title: 'Setting Up Your Project', duration: '12:30', videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4', description: 'Step-by-step guide to creating a new Next.js project and understanding the file structure.' },
      { id: 'L103', title: 'App Router and Routing', duration: '15:50', videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4', description: 'Learn how to define routes, create layouts, and handle navigation using the App Router.' },
      { id: 'L104', title: 'Server Components', duration: '18:22', videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4', description: 'Understand the power of Server Components for improved performance and data fetching.' },
    ],
  },
  {
    id: 'tailwind-css-deep-dive',
    title: 'Tailwind CSS Deep Dive',
    description: 'Unlock the full potential of Tailwind CSS for rapid UI development.',
    longDescription: 'This course takes you from the fundamentals of Tailwind CSS to advanced customization techniques. Learn how to build responsive, beautiful UIs efficiently with utility-first CSS. Includes practical examples and projects.',
    thumbnailUrl: 'https://picsum.photos/seed/tailwind/600/400',
    lessons: [
      { id: 'L201', title: 'What is Tailwind CSS?', duration: '07:45', videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4', description: 'An introduction to utility-first CSS and the benefits of using Tailwind.' },
      { id: 'L202', title: 'Core Concepts', duration: '14:20', videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4', description: 'Understanding spacing, typography, colors, and other essential Tailwind utilities.' },
      { id: 'L203', title: 'Responsive Design', duration: '16:00', videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4', description: 'Building responsive layouts that work across all screen sizes.' },
    ],
  },
  {
    id: 'react-hooks-masterclass',
    title: 'React Hooks Masterclass',
    description: 'Become proficient with React Hooks for state and side effects.',
    longDescription: 'Explore useState, useEffect, useContext, useReducer, and custom Hooks in depth. This masterclass will help you write cleaner, more maintainable React components by leveraging the full power of Hooks.',
    thumbnailUrl: 'https://picsum.photos/seed/reacthooks/600/400',
    lessons: [
      { id: 'L301', title: 'Introduction to Hooks', duration: '09:03', videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4', description: 'Why Hooks were introduced and how they simplify React component logic.' },
      { id: 'L302', title: 'useState and useEffect', duration: '20:10', videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnStreetAndDirt.mp4', description: 'Deep dive into managing state and side effects with the two most fundamental Hooks.' },
      { id: 'L303', title: 'Custom Hooks', duration: '17:35', videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4', description: 'Learn how to create your own reusable Hooks to encapsulate component logic.' },
    ],
  },
];

export function getCourses(): Course[] {
  // Return a deep copy of the current state of COURSES.
  // This ensures that consumers always get the most up-to-date data
  // and prevents them from unintentionally mutating the global COURSES array.
  return JSON.parse(JSON.stringify(COURSES));
}

export function getCourseById(courseId: string): Course | undefined {
  // It's slightly more robust to use getCourses() here too,
  // but direct access is fine if COURSES is consistently updated.
  const currentCourses = getCourses();
  return currentCourses.find(course => course.id === courseId);
}

export function getLessonById(courseId: string, lessonId: string): Lesson | undefined {
  const course = getCourseById(courseId);
  return course?.lessons.find(lesson => lesson.id === lessonId);
}

export function addCourse(newCourseData: Course): void {
  const existingCourseIndex = COURSES.findIndex(course => course.id === newCourseData.id);

  if (existingCourseIndex !== -1) {
    // Update existing course
    console.warn(`Server Lib (data.ts): Course with ID ${newCourseData.id} already exists. Updating it.`);
    COURSES[existingCourseIndex] = newCourseData;
  } else {
    // Add new course
    console.log(`Server Lib (data.ts): Adding new course with ID ${newCourseData.id}.`);
    COURSES.push(newCourseData);
  }
  
  console.log(`Server Lib (data.ts): COURSES count after operation: ${COURSES.length}`);
  // To see the actual list of course IDs after operation:
  console.log('Server Lib (data.ts): Current course IDs:', COURSES.map(c => c.id));
}
