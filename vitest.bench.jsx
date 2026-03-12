import { render } from '@testing-library/react';
import { bench, describe, vi } from 'vitest';
import React from 'react';
import App from './src/App.jsx';

describe('App performance', () => {
  bench('renders App component', () => {
    window.IntersectionObserver = vi.fn().mockImplementation(function() {
      return {
        observe: function() {},
        unobserve: function() {},
        disconnect: function() {}
      };
    });
    render(<App />);
  });
});
