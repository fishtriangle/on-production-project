import { screen } from '@testing-library/react';
import { Sidebar } from 'widgets/Sidebar';
import { ComponentRender } from 'shared/lib/tests/ComponentRender/ComponentRender';

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
