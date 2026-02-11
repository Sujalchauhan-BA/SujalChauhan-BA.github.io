import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import GeminiChat from './GeminiChat';

// Mock CSS
vi.mock('./GeminiChat.css', () => ({}));

// Mock GoogleGenerativeAI
const mockStartChat = vi.fn().mockReturnValue({
  sendMessage: vi.fn().mockResolvedValue({
    response: {
      text: () => 'Mock API Response',
    },
  }),
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

describe('GeminiChat Persistence', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
    vi.stubEnv('VITE_GEMINI_API_KEY', 'test-key');
    window.HTMLElement.prototype.scrollIntoView = vi.fn();
  });

  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it('loads history from localStorage on mount', () => {
    const savedHistory = [
      { role: 'model', text: 'Previous greeting' },
      { role: 'user', text: 'Previous user message' },
      { role: 'model', text: 'Previous answer' }
    ];
    localStorage.setItem('gemini_chat_history', JSON.stringify(savedHistory));

    render(<GeminiChat />);

    // Open chat
    const toggleBtn = screen.getByRole('button', { name: /Ask Sujal AI/i });
    fireEvent.click(toggleBtn);

    expect(screen.getByText('Previous greeting')).toBeInTheDocument();
    expect(screen.getByText('Previous user message')).toBeInTheDocument();
    expect(screen.getByText('Previous answer')).toBeInTheDocument();
  });

  it('saves new messages to localStorage', async () => {
    render(<GeminiChat />);

    // Open chat
    const toggleBtn = screen.getByRole('button', { name: /Ask Sujal AI/i });
    fireEvent.click(toggleBtn);

    const input = await screen.findByPlaceholderText("Ask about Sujal's skills...");

    // Find send button (last button in the open chat)
    const buttons = screen.getAllByRole('button');
    const sendBtn = buttons[buttons.length - 1];

    fireEvent.change(input, { target: { value: 'New Message' } });
    fireEvent.click(sendBtn);

    await waitFor(() => {
      const stored = JSON.parse(localStorage.getItem('gemini_chat_history'));
      // Expect: Default greeting + User message + Model response = 3
      expect(stored).toHaveLength(3);
      expect(stored[1].text).toBe('New Message');
      expect(stored[2].text).toBe('Mock API Response');
    });
  });

  it('initializes startChat with loaded history', async () => {
     const savedHistory = [
      { role: 'model', text: 'Greeting' },
      { role: 'user', text: 'Old Question' },
      { role: 'model', text: 'Old Answer' }
    ];
    localStorage.setItem('gemini_chat_history', JSON.stringify(savedHistory));

    render(<GeminiChat />);

    const toggleBtn = screen.getByRole('button', { name: /Ask Sujal AI/i });
    fireEvent.click(toggleBtn);

    const input = await screen.findByPlaceholderText("Ask about Sujal's skills...");
    const buttons = screen.getAllByRole('button');
    const sendBtn = buttons[buttons.length - 1];

    fireEvent.change(input, { target: { value: 'New Question' } });
    fireEvent.click(sendBtn);

    await waitFor(() => {
        expect(mockStartChat).toHaveBeenCalledTimes(1);
    });

    const calls = mockStartChat.mock.calls;
    const historyArg = calls[0][0].history;

    // Expected history:
    // 0: System (User)
    // 1: Ack (Model)
    // 2: Old Question (User) - Greeting (Model) is stripped
    // 3: Old Answer (Model)

    expect(historyArg).toHaveLength(4);
    expect(historyArg[0].parts[0].text).toContain('You are an AI assistant');
    expect(historyArg[1].parts[0].text).toBe('Understood. I am ready to answer questions about Sujal Chauhan.');
    expect(historyArg[2].parts[0].text).toBe('Old Question');
    expect(historyArg[2].role).toBe('user');
    expect(historyArg[3].parts[0].text).toBe('Old Answer');
    expect(historyArg[3].role).toBe('model');
  });
});
