import { screen } from '@testing-library/react';
import { ComponentRender } from '@/shared/lib/tests/ComponentRender/ComponentRender';
import { Sidebar } from './Sidebar';

describe('Sidebar', () => {
  test('render Sidebar', () => {
    ComponentRender(<Sidebar collapsed={false} />);
    expect(screen.getByTestId('sidebar')).toBeInTheDocument();
  });

  // test('toggle', () => {
  //   ComponentRender(<Sidebar collapsed={false} />);
  //   const toggleBtn = screen.getByTestId('sidebar-toggle');
  //   fireEvent.click(toggleBtn);
  //   expect(screen.getByTestId('sidebar')).toHaveClass('collapsed');
  // });
});
