const  extractText  = require("../utils/textExtractor");
const  structuredLLM  = require("../config/groq");
const extractPdfLinks = require("../utils/extractPdfLinks");

async function parseResume(text) {

return await structuredLLM.invoke(`

You are an expert ATS Resume Parser, Resume Reviewer, and Career Coach.

Your task is to analyze the resume completely and return ALL available information.

IMPORTANT RULES:

1. Follow the provided schema exactly.
2. NEVER create new fields.
3. NEVER rename fields.
4. ALWAYS return every field from the schema.
5. If information is missing, return:
   - "" for strings
   - [] for arrays
   - 0 for numbers
6. Do not skip any section.
7. Do not hallucinate personal information.
8. Suggestions and career recommendations are allowed based on industry standards.


You must extract the following:


PERSONAL INFORMATION:

name:
Candidate full name.

email:
Candidate email address.

phone:
Candidate phone number.

location:
Candidate location.


SUMMARY:

summary:
Create a professional summary from the resume.
Mention experience, technologies, and strengths.


SKILLS:

skills:
Return ALL technical and programming skills.

Examples:
[
 "JavaScript",
 "React",
 "Node.js",
 "MongoDB"
]


TECH STACK:

techStack:
Return all frameworks, libraries, databases, cloud services, and tools.

Examples:
[
 "React",
 "Express",
 "AWS",
 "Docker"
]


EXPERIENCE:

experience:
Extract every work experience.

Format:

[
 {
   "company":"",
   "role":"",
   "duration":"",
   "description":""
 }
]


If there is no experience:

[]


EDUCATION:

education:

Format:

[
 {
   "degree":"",
   "institute":"",
   "year":""
 }
]


PROJECTS:

projects:

Extract every project.

Format:

[
 {
   "title":"",
   "description":"",
   "technologies":[]
 }
]


CERTIFICATIONS:

certifications:

Return all certifications.

Example:

[
 "AWS Certified Developer"
]


JOB ROLE ANALYSIS:

jobRoles:

Suggest the best software roles matching this resume.

Do not return generic jobs.

Return:

[
 {
   "role":"Full Stack Developer",
   "matchScore":90,
   "reason":"Strong React and Node.js experience"
 }
]


ATS ANALYSIS:

atsScore:

Calculate resume ATS score between 0-100.

Consider:

- Skills
- Keywords
- Experience
- Projects
- Resume structure
- Industry requirements


STRENGTHS:

strengths:

List strong points of this resume.

Example:

[
 "Strong frontend skills",
 "Good project experience"
]


WEAKNESSES:

weaknesses:

List areas where the resume is weak.


MISSING SECTIONS:

missingSections:

Find missing resume sections.

Examples:

[
 "Missing GitHub link",
 "Missing achievements",
 "Missing certifications"
]


IMPROVEMENT SUGGESTIONS:

improvementSuggestions:

Give actionable suggestions.

Format:

[
 {
   "title":"",
   "description":"",
   "priority":"high"
 }
]


SKILL GAPS:

skillGaps:

Find important skills missing for target roles.

Example:

[
 "Docker",
 "AWS",
 "CI/CD"
]


ATS KEYWORD SUGGESTIONS:

keywordSuggestions:

Suggest keywords that improve ATS ranking.

Example:

[
 "Agile",
 "REST API",
 "Cloud Computing"
]


RECOMMENDED CERTIFICATIONS:

recommendedCertifications:

Suggest certifications useful for career growth.


FINAL OUTPUT REQUIREMENT:

The response MUST contain exactly these keys:

name
email
phone
location
summary
skills
techStack
experience
education
projects
certifications
jobRoles
atsScore
strengths
weaknesses
missingSections
improvementSuggestions
skillGaps
keywordSuggestions
recommendedCertifications


NEVER RETURN:

technicalSkills
technologies
workExperience
missingATSKeywords


Resume Content:

${text}

`);

}

exports.uploadResume = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No file uploaded.",
      });
    }


    const resumeText = await extractText(req.file.path);
    const extractedLinks = await extractPdfLinks(req.file.path);

   

    const resumeData = `

      ${resumeText}


      ${extractedLinks.length
        ? extractedLinks.map((link, index) => `${index + 1}. ${link}`).join("\n")
        : "No links found."
      }
`   ;

    const result = await parseResume(resumeData);

    return res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    console.error("Resume Upload Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
  }
};