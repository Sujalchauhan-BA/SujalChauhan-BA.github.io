import { render, act } from '@testing-library/react';
import WeatherWidget from './WeatherWidget';
import { vi, describe, test, expect, beforeEach, afterEach } from 'vitest';

// Mock fetch
window.fetch = vi.fn();

// Mock IntersectionObserver
const observeMock = vi.fn();
const disconnectMock = vi.fn();
let intersectCallback = null;

window.IntersectionObserver = class {
  constructor(cb) {
    intersectCallback = cb;
  }
  observe = observeMock;
  disconnect = disconnectMock;
};

describe('WeatherWidget Performance', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    window.fetch.mockClear();
    observeMock.mockClear();
    disconnectMock.mockClear();
    intersectCallback = null;

    // Setup generic mock response
    window.fetch.mockResolvedValue({
        ok: true,
        json: () => Promise.resolve({
            current: {
                temperature_2m: 20,
                weather_code: 0
            }
        })
    });
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  test('does NOT fetch data when hidden (initial state)', () => {
    render(<WeatherWidget />);

    // Observer should be set up
    expect(observeMock).toHaveBeenCalled();

    // Should NOT fetch yet if optimized
    expect(window.fetch).not.toHaveBeenCalled();
  });

  test('fetches and polls when becomes visible', async () => {
    render(<WeatherWidget />);

    // Simulate becoming visible
    act(() => {
        if (intersectCallback) {
            intersectCallback([{ isIntersecting: true }]);
        }
    });

    // Should fetch immediately
    expect(window.fetch).toHaveBeenCalledTimes(1);

    // Fast forward 30 mins (polling interval)
    await act(async () => {
        await vi.advanceTimersByTimeAsync(30 * 60 * 1000);
    });

    // Should have called again
    expect(window.fetch).toHaveBeenCalledTimes(2);
  });

  test('stops polling when becomes hidden', async () => {
    render(<WeatherWidget />);

    // Make visible first
    act(() => {
        if (intersectCallback) {
            intersectCallback([{ isIntersecting: true }]);
        }
    });
    expect(window.fetch).toHaveBeenCalledTimes(1);

    // Make hidden
    act(() => {
        if (intersectCallback) {
            intersectCallback([{ isIntersecting: false }]);
        }
    });

    // Fast forward 30 mins
    await act(async () => {
        await vi.advanceTimersByTimeAsync(30 * 60 * 1000);
    });

    // Should NOT have called fetch again (count stays at 1)
    expect(window.fetch).toHaveBeenCalledTimes(1);
  });
});
