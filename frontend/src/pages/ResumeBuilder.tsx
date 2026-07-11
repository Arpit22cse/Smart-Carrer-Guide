import React, { useState, useRef } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { useReactToPrint } from "react-to-print";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus,
  ChevronRight,
  ChevronLeft,
  Download,
  User,
  Link2,
  Briefcase,
  GraduationCap,
} from "lucide-react";

// Templates
import ModernLayout from "../layouts/ModernLayout";
import CreativeLayout from "../layouts/CreativeLayout";
import ProfessionalLayout from "../layouts/ProfessionalLayout";

/* ================= TYPES ================= */

interface Experience {
  role: string;
  company: string;
  duration: string;
  description: string;
}

interface Project {
  title: string;
  description: string;
  link: string;
  techStack: string;
}

interface Education {
  degree: string;
  institution: string;
  year: string;
}

interface Certification {
  title: string;
  issuer: string;
  date: string;
}

interface FormData {
  profile: {
    fullname: string;
    email: string;
    phone: string;
    summary: string;
  };
  links: {
    linkedin: string;
    github: string;
    portfolio: string;
  };
  skills: string;
  experience: Experience[];
  projects: Project[];
  certifications: Certification[];
  education: Education[];
}

/* ================= COMPONENT ================= */

const ResumeBuilder: React.FC = () => {
  const [step, setStep] = useState<"form" | "preview">("form");
  const [activeTemplate, setActiveTemplate] = useState<
    "modern" | "classic" | "minimal"
  >("modern");

  const resumeRef = useRef<HTMLDivElement>(null);

  const { register, control, watch } = useForm<FormData>({
    defaultValues: {
      profile: {
        fullname: "",
        email: "",
        phone: "",
        summary: "",
      },
      links: {
        linkedin: "",
        github: "",
        portfolio: "",
      },
      skills: "",
      experience: [
        { role: "", company: "", duration: "", description: "" },
      ],
      projects: [
        { title: "", description: "", link: "", techStack: "" },
      ],
      certifications: [{ title: "", issuer: "", date: "" }],
      education: [{ degree: "", institution: "", year: "" }],
    },
  });

  const exp = useFieldArray({ control, name: "experience" });
  const proj = useFieldArray({ control, name: "projects" });
  const edu = useFieldArray({ control, name: "education" });
  const cert = useFieldArray({ control, name: "certifications" });

  const formData = watch();

  const handlePrint = useReactToPrint({
    contentRef: resumeRef,
    documentTitle: `Resume_${formData.profile.fullname || "User"}`,
  });

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-8 bg-white p-5 rounded-2xl shadow">
        <div className="flex items-center gap-6">
          <span className={step === "form" ? "text-blue-600" : "text-gray-400"}>
            1. Details
          </span>
          <ChevronRight />
          <span
            className={step === "preview" ? "text-blue-600" : "text-gray-400"}
          >
            2. Preview
          </span>
        </div>

        {step === "form" ? (
          <button
            onClick={() => setStep("preview")}
            className="bg-blue-600 text-white px-6 py-2 rounded-xl"
          >
            Preview →
          </button>
        ) : (
          <button
            onClick={() => setStep("form")}
            className="px-6 py-2 border rounded-xl"
          >
            ← Back
          </button>
        )}
      </div>

      <AnimatePresence mode="wait">
        {step === "form" ? (
          <motion.div
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid md:grid-cols-2 gap-8"
          >
            {/* LEFT */}
            <div className="space-y-6">
              {/* PROFILE */}
              <div className="bg-white p-6 rounded-2xl shadow">
                <h3 className="font-bold mb-4 flex gap-2">
                  <User /> Profile
                </h3>

                <label>Full Name</label>
                <input {...register("profile.fullname")} className="input" />

                <label>Email</label>
                <input {...register("profile.email")} className="input" />

                <label>Phone</label>
                <input {...register("profile.phone")} className="input" />

                <label>Summary</label>
                <textarea {...register("profile.summary")} className="input" />
              </div>

              {/* LINKS */}
              <div className="bg-white p-6 rounded-2xl shadow">
                <h3 className="font-bold mb-4 flex gap-2">
                  <Link2 /> Links
                </h3>

                <label>LinkedIn</label>
                <input {...register("links.linkedin")} className="input" />

                <label>GitHub</label>
                <input {...register("links.github")} className="input" />

                <label>Portfolio</label>
                <input {...register("links.portfolio")} className="input" />
              </div>

              {/* SKILLS */}
              <div className="bg-white p-6 rounded-2xl shadow">
                <h3 className="font-bold mb-4">Skills</h3>

                <label>Skills</label>
                <input
                  {...register("skills")}
                  placeholder="React, Node.js, Python"
                  className="input"
                />
              </div>
            </div>

            {/* RIGHT */}
            <div className="space-y-6">
              {/* EXPERIENCE */}
              <div className="bg-white p-6 rounded-2xl shadow">
                <div className="flex justify-between mb-4">
                  <h3 className="font-bold flex gap-2">
                    <Briefcase /> Experience
                  </h3>
                  <button
                    type="button"
                    onClick={() =>
                      exp.append({
                        role: "",
                        company: "",
                        duration: "",
                        description: "",
                      })
                    }
                  >
                    <Plus />
                  </button>
                </div>

                {exp.fields.map((field, i) => (
                  <div key={field.id} className="mb-4 border p-3 rounded-xl">
                    <label>Role</label>
                    <input {...register(`experience.${i}.role`)} className="input" />

                    <label>Company</label>
                    <input {...register(`experience.${i}.company`)} className="input" />

                    <label>Duration</label>
                    <input {...register(`experience.${i}.duration`)} className="input" />

                    <label>Description</label>
                    <textarea {...register(`experience.${i}.description`)} className="input" />
                  </div>
                ))}
              </div>

              {/* PROJECTS */}
              <div className="bg-white p-6 rounded-2xl shadow">
                <div className="flex justify-between mb-4">
                  <h3 className="font-bold">Projects</h3>
                  <button
                    type="button"
                    onClick={() =>
                      proj.append({
                        title: "",
                        description: "",
                        link: "",
                        techStack: "",
                      })
                    }
                  >
                    <Plus />
                  </button>
                </div>

                {proj.fields.map((field, i) => (
                  <div key={field.id} className="mb-4 border p-3 rounded-xl">
                    <label>Title</label>
                    <input {...register(`projects.${i}.title`)} className="input" />

                    <label>Description</label>
                    <textarea {...register(`projects.${i}.description`)} className="input" />

                    <label>Link</label>
                    <input {...register(`projects.${i}.link`)} className="input" />

                    <label>Tech Stack</label>
                    <input {...register(`projects.${i}.techStack`)} className="input" />
                  </div>
                ))}
              </div>

              {/* CERTIFICATIONS */}
              <div className="bg-white p-6 rounded-2xl shadow">
                <div className="flex justify-between mb-4">
                  <h3 className="font-bold">Certifications</h3>
                  <button
                    type="button"
                    onClick={() =>
                      cert.append({ title: "", issuer: "", date: "" })
                    }
                  >
                    <Plus />
                  </button>
                </div>

                {cert.fields.map((field, i) => (
                  <div key={field.id} className="mb-4 border p-3 rounded-xl">
                    <label>Title</label>
                    <input {...register(`certifications.${i}.title`)} className="input" />

                    <label>Issuer</label>
                    <input {...register(`certifications.${i}.issuer`)} className="input" />

                    <label>Date</label>
                    <input {...register(`certifications.${i}.date`)} className="input" />
                  </div>
                ))}
              </div>

              {/* EDUCATION */}
              <div className="bg-white p-6 rounded-2xl shadow">
                <div className="flex justify-between mb-4">
                  <h3 className="font-bold flex gap-2">
                    <GraduationCap /> Education
                  </h3>
                  <button
                    type="button"
                    onClick={() =>
                      edu.append({
                        degree: "",
                        institution: "",
                        year: "",
                      })
                    }
                  >
                    <Plus />
                  </button>
                </div>

                {edu.fields.map((field, i) => (
                  <div key={field.id} className="mb-4 border p-3 rounded-xl">
                    <label>Degree</label>
                    <input {...register(`education.${i}.degree`)} className="input" />

                    <label>Institution</label>
                    <input {...register(`education.${i}.institution`)} className="input" />

                    <label>Year</label>
                    <input {...register(`education.${i}.year`)} className="input" />
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div className="grid lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-2xl shadow">
              {["modern", "classic", "minimal"].map((t) => (
                <button
                  key={t}
                  onClick={() => setActiveTemplate(t as any)}
                  className={`block w-full p-3 mb-2 rounded ${
                    activeTemplate === t
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100"
                  }`}
                >
                  {t}
                </button>
              ))}

              <button
                onClick={handlePrint}
                className="w-full bg-green-600 text-white p-3 mt-4 rounded"
              >
                <Download /> Download
              </button>
            </div>

            <div className="lg:col-span-3 bg-gray-200 p-6 rounded-2xl">
              <div ref={resumeRef} className="bg-white p-6">
                {activeTemplate === "modern" && (
                  <ModernLayout data={formData} />
                )}
                {activeTemplate === "classic" && (
                  <ProfessionalLayout data={formData} />
                )}
                {activeTemplate === "minimal" && (
                  <CreativeLayout data={formData} />
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .input {
          width: 100%;
          padding: 10px;
          border: 1px solid #ddd;
          border-radius: 10px;
          margin-bottom: 8px;
        }

        label {
          font-size: 14px;
          font-weight: 500;
          margin-top: 6px;
          display: block;
        }
      `}</style>
    </div>
  );
};

export default ResumeBuilder;