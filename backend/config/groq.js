const { ChatGroq } = require("@langchain/groq");
const ResumeSchema = require("../schemas/resumeSchema");
require("dotenv").config();

const llm = new ChatGroq({
    model: "llama-3.3-70b-versatile",
    temperature: 0,
    maxTokens: 4096,
});

const structuredLLM = llm.withStructuredOutput(ResumeSchema);

module.exports = structuredLLM;