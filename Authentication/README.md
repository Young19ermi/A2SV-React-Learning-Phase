# 🚀 Job Portal Website A2SV Learning Phase Task

A simple and efficient job portal built with **Next.js**, **TypeScript**, and **Tailwind CSS**. This platform allows users to explore a variety of job positions, bookmark their favorites, and manage their accounts with seamless authentication and secure OTP verification.

## 📸 Screenshots of the Pages
![Screenshot 2024-08-04 174353](https://github.com/user-attachments/assets/e264aac3-501e-430d-9507-a93ac2a99de3)
![1](https://github.com/user-attachments/assets/97be4a7c-cf50-4667-9ade-12547e3dbf89)
![Screenshot 2024-08-14 130554](https://github.com/user-attachments/assets/6a3ad18d-ff1e-4278-9fca-672a69449339)
![Screenshot 2024-08-14 124841](https://github.com/user-attachments/assets/3e4828d5-a27b-4f97-a300-d0de510f11f0)
![Screenshot 2024-08-14 124801](https://github.com/user-attachments/assets/4ba853a3-a7d8-42ac-874d-2ebe1480795e)
![Screenshot 2024-08-14 124747](https://github.com/user-attachments/assets/e766f88a-c2e1-4a22-9a87-6816dddda28a)
![Screenshot 2024-08-14 124727](https://github.com/user-attachments/assets/2bbdefb9-9b8d-4010-b8fa-8ddb3ae50dcb)
- **/jobs** - 🗒️ **Job Listings**  
  This page presents users with a comprehensive list of all available job positions. Each job listing contains key information such as the job title, company name, location, and a short description, making it easy for users to browse and find relevant opportunities. Users can scroll through the list and select any job to view further details.

- **/description/[id]** - 🔍 **Job Description**  
  On this page, users can dive into the specifics of each job. For every selected job listing, detailed information is displayed, including the full job description, required skills, salary expectations, and application instructions. This page helps users make informed decisions before applying.

- **Sign Up** - 🔐 **Create Account**  
  This page allows new users to register for an account by providing their essential details, such as name, email, and password. A user-friendly interface ensures that the sign-up process is quick and smooth, allowing users to access the platform’s features, such as bookmarking and job tracking.

- **OTP Verification** - 📞 **Secure Authentication**  
  To ensure secure user authentication, this page handles the verification of users via a One-Time Password (OTP). After registering or logging in, users receive an OTP on their mobile or email, which they must input to complete the verification process. This adds an extra layer of security.

- **Sign In** - 🔒 **Access Account**  
  Registered users can sign in to their accounts from this page by entering their email and password. The interface provides a simple and clear login process, allowing users to access their bookmarks and job search history.

- **Favorites** - 💖 **Bookmarked Jobs**  
  This page is where users can access all the jobs they’ve bookmarked. The saved job listings are neatly organized, giving users quick access to jobs they found interesting or want to apply for in the future. This feature is designed to simplify the job application process by providing users with a personalized list of preferred job positions.

---

## ✨ Features

- **💼 Job Listings**: Browse through available job positions.
- **🔍 Job Descriptions**: In-depth details for each job.
- **🧭 User Navigation**: Smooth transitions between listings and job details.
- **💾 Job Bookmark**: Save favorite jobs for later.
- **🔑 User Authentication**: Account creation, sign-in, and security with OTP.

---

## 🛠️ Technologies Used

- **Next.js**: React framework for server-rendered applications.
- **TypeScript**: Strongly typed JavaScript for reliability and scalability.
- **Tailwind CSS**: A utility-first CSS framework for designing modern UIs.
- **React Icons**: Iconography for enhanced visual presentation.
- **NextAuth**: Authentication library for OAuth providers.
- **React Hook Form**: Efficient form validation and management.
- **Ant Design**: A UI component library for faster development.

---

## 🚀 Installation

To set up the project locally, follow these steps:

1. Clone the repository:

```bash
git clone https://github.com/Young19ermi/A2SV-React-Learning-Phase.git
```

2. Navigate to the project directory:

```bash
cd job-portal-website
```

3. Install dependencies:

```bash
npm install
```

4. Run the development server:

```bash
npm run dev
```

5. Open your browser and visit:

```bash
http://localhost:3000
```

---

## 📂 Project Structure

Within the repository, you’ll find a folder called **Authentication**, containing important files related to user authentication. This is where the logic for handling user login, registration, and OTP verification resides.

Feel free to explore the code and contribute to the project!
