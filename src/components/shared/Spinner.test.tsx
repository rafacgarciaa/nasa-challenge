import { render } from '@testing-library/react';

import { Spinner } from './Spinner';

test('should render the text "Loading..."', () => {
  const { getByText, getByRole } = render(<Spinner />);
  
  const container = getByRole('status');
  expect(container.className).toBe('spinner-border text-muted');
  expect(container).toBeInTheDocument();

  const span = getByText('Loading...');
  expect(span.className).toBe('sr-only');
  expect(span.tagName).toBe('SPAN');
  expect(span).toBeInTheDocument();
});
