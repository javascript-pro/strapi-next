// /Users/goldlabel/GitHub/strapi-next/frontend/src/components/LessonItem.tsx
'use client';

import { useState } from 'react';
import { Card, CardContent, Typography, FormControlLabel, Checkbox } from '@mui/material';

interface LessonItemProps {
  title: string;
  content?: string;
}

export default function LessonItem({ title, content }: LessonItemProps) {
  const [completed, setCompleted] = useState(false);

  return (
    <Card>
      <CardContent>
        <FormControlLabel
          control={
            <Checkbox
              checked={completed}
              onChange={() => setCompleted(!completed)}
            />
          }
          label={title}
        />
        {content && (
          <Typography variant="body2" sx={{ mt: 1 }}>
            {content}
          </Typography>
        )}
      </CardContent>
    </Card>
  );
}
