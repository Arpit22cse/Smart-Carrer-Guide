const { z } = require("zod");
const ResumeSchema = z.object({
    name: z.string().default(""),
    email: z.string().default(""),
    phone: z.string().default(""),
    location: z.string().default(""),

    summary: z.string().default(""),

    skills: z.array(z.string()).default([]),

    techStack: z.array(z.string()).default([]),

    experience: z.array(
        z.object({
            company: z.string().default(""),
            role: z.string().default(""),
            duration: z.string().default(""),
            description: z.string().default("")
        })
    ).default([]),

    education: z.array(
        z.object({
            degree: z.string().default(""),
            institute: z.string().default(""),
            year: z.string().default("")
        })
    ).default([]),

    projects: z.array(
        z.object({
            title: z.string().default(""),
            description: z.string().default(""),
            technologies: z.array(z.string()).default([])
        })
    ).default([]),

    certifications: z.array(z.string()).default([]),

    // Recommended job roles
    jobRoles: z.array(
        z.object({
            role: z.string(),
            matchScore: z.number(),
            reason: z.string()
        })
    ).default([]),


    recommendedCertifications: z.array(z.string()).default([]),


    // ATS Analysis
    atsScore: z.number().default(0),

    strengths: z.array(z.string()).default([]),

    weaknesses: z.array(z.string()).default([]),


    missingSections: z.array(
        z.string()
    ).default([]),


    improvementSuggestions: z.array(
        z.object({
            title: z.string(),
            description: z.string(),
            priority: z.enum([
                "high",
                "medium",
                "low"
            ])
        })
    ).default([]),


    skillGaps: z.array(
        z.string()
    ).default([]),


    keywordSuggestions: z.array(
        z.string()
    ).default([])
});

module.exports = ResumeSchema;