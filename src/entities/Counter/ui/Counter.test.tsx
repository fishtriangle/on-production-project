import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { ComponentRender } from '@/shared/lib/tests/ComponentRender/ComponentRender';

import { Counter } from './Counter';

describe('Counter', () => {
  test('render Counter', () => {
    ComponentRender(
      <Counter />,
      {
        initialState: { counter: { value: 10 } },
      },
    );
    expect(screen.getByTestId('value-title')).toHaveTextContent('10');
  });

  test('increment', async () => {
    ComponentRender(
      <Counter />,
      {
        initialState: { counter: { value: 10 } },
      },
    );
    const incrementBtn = screen.getByTestId('increment-btn');
    await userEvent.click(incrementBtn);
    expect(screen.getByTestId('value-title')).toHaveTextContent('11');
  });

  test('decrement', async () => {
    ComponentRender(
      <Counter />,
      {
        initialState: { counter: { value: 10 } },
      },
    );
    const decrementBtn = screen.getByTestId('decrement-btn');
    await userEvent.click(decrementBtn);
    expect(screen.getByTestId('value-title')).toHaveTextContent('9');
  });
});
