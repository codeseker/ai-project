import { ICourse } from "../../models/course";
import { ILesson } from "../../models/lesson";
import { IModule } from "../../models/modules";

export const lessonPrompt = ({
  courseTitle,
  moduleTitle,
  lessonTitle,
  upcomingLessons = [],
}: {
  courseTitle: string;
  moduleTitle: string;
  lessonTitle: string;
  upcomingLessons?: { title: string; description: string }[];
}) => `
You are an expert curriculum designer and senior software educator.

Your task is to generate a SINGLE lesson in STRICT JSON FORMAT.

━━━━━━━━━━━━━━━━━━━━━━━━━━
CONTEXT
━━━━━━━━━━━━━━━━━━━━━━━━━━
Course: "${courseTitle}"
Module: "${moduleTitle}"
Lesson: "${lessonTitle}"

Upcoming lessons (for narrative continuity only):
${upcomingLessons.map((l) => `- ${l.title}: ${l.description}`).join("\n")}

━━━━━━━━━━━━━━━━━━━━━━━━━━
OUTPUT RULES (ABSOLUTELY CRITICAL)
━━━━━━━━━━━━━━━━━━━━━━━━━━
- Output ONLY raw JSON
- DO NOT wrap in markdown
- DO NOT add explanations or comments
- DO NOT include trailing commas
- The JSON MUST be valid and parseable
- Follow the schema EXACTLY

━━━━━━━━━━━━━━━━━━━━━━━━━━
REQUIRED JSON SCHEMA
━━━━━━━━━━━━━━━━━━━━━━━━━━

{
  "title": string,
  "objectives": string[],
  "content": [
    {
      "type": "heading",
      "text": string
    },
    {
      "type": "paragraph",
      "text": string
    },
    {
      "type": "code",
      "language": string,
      "text": string
    },
    {
      "type": "video",
      "query": string
    },
    {
      "type": "mcq",
      "question": string,
      "options": string[],
      "answer": number,
      "explanation": string
    }
  ]
}

━━━━━━━━━━━━━━━━━━━━━━━━━━
CONTENT RULES
━━━━━━━━━━━━━━━━━━━━━━━━━━
- Start with a heading introducing the lesson
- Use clear, long-form paragraphs (professional tone)
- Include a code block ONLY if technically relevant
- Include exactly ONE video block with a YouTube search query
- Add 4–5 MCQs at the END of the content
- MCQs must include explanations
- Lesson should flow from fundamentals → real-world usage
- Maintain production-level clarity and depth

━━━━━━━━━━━━━━━━━━━━━━━━━━
GENERATE THE JSON NOW
━━━━━━━━━━━━━━━━━━━━━━━━━━
`;

// export const lessonPrompt = ({
//   courseTitle,
//   moduleTitle,
//   lessonTitle,
//   upcomingLessons = [],
// }: {
//   courseTitle: string;
//   moduleTitle: string;
//   lessonTitle: string;
//   upcomingLessons?: { title: string; description: string }[];
// }) => `
// You are a senior technical writer and educator who produces **high-quality, long-form technical articles** comparable to top system design blogs, engineering handbooks, and premium developer courses.

// Your writing should be:
// - Professional and authoritative
// - Clear, structured, and insightful
// - Naturally flowing (not checklist-driven)
// - Practical and grounded in real-world engineering

// ---

// ## CONTEXT

// Course: ${courseTitle}
// Module: ${moduleTitle}
// Lesson: ${lessonTitle}

// Upcoming lessons (for narrative continuity only):
// ${upcomingLessons.map((l) => `- ${l.title}: ${l.description}`).join("\n")}

// ---

// ## OUTPUT RULES (CRITICAL)

// - Output **ONLY valid Markdown**
// - Do **NOT** include explanations, meta commentary, or apologies
// - All Markdown syntax must be valid
// - Every code block must be properly fenced and closed
// - Maintain clean spacing and section separators (\`---\`)
// - The lesson must read like a **professional technical article**, not a tutorial script

// ---

// ## REQUIRED ARTICLE STRUCTURE

// # ${lessonTitle}

// ## 🔍 Why This Lesson Matters
// Begin with a compelling real-world motivation. Clearly explain why this concept matters in production systems and how it solves real engineering problems.

// ---

// ## 🧠 Core Ideas and Mental Models
// Explain the fundamental ideas in depth using:
// - Clear explanations
// - Intuitive mental models
// - Practical real-world analogies

// Favor well-written paragraphs over excessive bullet points.

// ---

// ## ❌ Common Pitfalls and Naive Approaches
// Describe the most common mistakes developers make when first encountering this concept.
// Explain why these approaches fail as applications grow in complexity or scale.

// ---

// ## ✅ A Better, Scalable Approach
// Present the idiomatic and maintainable approach used in real-world codebases.
// Explain why it works better and how it improves readability, flexibility, and long-term maintainability.

// ### Example

// \`\`\`tsx
// // Example code relevant to this lesson
// \`\`\`

// ---

// ## 🧩 How This Fits Into Larger Systems
// Explain how this concept integrates into:
// - Component architecture
// - Application or system design
// - Long-term maintainability and scalability

// Help the reader see the bigger picture beyond syntax.

// ---

// ## 🧠 Key Takeaways
// Summarize the most important insights concisely and clearly.

// ---

// ## 📝 Knowledge Check (Quiz)
// Create **5–10 quiz questions** based strictly on the lesson above.
// Include a mix of:
// - Conceptual understanding
// - Practical reasoning
// - Small code-reading or behavior questions

// Do **NOT** include answers.

// ---

// ## 🚀 Summary and What’s Next
// Conclude with a strong recap of the lesson and smoothly transition to the next topic.

// ${
//   upcomingLessons[0]
//     ? `Explain why **${upcomingLessons[0].title}** is the natural next step and how it builds on this lesson.`
//     : `Hint at more advanced patterns that naturally build on this foundation.`
// }

// ---
// `;

export function buildYouTubeQuery({
  course,
  module,
  lesson,
}: {
  course: ICourse;
  module: IModule;
  lesson: ILesson;
}) {
  const domainKeywordsMap: Record<string, string[]> = {
    "data-structures": ["data structures", "algorithm", "DSA"],
    "web-development": ["web development", "frontend", "backend"],
    "machine-learning": ["machine learning", "AI", "deep learning"],
    finance: ["finance", "investment"],
  };

  const domainKeywords = domainKeywordsMap[course.intentCategory] ?? [];

  return [
    ...domainKeywords,
    course.title,
    module.title,
    lesson.title,
    "tutorial",
    "explained",
  ].join(" ");
}
