export interface Lesson {
    _id: string;
    title: string;
    module: string;
    content: string;
    isDeleted: boolean;
    order: number;
    description: string;
    estimatedMinutes: number;
}

export interface Module {
    _id: string;
    title: string;
    description: string;
    course: string;
    lessons: Lesson[];
    id: string;
}

export interface Course {
    id: string;
    title: string;
    description: string;
    createdBy: string;
    isDeleted: boolean;
    tags: string[];
    targetAudience: string[];
    estimatedDuration: number;
    prerequisites: string[];
    intentCategory: string;
    createdAt: string;
    updatedAt: string;
    modules: Module[];
}