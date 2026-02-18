import { render, screen, waitFor } from '@testing-library/react';
import WeatherWidget from './WeatherWidget';
import { vi, describe, test, expect, beforeEach } from 'vitest';

// Mock fetch
window.fetch = vi.fn();

// Mock IntersectionObserver to make it visible by default for functional tests
window.IntersectionObserver = class {
  constructor(cb) {
    this.cb = cb;
  }
  observe() {
    this.cb([{ isIntersecting: true }]);
  }
  disconnect() {}
};

describe('WeatherWidget Functional', () => {
  beforeEach(() => {
    window.fetch.mockClear();
  });

  test('renders correctly and displays temperature from API', async () => {
    window.fetch.mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({
        current: {
          temperature_2m: 22.4,
          weather_code: 0 // Clear Sky
        }
      })
    });

    render(<WeatherWidget />);

    await waitFor(() => {
      expect(screen.getByText('22°C')).toBeInTheDocument();
      expect(screen.getByText('Clear Sky')).toBeInTheDocument();
    });
  });

  test('displays "Unavailable" state if fetch fails', async () => {
    window.fetch.mockRejectedValue(new Error('API error'));

    render(<WeatherWidget />);

    await waitFor(() => {
      expect(screen.getByText('--°C')).toBeInTheDocument();
      expect(screen.getByText('Unavailable')).toBeInTheDocument();
    });
  });

  test('renders location correctly', () => {
    render(<WeatherWidget />);
    expect(screen.getByText('Toronto, ON')).toBeInTheDocument();
  });
});
