import { render, screen, act } from '@testing-library/react';
import MarketRatesWidget from './MarketRatesWidget';
import { vi, describe, test, expect, beforeEach, afterEach } from 'vitest';

// Mock fetch with a delay to simulate network latency
window.fetch = vi.fn();

// Mock IntersectionObserver
let intersectCallback = null;
window.IntersectionObserver = class {
  constructor(cb) { intersectCallback = cb; }
  observe = vi.fn();
  disconnect = vi.fn();
};

describe('MarketRatesWidget Latency', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    window.fetch.mockClear();
    localStorage.clear();

    window.fetch.mockImplementation(() => {
      return new Promise(resolve => {
        setTimeout(() => {
          resolve({
            ok: true,
            json: () => Promise.resolve({
              rates: { USD: 0.75, INR: 60.0, GBP: 0.60 },
              bitcoin: { usd: 50000 },
              ethereum: { usd: 3000 },
              solana: { usd: 100 }
            })
          });
        }, 500); // 500ms simulated network delay
      });
    });
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  test('measures latency to first data render', async () => {
    const startTime = performance.now();

    render(<MarketRatesWidget />);

    act(() => {
      if (intersectCallback) intersectCallback([{ isIntersecting: true }]);
    });

    // Data shouldn't be there yet
    expect(screen.queryByText('$0.750')).toBeNull();

    // Advance time by 10ms - if cache is used, it should be rendered!
    await act(async () => {
      await vi.advanceTimersByTimeAsync(10);
    });

    const hasDataAfter10ms = screen.queryByText('$0.750') !== null;

    // Advance the rest of the time
    await act(async () => {
      await vi.advanceTimersByTimeAsync(500);
    });

    const hasDataAfter500ms = screen.queryByText('$0.750') !== null;

    console.log(JSON.stringify({
      hasDataAfter10ms,
      hasDataAfter500ms
    }));
  });

  test('renders cached data immediately without waiting for fetch', async () => {
    // Pre-populate localStorage
    localStorage.setItem('market_rates_fiat', JSON.stringify({
      USD: '$0.888',
      INR: '₹66.66',
      GBP: '£0.555'
    }));

    render(<MarketRatesWidget />);

    act(() => {
      if (intersectCallback) intersectCallback([{ isIntersecting: true }]);
    });

    // UI should show cached data immediately, even though fetch takes 500ms
    expect(screen.queryByText('$0.888')).not.toBeNull();

    // Advance the rest of the time to complete fetch
    await act(async () => {
      await vi.advanceTimersByTimeAsync(500);
    });

    // Should show new fetched data
    expect(screen.queryByText('$0.750')).not.toBeNull();
  });
});
