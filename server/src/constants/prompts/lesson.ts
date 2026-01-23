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
