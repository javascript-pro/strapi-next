// __tests__/components/LessonList.test.tsx
import * as React from 'react';
import { render, screen } from '@testing-library/react';
import LessonList from '@/components/LessonList';

const logSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
afterAll(() => logSpy.mockRestore());

describe('LessonList', () => {
  it('renders each lesson title and flattens rich-text content', () => {
    const lessons = [
      {
        id: 1,
        title: 'Algebra 101',
        content: [
          { type: 'paragraph', children: [{ text: 'Intro ' }] },
          { type: 'paragraph', children: [{ text: 'to Algebra' }] },
        ],
      },
      {
        id: 2,
        title: 'Geometry Basics',
        content: [
          { type: 'paragraph', children: [{ text: 'Angles ' }, { text: 'and shapes' }] },
        ],
      },
    ];

    render(<LessonList lessons={lessons as any} />);

    // Titles appear via LessonItem label
    expect(screen.getByRole('checkbox', { name: /algebra 101/i })).toBeInTheDocument();
    expect(screen.getByRole('checkbox', { name: /geometry basics/i })).toBeInTheDocument();

    // Whitespace-safe content assertions
    const normalize = (s: string) => s.replace(/\s+/g, ' ').trim();
    expect(screen.getByText('Intro to Algebra', { normalizer: normalize })).toBeInTheDocument();
    expect(screen.getByText(/Angles\s+and\s+shapes/)).toBeInTheDocument();
  });

  it('does not crash and warns once when lessons is empty', () => {
    const warnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});
    render(<LessonList lessons={[]} />);
    expect(warnSpy).toHaveBeenCalledTimes(1);
    expect(warnSpy).toHaveBeenCalledWith('No lessons to render.');
    warnSpy.mockRestore();
  });

  it('handles lessons without content gracefully (no content block rendered)', () => {
    const lessons = [{ id: 1, title: 'Content-less Lesson' }];

    render(<LessonList lessons={lessons as any} />);

    expect(screen.getByRole('checkbox', { name: /content-less lesson/i })).toBeInTheDocument();
    expect(screen.queryByText(/undefined/i)).not.toBeInTheDocument();
  });
});
