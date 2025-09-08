// /Users/goldlabel/GitHub/strapi-next/frontend/__tests__/integration/CourseList.integration.test.tsx
import * as React from 'react';
import { render, screen, waitFor } from '@testing-library/react';

async function getCourses() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/courses?populate=*`);
  const json = await res.json();
  return json.data.map((c: any) => c.attributes.title as string);
}

function CourseList() {
  const [courses, setCourses] = React.useState<string[] | null>(null);
  React.useEffect(() => {
    getCourses().then(setCourses);
  }, []);
  if (!courses) return <p>Loading…</p>;
  return (
    <ul aria-label="courses">
      {courses.map(title => (
        <li key={title}>{title}</li>
      ))}
    </ul>
  );
}

describe('CourseList + Strapi (mocked via MSW)', () => {
  it('renders courses from mocked Strapi response', async () => {
    render(<CourseList />);
    await waitFor(() => expect(screen.getByLabelText('courses')).toBeInTheDocument());
    expect(screen.getByText('Introduction to Algebra')).toBeInTheDocument();
    expect(screen.getByText('Geometry Basics')).toBeInTheDocument();
  });
});
