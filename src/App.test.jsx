import { render } from '@testing-library/react';
import { test } from 'vitest';
import App from './App';

// Mock IntersectionObserver
window.IntersectionObserver = class {
  constructor(cb) {
    this.cb = cb;
  }
  observe() {
    this.cb([{ isIntersecting: true }]);
  }
  disconnect() {}
};

test('renders App component', () => {
  render(<App />);
});
