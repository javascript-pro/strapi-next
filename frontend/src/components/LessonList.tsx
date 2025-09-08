'use client';

import { Grid } from '@mui/material';
import LessonItem from './LessonItem';

interface Lesson {
  id: number;
  title: string;
  content?: { type: string; children: { text: string }[] }[];
}

interface LessonListProps {
  lessons: Lesson[];
}

export default function LessonList({ lessons }: LessonListProps) {
  console.log('LessonList received lessons:', lessons);

  if (!lessons || lessons.length === 0) {
    console.warn('No lessons to render.');
  }

  return (
    <Grid container spacing={2}>
      {lessons.map((lesson) => {
        console.log('Rendering lesson:', lesson);

        const content = lesson.content
          ?.map((p) => p.children.map((c) => c.text).join(''))
          .join('\n');

        return (
          <Grid key={lesson.id} size={{ xs: 12, md: 6 }}>
            <LessonItem title={lesson.title} content={content} />
          </Grid>
        );
      })}
    </Grid>
  );
}
