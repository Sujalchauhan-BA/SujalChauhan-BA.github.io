import { render, act } from '@testing-library/react';
import MarketRatesWidget from './MarketRatesWidget';
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

describe('MarketRatesWidget Performance', () => {
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
            rates: { USD: 0.75, INR: 60.0, GBP: 0.60 },
            bitcoin: { usd: 50000 },
            ethereum: { usd: 3000 },
            solana: { usd: 100 }
        })
    });
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  test('does NOT fetch data when hidden (initial state)', () => {
    render(<MarketRatesWidget />);

    // Default state is isVisible=false.
    // Observer is set up.
    expect(observeMock).toHaveBeenCalled();

    // Should not fetch yet
    expect(window.fetch).not.toHaveBeenCalled();

    // Fast forward time
    act(() => {
        vi.advanceTimersByTime(60000);
    });

    // Still no fetch
    expect(window.fetch).not.toHaveBeenCalled();
  });

  test('fetches and polls when becomes visible', async () => {
    render(<MarketRatesWidget />);

    // Simulate becoming visible
    act(() => {
        if (intersectCallback) {
            intersectCallback([{ isIntersecting: true }]);
        }
    });

    // Should fetch immediately (2 calls: fiat + crypto)
    expect(window.fetch).toHaveBeenCalledTimes(2);

    // Fast forward 60s
    await act(async () => {
        await vi.advanceTimersByTimeAsync(60000);
    });

    // Should have called again (2 + 2 = 4)
    expect(window.fetch).toHaveBeenCalledTimes(4);
  });

  test('stops polling when becomes hidden', async () => {
    render(<MarketRatesWidget />);

    // Make visible first
    act(() => {
        if (intersectCallback) {
            intersectCallback([{ isIntersecting: true }]);
        }
    });
    expect(window.fetch).toHaveBeenCalledTimes(2);

    // Make hidden
    act(() => {
        if (intersectCallback) {
            intersectCallback([{ isIntersecting: false }]);
        }
    });

    // Fast forward 60s
    await act(async () => {
        await vi.advanceTimersByTimeAsync(60000);
    });

    // Should NOT have called fetch again (count stays at 2)
    expect(window.fetch).toHaveBeenCalledTimes(2);
  });
});
