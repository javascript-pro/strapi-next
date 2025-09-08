import Link from 'next/link';
import { Card, CardContent, Typography, Grid, CardActionArea } from '@mui/material';

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL;

type Course = {
  id: number;
  documentId: string;
  title: string;
  description?: { type: string; children: { text: string }[] }[];
  slug?: string | null;
};

export default async function HomePage() {
  if (!STRAPI_URL) throw new Error('NEXT_PUBLIC_STRAPI_URL is not defined');

  const res = await fetch(`${STRAPI_URL}/api/courses?populate=*`, { cache: 'no-store' });
  if (!res.ok) throw new Error('Failed to fetch courses from Strapi');

  const json = await res.json();
  const courses: Course[] = json.data || [];

  return (
    <div style={{ padding: '2rem' }}>
      <Typography variant="h3" gutterBottom>
        Available Courses
      </Typography>
      <Grid container spacing={2}>
        {courses.map((course) => {
          const title = course.title || 'Untitled Course';
          const description =
            course.description?.map((p) => p.children.map((c) => c.text).join('')).join('\n') || '';
          // Use slug if available; else fallback to documentId for safe linking
          const slugOrId = course.slug || course.documentId;

          return (
            <Grid key={course.id} size={{ xs: 12, md: 6 }}>
              <Card>
                <CardActionArea component={Link} href={`/courses/${slugOrId}`}>
                  <CardContent>
                    <Typography variant="h5">{title}</Typography>
                    <Typography variant="body2">{description}</Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </div>
  );
}
