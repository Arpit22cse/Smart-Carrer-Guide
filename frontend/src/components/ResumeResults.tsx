import React from "react";
import { motion } from "framer-motion";
import {
  User,
  Mail,
  Phone,
  Code,
  Briefcase,
  GraduationCap,
  FolderGit2,
  Award,
  BadgeCheck,
  Sparkles,
  AlertTriangle,
  TrendingUp,
} from "lucide-react";


interface ResumeDashboardProps {
  analysis: any;
}


const ResumeDashboard: React.FC<ResumeDashboardProps> = ({
  analysis,
}) => {
  if (!analysis) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-gray-500 text-lg">
          No resume data found
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-6 lg:p-10">
      <div className="max-w-7xl mx-auto space-y-6">

        {/* HEADER */}
        <Section title="Resume Overview" icon={<User />}>
          <div className="flex flex-col md:flex-row gap-6 items-center">
            <div className="w-24 h-24 rounded-full bg-indigo-600 text-white flex items-center justify-center text-4xl font-black">
              {analysis.name?.charAt(0)}
            </div>

            <div>
              <h1 className="text-4xl font-black">
                {analysis.name || "Candidate"}
              </h1>
              <p className="text-gray-600 mt-3">
                {analysis.summary}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
            <InfoCard
              icon={<Mail />}
              title="Email"
              value={analysis.email}
            />

            <InfoCard
              icon={<Phone />}
              title="Phone"
              value={analysis.phone}
            />

            <InfoCard
              icon={<User />}
              title="Location"
              value={analysis.location}
            />
          </div>
        </Section>
        {/* ATS SCORE */}
        <Section title="ATS Score" icon={<BadgeCheck />}>
          <div className="flex items-center gap-6">
            <div className="text-6xl font-black text-indigo-600">
              {analysis.atsScore || 0}%
            </div>

            <div>
              <h3 className="font-bold text-xl">
                Resume Strength
              </h3>
              <p className="text-gray-500">
                ATS compatibility based on skills, keywords and experience
              </p>
            </div>
          </div>
        </Section>
        {/* JOB ROLES */}
        <Section title="Best Matching Job Roles" icon={<Briefcase />}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {analysis.jobRoles?.map((role: any, index: number) => (
              <div key={index} className="bg-indigo-50 rounded-xl p-5">
                <h3 className="font-bold text-xl">
                  {role.role}
                </h3>
                <p className="text-indigo-600 font-bold mt-2">
                  {role.matchScore}% Match
                </p>
                <p className="text-gray-600 mt-2">
                  {role.reason}
                </p>
              </div>
            ))}
          </div>
        </Section>

        {/* SKILLS */}
        <Section title="Technical Skills" icon={<Code />}>
          <div className="flex flex-wrap gap-3">
            {analysis.skills?.map((skill: string, index: number) => (
              <Badge key={index} text={skill} />
            ))}
          </div>
        </Section>

        {/* TECHNOLOGY */}
        <Section title="Technology Stack" icon={<Code />}>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {analysis.techStack?.map((item: string, index: number) => (
              <div key={index} className="bg-indigo-50 text-indigo-700 rounded-xl p-4 text-center font-semibold">
                {item}
              </div>
            ))}
          </div>
        </Section>


        {/* PROJECTS */}
        <Section title="Projects" icon={<FolderGit2 />}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {analysis.projects?.map((project: any, index: number) => (
              <div key={index} className="bg-gray-50 border rounded-xl p-5">
                <h3 className="font-bold text-xl">
                  {project.title}
                </h3>
                <p className="text-gray-600 mt-3">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2 mt-4">
                  {project.technologies?.map((t: string, i: number) => (
                    <Badge key={i} text={t} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* EXPERIENCE */}
        <Section title="Experience" icon={<Briefcase />}>
          {analysis.experience?.map((exp: any, index: number) => (
            <div key={index} className="border-l-4 border-indigo-600 pl-5 mb-6">
              <h3 className="font-bold text-lg">
                {exp.role}
              </h3>
              <p className="text-indigo-600">
                {exp.company}
              </p>
              <p className="text-gray-500">
                {exp.duration}
              </p>
              <p className="text-gray-600 mt-2">
                {exp.description}
              </p>
            </div>
          ))}
        </Section>


        {/* EDUCATION */}
        <Section title="Education" icon={<GraduationCap />}>
          {analysis.education?.map((edu: any, index: number) => (
            <div key={index} className="bg-gray-50 rounded-xl p-5 mb-3">
              <h3 className="font-bold">
                {edu.degree}
              </h3>
              <p>
                {edu.institute}
              </p>
              <p className="text-gray-500">
                {edu.year}
              </p>
            </div>
          ))}
        </Section>


        {/* STRENGTH */}
        <Section title="Resume Strengths" icon={<TrendingUp />}>
          <List items={analysis.strengths} />
        </Section>


        {/* WEAKNESS */}
        <Section title="Weaknesses" icon={<AlertTriangle />}>
          <List items={analysis.weaknesses} />
        </Section>

        {/* MISSING */}
        <Section title="Missing Sections" icon={<AlertTriangle />}>
          <List items={analysis.missingSections} />
        </Section>

        {/* IMPROVEMENTS */}
        <Section title="How To Improve Resume" icon={<Sparkles />}>
          <div className="space-y-4">
            {analysis.improvementSuggestions?.map((item: any, index: number) => (
              <div key={index} className="border rounded-xl p-5">
                <div className="flex justify-between">
                  <h3 className="font-bold">
                    {item.title}
                  </h3>
                  <span className="bg-yellow-100 px-3 py-1 rounded-full text-sm">
                    {item.priority}
                  </span>
                </div>
                <p className="text-gray-600 mt-2">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </Section>

        {/* SKILL GAP */}
        <Section title="Skills To Learn" icon={<Code />}>
          <div className="flex flex-wrap gap-3">
            {analysis.skillGaps?.map((skill: string, index: number) => (
              <Badge key={index} text={skill} />
            ))}
          </div>
        </Section>


        {/* CERTIFICATIONS */}
        <Section title="Recommended Certifications" icon={<Award />}>
          <List items={analysis.recommendedCertifications} />
        </Section>
      </div>
    </div>
  );
};
const Section = ({ title, icon, children }: any) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="bg-white rounded-3xl shadow p-6 sm:p-8"
  >
    <div className="flex items-center gap-3 mb-6">
      <div className="text-indigo-600">
        {icon}
      </div>
      <h2 className="text-2xl font-bold">
        {title}
      </h2>
    </div>
    {children}
  </motion.div>
);

const InfoCard = ({ icon, title, value }: any) => (
  <div className="bg-gray-50 rounded-xl p-4 flex gap-3 items-center">
    <div className="text-indigo-600">
      {icon}
    </div>
    <div>
      <p className="text-xs text-gray-500">
        {title}
      </p>
      <p className="font-semibold break-all">
        {value || "Not Available"}
      </p>
    </div>
  </div>
);

const Badge = ({ text }: { text: string }) => (
  <span className="bg-indigo-100 text-indigo-700 px-3 py-2 rounded-xl text-sm font-semibold">
    {text}
  </span>
);

const List = ({ items = [] }: { items: string[] }) => (
  <div className="space-y-3">
    {items?.map((item, index) => (
      <div key={index} className="bg-gray-50 rounded-xl p-4">
        {item}
      </div>
    ))}
  </div>
);

export default ResumeDashboard;