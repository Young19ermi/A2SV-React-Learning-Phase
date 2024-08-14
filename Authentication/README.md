![alt text](<Screenshot 2024-08-07 141014.png>) 
![alt text](<Screenshot 2024-08-07 140923.png>) 
![alt text](<Screenshot 2024-08-07 140943.png>) 
![alt text](<Screenshot 2024-08-07 141145.png>)
# Job Listing Application

Welcome to the Job Listing Application! This project is designed to provide users with a comprehensive list of job opportunities, including detailed views of job descriptions, responsibilities, and ideal candidate traits. The application leverages both Google and database authentication for user management.


## Features

- List of job postings
- Detailed job description view
- Job responsibilities and ideal candidate traits
- Job location and timing details
- Dynamic job count update
- **Bookmark functionality**: Users can bookmark job listings for quick access later.
- **Favorites page**: A dedicated page to view all bookmarked jobs, accessible only to logged-in users.
- User authentication via Google and database

## Technologies Used

- React
- Next.js (with app route)
- TypeScript
- Tailwind CSS
- Node.js
- JSON for job data storage
- NextAuth.js for authentication
- Jest for unit testing
- Cypress for end-to-end testing

## Authentication

The application supports user authentication through:

- **Google Sign-In**: Allows users to sign in using their Google accounts.
- **Database Authentication**: Users can also log in using credentials stored in the application's database.

### Authentication Setup

1. **Google Authentication**:
   - Integrated using NextAuth.js with GoogleProvider.
   - Ensure to set up your Google API credentials and add them to your environment variables.

2. **Database Authentication**:
   - Implemented using NextAuth.js with CredentialsProvider.
   - Ensure the backend service is set up to handle authentication requests and store user credentials securely.


## Bookmark & Favorites

- **Bookmarking**: Users can bookmark job listings by clicking on the bookmark icon. Bookmarked jobs can be accessed from the Favorites page.
![alt text](<Screenshot 2024-08-12 134432.png>)

- **Favorites Page**: Only accessible to logged-in users, this page shows all jobs that the user has bookmarked.
![alt text](<Screenshot 2024-08-12 134402.png>) 


## Testing

The application is thoroughly tested using both unit and end-to-end tests:

![alt text](<Screenshot 2024-08-12 134632.png>)
- **Jest**: Used for unit testing of individual components and utility functions.
![alt text](<Screenshot 2024-08-12 134558.png>) 
- **Cypress**: Used for end-to-end testing, ensuring that the user experience is smooth from login to job searching, bookmarking, and more.

## Usage

Once the application is running, you can:

- **Authenticate**: Use Google Sign-In or login with database credentials.
- **View Job Listings**: Access the main page to see a list of job postings.
- **View Job Details**: Click on any job to view detailed information, including descriptions, responsibilities, ideal candidate traits, and location/timing details.
- **Bookmark Jobs**: Save jobs to view later in the Favorites page.
- **Access Favorites**: Navigate to the Favorites page to see all your bookmarked jobs.

### Components

- **JobCard**: Displays a brief overview of each job.
- **JobDetail**: Shows detailed information about a selected job.
- **JobList**: Fetches and displays the list of jobs.
- **Favorites**: Displays all jobs that the user has bookmarked.
- **About**: Displays additional information about the job.

### Pages

- **index.tsx**: The main page that renders the job list.
- **favorites.tsx**: A page that displays the user's bookmarked jobs.

---
