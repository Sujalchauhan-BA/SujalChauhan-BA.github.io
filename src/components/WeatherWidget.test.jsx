import { render, screen, waitFor } from '@testing-library/react';
import WeatherWidget from './WeatherWidget';
import { vi, describe, test, expect, beforeEach } from 'vitest';

// Mock fetch
window.fetch = vi.fn();

describe('WeatherWidget', () => {
  beforeEach(() => {
    window.fetch.mockClear();
  });

  test('renders weather data after fetch', async () => {
    window.fetch.mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({
        current: {
          temperature_2m: 25,
          weather_code: 0
        }
      })
    });

    render(<WeatherWidget />);

    expect(screen.getByText(/Toronto Weather/i)).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText('25°C')).toBeInTheDocument();
      expect(screen.getByText('Clear Sky')).toBeInTheDocument();
    });
  });

  test('handles fetch error gracefully', async () => {
    window.fetch.mockRejectedValue(new Error('API Error'));

    render(<WeatherWidget />);

    await waitFor(() => {
      expect(screen.getByText('--°C')).toBeInTheDocument();
      expect(screen.getByText('Unavailable')).toBeInTheDocument();
    });
  });
});
