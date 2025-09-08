import * as React from 'react';
import { render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';
import LessonItem from '@/components/LessonItem';

describe('LessonItem (a11y)', () => {
  it('has no accessibility violations without content and exposes checkbox by label', async () => {
    const { container } = render(<LessonItem title="Lesson A" />);
    // Checkbox is discoverable by role + accessible name (from FormControlLabel)
    const checkbox = screen.getByRole('checkbox', { name: /lesson a/i });
    expect(checkbox).toBeInTheDocument();

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('has no accessibility violations with content rendered', async () => {
    const { container } = render(
      <LessonItem title="Lesson B" content="This is the lesson content." />
    );

    // Content appears and remains accessible text
    expect(screen.getByText(/this is the lesson content/i)).toBeInTheDocument();

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
