import { render } from '@testing-library/react';
import { vi, test } from 'vitest';
import App from './App';

test('renders App component', () => {
  window.IntersectionObserver = vi.fn().mockImplementation(function() {
    return {
      observe: function() {},
      unobserve: function() {},
      disconnect: function() {}
    };
  });
  render(<App />);
});
