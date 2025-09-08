import * as React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import LessonItem from '@/components/LessonItem';

describe('LessonItem', () => {
  it('renders a lesson title with an unchecked checkbox by default', () => {
    render(<LessonItem title="Lesson 1" />);

    const checkbox = screen.getByRole('checkbox', { name: /lesson 1/i });
    expect(checkbox).toBeInTheDocument();
    expect(checkbox).not.toBeChecked();
  });

  it('renders lesson content when provided', () => {
    render(<LessonItem title="Lesson 2" content="This is the content." />);

    expect(screen.getByText(/this is the content/i)).toBeInTheDocument();
  });

  it('toggles the checkbox state when clicked', async () => {
    render(<LessonItem title="Lesson 3" />);
    const checkbox = screen.getByRole('checkbox', { name: /lesson 3/i });

    expect(checkbox).not.toBeChecked();

    await userEvent.click(checkbox);
    expect(checkbox).toBeChecked();

    await userEvent.click(checkbox);
    expect(checkbox).not.toBeChecked();
  });
});
