// src/pages/CourseDetails.tsx
import { useState } from "react";
import { useParams } from "react-router-dom";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ChevronDown, ChevronRight, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";

type Lesson = {
    id: string;
    title: string;
};

type Module = {
    id: string;
    title: string;
    lessons: Lesson[];
};

type Course = {
    id: string;
    title: string;
    modules: Module[];
};

// Dummy Course
const dummyCourse: Course = {
    id: "1",
    title: "React Basics",
    modules: [
        {
            id: "m1",
            title: "Introduction",
            lessons: [
                { id: "l1", title: "What is React?" },
                { id: "l2", title: "Why React?" },
            ],
        },
        {
            id: "m2",
            title: "Core Concepts",
            lessons: [
                { id: "l3", title: "Components" },
                { id: "l4", title: "Props" },
                { id: "l5", title: "State" },
            ],
        },
        {
            id: "m3",
            title: "Advanced Topics",
            lessons: [
                { id: "l6", title: "Hooks" },
                { id: "l7", title: "Context API" },
            ],
        },
    ],
};

export default function CourseDetails() {
    const { id } = useParams();

    console.log('ID: ', id);
    const course = dummyCourse; // later get via API

    const [expanded, setExpanded] = useState<string | null>(null);

    const toggleModule = (moduleId: string) => {
        setExpanded((prev) => (prev === moduleId ? null : moduleId));
    };

    return (
        <div className="space-y-8">
            {/* COURSE TITLE */}
            <Card className="bg-[#151515] border-gray-800">
                <CardHeader>
                    <CardTitle className="text-2xl">{course.title}</CardTitle>
                </CardHeader>
            </Card>

            {/* MODULES + LESSONS */}
            <div className="space-y-4">
                {course.modules.map((m) => (
                    <Card
                        className="bg-[#151515] border-gray-800"
                        key={m.id}
                    >
                        <CardHeader
                            className="cursor-pointer flex flex-row items-center justify-between"
                            onClick={() => toggleModule(m.id)}
                        >
                            <CardTitle className="flex items-center gap-2 text-lg">
                                {expanded === m.id ? (
                                    <ChevronDown className="w-5 h-5" />
                                ) : (
                                    <ChevronRight className="w-5 h-5" />
                                )}
                                {m.title}
                            </CardTitle>
                        </CardHeader>

                        {/* LESSON LIST */}
                        {expanded === m.id && (
                            <CardContent className="space-y-3 animate-in fade-in duration-200">
                                {m.lessons.map((lesson) => (
                                    <div
                                        key={lesson.id}
                                        className="flex items-center gap-3 p-3 rounded-md bg-[#1b1b1b] border border-gray-800 hover:bg-[#222] cursor-pointer"
                                    >
                                        <BookOpen className="w-4 h-4 text-blue-400" />
                                        <span>{lesson.title}</span>
                                    </div>
                                ))}
                            </CardContent>
                        )}
                    </Card>
                ))}
            </div>

            {/* BUTTONS */}
            <div className="flex gap-3">
                <Button>Edit Course</Button>
                <Button variant="outline">Add Module</Button>
            </div>
        </div>
    );
}
