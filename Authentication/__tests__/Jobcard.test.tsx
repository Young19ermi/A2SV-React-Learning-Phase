import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import JobCard from '@/app/component/JobCard'; // Adjust the path as necessary
import { Job } from '@/app/api/jobs/route';
import '@testing-library/jest-dom'; 

// Mocking the fetch function
jest.mock("next-auth/react", () => ({
  useSession: jest.fn(),
}));

describe("JobCard", () => {
  const job: Job = {
    id: "1",
    title: "Software Engineer",
    orgName: "Tech Company",
    location: ["New York, NY"],
    description: "A challenging role in a great company.",
    logoUrl: "https://via.placeholder.com/150",
    opType: "Full-time",
    categories: ["Engineering", "Software"],
    isBookmarked: false,
  };

  const accessToken = "fake-access-token";

  beforeEach(() => {
    // Mock the fetch function
    jest.spyOn(global, "fetch").mockImplementation(async (url, options) => {
      if (options?.method === "POST") {
        return {
          ok: true,
          json: async () => ({}),
        } as Response;
      }
      if (options?.method === "DELETE") {
        return {
          ok: true,
          json: async () => ({}),
        } as Response;
      }
      return {
        ok: false,
      } as Response;
    });
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("renders job details correctly", () => {
    render(<JobCard job={job} accessToken={accessToken} />);

    expect(screen.getByTestId("job-title")).toHaveTextContent(job.title);
    expect(screen.getByTestId("job-org")).toHaveTextContent(job.orgName);
    expect(screen.getByTestId("job-location")).toHaveTextContent(job.location[0]);
    expect(screen.getByTestId("job-description")).toHaveTextContent(job.description);
  });

  it("renders bookmark icon correctly when not bookmarked", () => {
    render(<JobCard job={job} accessToken={accessToken} />);

    expect(screen.getByTestId("bookmark-icon")).toBeInTheDocument();
    expect(screen.queryByTestId("bookmarked-icon")).not.toBeInTheDocument();
  });

  it("renders bookmarked icon correctly when bookmarked", () => {
    render(<JobCard job={{ ...job, isBookmarked: true }} accessToken={accessToken} />);

    expect(screen.queryByTestId("bookmark-icon")).not.toBeInTheDocument();
    expect(screen.getByTestId("bookmarked-icon")).toBeInTheDocument();
  });

  it("calls add bookmark API when bookmark icon is clicked", async () => {
    render(<JobCard job={job} accessToken={accessToken} />);

    fireEvent.click(screen.getByTestId("bookmark-icon"));

    await waitFor(() =>
      expect(global.fetch).toHaveBeenCalledWith(
        `https://akil-backend.onrender.com/bookmarks/${job.id}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
    );
  });

  it("calls delete bookmark API when bookmarked icon is clicked", async () => {
    render(<JobCard job={{ ...job, isBookmarked: true }} accessToken={accessToken} />);

    fireEvent.click(screen.getByTestId("bookmarked-icon"));

    await waitFor(() =>
      expect(global.fetch).toHaveBeenCalledWith(
        `https://akil-backend.onrender.com/bookmarks/${job.id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
    );
  });

  it("handles fetch errors gracefully", async () => {
    jest.spyOn(global, "fetch").mockImplementation(async () => ({
      ok: false,
    }) as unknown as Promise<Response>);

    render(<JobCard job={job} accessToken={accessToken} />);

    fireEvent.click(screen.getByTestId("bookmark-icon"));

    await waitFor(() =>
      expect(global.fetch).toHaveBeenCalledTimes(1)
    );

    expect(screen.queryByTestId("bookmarked-icon")).not.toBeInTheDocument();
  });
});
