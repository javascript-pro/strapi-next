// /Users/goldlabel/GitHub/strapi-next/frontend/__tests__/components/Counter.test.tsx
import * as React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

function Counter() {
  const [count, setCount] = React.useState(0);
  return (
    <div>
      <h1>Counter</h1>
      <button aria-label="increment" onClick={() => setCount(c => c + 1)}>
        Clicked {count}
      </button>
    </div>
  );
}

describe('Counter', () => {
  it('increments on click', async () => {
    render(<Counter />);
    const btn = screen.getByRole('button', { name: /increment/i });
    await userEvent.click(btn);
    expect(btn).toHaveTextContent('Clicked 1');
  });
});
