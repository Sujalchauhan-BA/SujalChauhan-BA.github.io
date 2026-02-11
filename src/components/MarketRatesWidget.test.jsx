import { render, screen, waitFor } from '@testing-library/react';
import MarketRatesWidget from './MarketRatesWidget';
import { vi, describe, test, expect, beforeEach } from 'vitest';

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

describe('MarketRatesWidget', () => {
  beforeEach(() => {
    window.fetch.mockClear();
    observeMock.mockClear();
    disconnectMock.mockClear();
    intersectCallback = null;
  });

  test('fetches data and renders correctly (baseline check)', async () => {
    // Setup mock responses
    fetch.mockImplementation((url) => {
      if (url.includes('frankfurter')) {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve({
            rates: { USD: 0.75, INR: 60.0, GBP: 0.60 }
          })
        });
      }
      if (url.includes('coingecko')) {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve({
            bitcoin: { usd: 50000 },
            ethereum: { usd: 3000 },
            solana: { usd: 100 }
          })
        });
      }
      return Promise.reject(new Error('Unknown URL'));
    });

    render(<MarketRatesWidget />);

    // Trigger intersection
    if (intersectCallback) {
      intersectCallback([{ isIntersecting: true }]);
    }

    // Wait for data to load
    await waitFor(() => {
      expect(screen.getByText('Live Market Data')).toBeInTheDocument();
    });

    // Verify fetch calls
    expect(fetch).toHaveBeenCalledTimes(2);

    // Verify specific calls were made
    expect(fetch).toHaveBeenCalledWith(expect.stringContaining('frankfurter'));
    expect(fetch).toHaveBeenCalledWith(expect.stringContaining('vs_currencies=usd'));
  });
});
