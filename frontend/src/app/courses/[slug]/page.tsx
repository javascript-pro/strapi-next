// /Users/goldlabel/GitHub/strapi-next/frontend/src/app/courses/[slug]/page.tsx
import { notFound } from 'next/navigation';
import { Typography, Container } from '@mui/material';
import LessonList from '../../../components/LessonList';

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL;

interface Lesson {
  id: number;
  title: string;
  content?: { type: string; children: { text: string }[] }[];
}

interface Instructor {
  name: string;
  bio?: { type: string; children: { text: string }[] }[];
  slug?: string;
}

interface Course {
  id: number;
  title: string;
  description?: { type: string; children: { text: string }[] }[];
  lessons?: Lesson[];
  instructor?: Instructor;
}

interface CoursePageProps {
  params: { slug: string };
}

export default async function CoursePage({ params }: CoursePageProps) {
  if (!STRAPI_URL) throw new Error('NEXT_PUBLIC_STRAPI_URL is not defined');

  const apiUrl = `${STRAPI_URL}/api/courses?filters[slug][$eq]=${params.slug}&populate=*`;
  
  // Output the API URL for debugging
  console.log('Fetching course from URL:', apiUrl);

  const res = await fetch(apiUrl, { cache: 'no-store' }); // ensures fresh SSR

  if (!res.ok) notFound();

  const json = await res.json();
  const courseData = json.data[0];

  if (!courseData) notFound();

  const course: Course = {
    id: courseData.id,
    title: courseData.title,
    description: courseData.description,
    lessons: courseData.lessons || [],
    instructor: courseData.instructor,
  };

  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h3" gutterBottom>
        {course.title}
      </Typography>

      <Typography variant="body1" paragraph>
        {course.description?.map(p => p.children.map(c => c.text).join('')).join('\n')}
      </Typography>

      <Typography variant="h4" sx={{ mt: 4, mb: 2 }}>
        Lessons
      </Typography>
      <LessonList lessons={course.lessons || []} />

      {course.instructor && (
        <>
          <Typography variant="h4" sx={{ mt: 4, mb: 2 }}>
            Instructor
          </Typography>
          <Typography variant="h6">{course.instructor.name}</Typography>
          <Typography variant="body2">
            {course.instructor.bio?.map(p => p.children.map(c => c.text).join('')).join('\n')}
          </Typography>
        </>
      )}
    </Container>
  );
}
