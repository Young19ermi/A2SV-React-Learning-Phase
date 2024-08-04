'use client';
import { useRouter } from 'next/navigation'; // Import from 'next/navigation'
import { useEffect, useState } from 'react';
import { GoDotFill } from 'react-icons/go'; // Ensure you have these imports
import { FaMapMarkerAlt ,FaPlusCircle, FaFire} from 'react-icons/fa';
import { FaFireFlameCurved, FaRegCalendarCheck } from "react-icons/fa6";
import { TiLocationOutline } from 'react-icons/ti';
import { LuCalendarClock } from 'react-icons/lu';

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

// Ensure you are in the right directory for this page component
const JobDetailPage: React.FC<{ params: { id: string } }> = ({ params }) => {
  const [jobPosting, setJobPosting] = useState<JobPosting | null>(null);

  useEffect(() => {
    const fetchJobPosting = async () => {
      try {
        const response = await fetch('/data.json'); // Ensure this path is correct
        const jobPostings: JobPosting[] = await response.json();
        const foundJob = jobPostings.find((posting) => posting.id === params.id);
        setJobPosting(foundJob || null);
      } catch (error) {
        console.error('Failed to fetch job postings:', error);
      }
    };

    if (params.id) {
      fetchJobPosting();
    }
  }, [params.id]);

  if (!jobPosting) {
    return <div>Loading...</div>;
  }
  return (
    <main
      className="grid grid-cols-3 gap-8 m-8 bg-landscape"
      style={{
        backgroundImage: 'url(/images/back 1.jpg)', // Path to your landscape background image
        backgroundSize: 'cover', // Ensures the background image covers the entire container
        backgroundPosition: 'center', // Centers the image
        backgroundRepeat: 'no-repeat', // Prevents tiling
        minHeight: '500px', // Adjust this value based on the aspect ratio of your background image
      }}
    >
      <div className="col-span-2 mt-[46px] w-[920px]">
        <h1 className="font-extrabold text-2xl mb-4 text-left font-poppins text-[#25324B]">Description</h1>
        <p className="mb-6 text-left font-epilogue text-[#25324B] text-base leading-7 font-normal">{jobPosting.description}</p>
        <h1 className="font-extrabold text-2xl mt-8 mb-4 text-left font-poppins text-[#25324B]">Responsibilities</h1>
        <ul className="text-left font-epilogue text-[#25324B] text-base leading-7 font-normal mb-6">
          {jobPosting.responsibilities.map((responsibility, index) => (
            <li key={index} className="flex items-center space-x-3 mb-2">
              <img
                src={`/images/icon.png`} // Use the appropriate path to your icons
                alt={`Responsibility icon ${index + 1}`}
                className="w-6 h-6" // Adjust size as needed
              />
              <span>{responsibility}</span>
            </li>
          ))}
        </ul>
        <h1 className="font-extrabold text-2xl mt-8 mb-4 text-left font-poppins text-[#25324B]">Ideal Candidates we Want</h1>
        <ul className="mt-3 mb-6 space-y-2 text-left font-epilogue text-[#25324B] text-base leading-7 font-normal">
          {jobPosting.ideal_candidate.traits.map((trait, index) => (
            <li key={index} className="flex items-center space-x-3">
              <GoDotFill className="text-lg font-bold text-[#25324B]" /> {/* Uniform bold dot */}
              <span>
                <strong>{trait.split(':')[0]}:</strong> {trait.split(':')[1]}
              </span>
            </li>
          ))}
        </ul>
        <h1 className="font-extrabold text-2xl mt-8 mb-4 text-left font-poppins text-[#25324B]">When & Where</h1>
        <div className="flex items-center space-x-3 text-left font-epilogue text-[#25324B] text-base leading-7 font-normal">
          <FaMapMarkerAlt className="text-xl" color="#26A4FF" />
          <p>{jobPosting.when_where}</p>
        </div>
      </div>
      <div className="w-[293px] mt-6">
        <h1 className="font-extrabold text-2xl mb-4">About</h1>
        <div className="space-y-3 mb-6">
          <div className="flex items-center space-x-2 w-full mb-2">
            <img src="/images/1.png" alt="Posted On icon" className="w-11 h-11" /> {/* Replace with your icon */}
            <p>
              Posted On{" "}
              <span className="font-semibold block">{jobPosting.about.posted_on}</span>
            </p>
          </div>
          <div className="flex items-center space-x-2 w-full mb-2">
            <img src="/images/2.png" alt="Deadline icon" className="w-11 h-11" /> {/* Replace with your icon */}
            <p>
              Deadline{" "}
              <span className="font-semibold block">{jobPosting.about.deadline}</span>
            </p>
          </div>
          <div className="flex items-center space-x-2 w-full mb-2">
            <img src="/images/3.png" alt="Location icon" className="w-11 h-11" /> {/* Replace with your icon */}
            <p>
              Location{" "}
              <span className="font-semibold block">{jobPosting.about.location}</span>
            </p>
          </div>
          <div className="flex items-center space-x-2 w-full mb-2">
            <img src="/images/4.png" alt="Start Date icon" className="w-11 h-11" /> {/* Replace with your icon */}
            <p>
              Start Date{" "}
              <span className="font-semibold block">{jobPosting.about.start_date}</span>
            </p>
          </div>
          <div className="flex items-center space-x-2 w-full mb-2">
            <img src="/images/5.png" alt="End Date icon" className="w-11 h-11" /> {/* Replace with your icon */}
            <p>
              End Date{" "}
              <span className="font-semibold block">{jobPosting.about.end_date}</span>
            </p>
          </div>
        </div>
        <div className="border-t border-[#D6DDEB] my-6" /> {/* Line between About and Categories */}
        <h1 className="font-extrabold text-2xl mb-4">Categories</h1>
        <div className="flex flex-wrap space-x-2 mb-6">
          {jobPosting.about.categories.map((category, index) => (
            <p
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
            </p>
          ))}
        </div>
        <div className="border-t border-[#D6DDEB] my-6" /> {/* Line between Categories and Required Skills */}
        <h1 className="font-extrabold text-2xl mb-4">Required Skills</h1>
        <div>
          <ul className="flex flex-wrap space-x-3 mb-6">
            {jobPosting.about.required_skills.map((skill, index) => (
              <li key={index} className="bg-[#F8F8FD] m-2 rounded p-1 text-[#4640DE]">
                {skill}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </main>
  );
  
  
  
  
  
  
};

export default JobDetailPage;
