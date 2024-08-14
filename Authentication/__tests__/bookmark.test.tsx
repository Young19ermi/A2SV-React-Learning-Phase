import { render, screen, waitFor } from '@testing-library/react';
import Favorite from '@/app/component/bookmark'; // Adjust the path as necessary
import { useSession } from 'next-auth/react';

// Mocking the useSession hook
jest.mock('next-auth/react', () => ({
  useSession: jest.fn(),
}));

describe('Favorite Component', () => {
  const mockSession = {
    data: {
      user: {
        accessToken: 'mock-access-token',
      },
    },
  };

  beforeEach(() => {
    (useSession as jest.Mock).mockReturnValue(mockSession);

    // Spy on fetch
    jest.spyOn(global, 'fetch').mockImplementation(async () => ({
      ok: true,
      json: async () => ({
        data: [
          {
            id: '1',
            logoUrl: 'https://example.com/logo.png',
            title: 'Software Engineer',
            orgName: 'Tech Corp',
            dateBookmarked: '2024-08-01T00:00:00.000Z',
            opType: 'Full-time',
          },
          {
            id: '2',
            logoUrl: 'https://example.com/logo2.png',
            title: 'Product Manager',
            orgName: 'Business Inc',
            dateBookmarked: '2024-08-02T00:00:00.000Z',
            opType: 'Part-time',
          },
        ],
      }),
    }) as unknown as Promise<Response>);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('fetches and renders bookmarks correctly', async () => {
    render(<Favorite />);

    // Check that the bookmarks are rendered
    await waitFor(() => {
        expect(screen.getByText('Software Engineer')).toBeInTheDocument();
        expect(screen.getByText('Tech Corp')).toBeInTheDocument();

        // Use getAllByText since there are multiple occurrences
        const bookmarkedElements = screen.getAllByText('Bookmarked on :');
        expect(bookmarkedElements).toHaveLength(2); // Adjust the length based on the number of expected elements

        // Check specific dates and job types
        expect(screen.getByText(new Date('2024-08-01T00:00:00.000Z').toLocaleDateString())).toBeInTheDocument();
        expect(screen.getByText('Full-time')).toBeInTheDocument();
        expect(screen.getByText(new Date('2024-08-02T00:00:00.000Z').toLocaleDateString())).toBeInTheDocument();
        expect(screen.getByText('Part-time')).toBeInTheDocument();
    });
});


  it('handles fetch errors gracefully', async () => {
    jest.spyOn(global, 'fetch').mockImplementation(async () => ({
      ok: false,
    }) as unknown as Promise<Response>);

    render(<Favorite />);

    await waitFor(() => expect(fetch).toHaveBeenCalledTimes(1));

    expect(screen.queryByText('Software Engineer')).not.toBeInTheDocument();
  });
});
