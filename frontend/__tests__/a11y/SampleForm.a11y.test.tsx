// __tests__/a11y/SampleForm.a11y.test.tsx
import * as React from 'react';
import { render } from '@testing-library/react';
import { axe } from 'jest-axe';

function AccessibleSection() {
  return (
    <main id="main">
      <h1>Courses</h1>
      <form>
        <label htmlFor="search" id="search-label">Search courses</label>
        <input id="search" name="search" aria-describedby="search-hint" />
        <p id="search-hint">Type a title or topic.</p>
        <button type="submit">Search</button>
      </form>
    </main>
  );
}

describe('AccessibleSection', () => {
  it('has no detectable accessibility violations', async () => {
    const { container } = render(<AccessibleSection />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
