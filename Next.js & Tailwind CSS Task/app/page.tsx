'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

// Define interfaces directly here
interface IdealCandidate {
  age: string;
  gender: string;
  traits: string[];
}

interface About {
  posted_on: string;
  deadline: string;
  location: string;
  start_date: string;
  end_date: string;
  categories: string[];
  required_skills: string[];
}

interface JobPosting {
  id: string;
  title: string;
  description: string;
  responsibilities: string[];
  ideal_candidate: IdealCandidate;
  when_where: string;
  about: About;
  company: string;
  image: string;
}

const HomePage: React.FC = () => {
  const [jobPostings, setJobPostings] = useState<JobPosting[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/data.json'); // Ensure this path is correct
        const result: JobPosting[] = await response.json();
        setJobPostings(result);
      } catch (error) {
        console.error('Failed to fetch job postings:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className='relative w-full flex justify-center p-4'>
      <div className='w-7/12'>
        <div className='relative mb-6'>
          <h1 className="text-[#25324B] font-[900] text-[32px] leading-[38.4px] font-bold mb-2">
            Opportunities
          </h1>
          <p className="text-[#7C8493] font-[400] text-[16px] leading-[25.6px] mb-4">
            Showing {jobPostings.length} results
          </p>
        </div>

        <div className='flex flex-col items-start'>
          {jobPostings.length === 0 ? (
            <div>Loading...</div>
          ) : (
            jobPostings.map((posting) => (
              <Link key={posting.id} href={`/job/${posting.id}`}>
                <div className="w-full p-3 mb-4 flex flex-col items-start justify-start bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200 cursor-pointer">
                  <div className="flex items-center p-6">
                    <img src={posting.image ? `/images/${posting.image}` : '/images/image.png'} alt={posting.company} className="w-24 h-24 rounded-full object-cover" />
                    <div className="ml-6 flex flex-col">
                      <h1 className="text-2xl font-bold">{posting.title}</h1>
                      <div className="text-sm text-gray-600 flex items-center">
                        <p className="mr-2">{posting.company}</p>
                        <span className="mx-1 text-gray-600">•</span>
                        <p>{posting.about.location}</p>
                      </div>
                      <p className="mt-2">{posting.description}</p>
                      <div className="mt-4 flex flex-wrap items-center gap-2">
                        {posting.about.categories.length > 0 ? (
                          <>
                            {posting.about.categories.map((category, index) => (
                              <span
                                key={index}
                                className={`border px-3 py-1 rounded-lg text-xs ${
                                  index === 0
                                    ? 'text-[#56CDAD] bg-[#E0F7F4]'
                                    : index === 1
                                    ? 'border-[#FFB836] text-[#FFB836]'
                                    : 'border border-[#4640DE] text-[#4640DE]'
                                }`}
                              >
                                {category}
                              </span>
                            ))}
                          </>
                        ) : (
                          <span className="border border-gray-700 px-3 py-1 rounded-lg text-xs text-gray-700">
                            No categories listed.
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
