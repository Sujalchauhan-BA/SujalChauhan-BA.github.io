import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import GeminiChat from './GeminiChat';
import { GoogleGenerativeAI } from '@google/generative-ai';

// Mock the CSS
vi.mock('./GeminiChat.css', () => ({}));

// Mock GoogleGenerativeAI
const mockSendMessage = vi.fn().mockResolvedValue({
  response: {
    text: vi.fn().mockReturnValue('Mock response'),
  },
});

const mockStartChat = vi.fn().mockReturnValue({
  sendMessage: mockSendMessage,
});

const mockGetGenerativeModel = vi.fn().mockReturnValue({
  startChat: mockStartChat,
});

vi.mock('@google/generative-ai', () => {
  return {
    GoogleGenerativeAI: vi.fn(function() {
      return {
        getGenerativeModel: mockGetGenerativeModel,
      };
    }),
  };
});

describe('GeminiChat Performance', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.stubEnv('VITE_GEMINI_API_KEY', 'test-api-key');
    // Mock scrollIntoView for jsdom
    window.HTMLElement.prototype.scrollIntoView = vi.fn();
  });

  it('instantiates GoogleGenerativeAI only once', async () => {
    render(<GeminiChat />);

    // Open chat
    const toggleBtn = screen.getByRole('button', { name: /Ask Sujal AI/i });
    fireEvent.click(toggleBtn);

    // Wait for chat window to open
    const input = await screen.findByPlaceholderText("Ask about Sujal's skills...");

    // Find send button (it's the second button in the DOM when chat is open)
    // The first one is the close button
    const buttons = screen.getAllByRole('button');
    const sendBtn = buttons[buttons.length - 1];

    // Send first message
    fireEvent.change(input, { target: { value: 'First message' } });
    fireEvent.click(sendBtn);

    await waitFor(() => {
      expect(mockStartChat).toHaveBeenCalledTimes(1);
    });

    // Send second message
    fireEvent.change(input, { target: { value: 'Second message' } });
    fireEvent.click(sendBtn);

    await waitFor(() => {
      expect(mockStartChat).toHaveBeenCalledTimes(2);
    });

    // Verify constructor calls
    // With optimization, it should be called only 1 time (during initial render/memo).
    expect(GoogleGenerativeAI).toHaveBeenCalledTimes(1);
  });
});
