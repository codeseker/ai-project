import { useState } from "react";
import { AppSidebar } from "@/components/app-sidebar";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function Profile() {
  const [loading] = useState(false); // change to true to see skeleton

  const user = {
    name: "John Doe",
    email: "john@example.com",
    avatar: "",
  };

  const courses = [
    {
      id: 1,
      title: "Spring Boot Mastery",
      progress: 70,
      modules: [
        { name: "Intro", lessons: ["What is Spring?", "Setup"] },
        { name: "Core", lessons: ["DI", "Beans", "Spring Context"] },
      ],
    },
    {
      id: 2,
      title: "JavaScript Deep Dive",
      progress: 40,
      modules: [
        { name: "Basics", lessons: ["Variables", "Functions"] },
        { name: "Advanced", lessons: ["Closures", "Async JS"] },
      ],
    },
  ];

  return (
    <div className="flex h-screen overflow-hidden bg-background text-foreground">
      <AppSidebar />

      <main className="flex-1 overflow-y-auto p-6 space-y-6">
        <h1 className="text-3xl font-bold">Profile</h1>

        {/* PROFILE CARD */}
        <Card>
          <CardContent className="flex flex-col md:flex-row items-center gap-6 pt-6">
            {loading ? (
              <Skeleton className="h-24 w-24 rounded-full" />
            ) : (
              <Avatar className="h-24 w-24">
                <AvatarImage src={user.avatar} />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
            )}

            <div className="flex-1 space-y-2 text-center md:text-left">
              {loading ? (
                <>
                  <Skeleton className="h-6 w-40" />
                  <Skeleton className="h-4 w-56" />
                </>
              ) : (
                <>
                  <h2 className="text-2xl font-semibold">{user.name}</h2>
                  <p className="text-muted-foreground">{user.email}</p>
                </>
              )}

              <div className="flex flex-col sm:flex-row gap-2 pt-2">
                <Label htmlFor="avatar-upload" className="cursor-pointer">
                  <Button variant="secondary" asChild>
                    <span>Change Avatar</span>
                  </Button>
                </Label>
                <Input id="avatar-upload" type="file" className="hidden" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* STATS */}
        <div className="grid gap-4 md:grid-cols-3">
          {["Total Courses", "Completed", "In Progress"].map((label, i) => (
            <Card key={i}>
              <CardHeader>
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {label}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <Skeleton className="h-8 w-16" />
                ) : (
                  <p className="text-3xl font-bold">
                    {i === 0
                      ? courses.length
                      : i === 1
                        ? 1
                        : courses.length - 1}
                  </p>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* COURSES LIST */}
        <Card>
          <CardHeader>
            <CardTitle>Your Courses</CardTitle>
          </CardHeader>

          <CardContent>
            {loading ? (
              <div className="space-y-4">
                <Skeleton className="h-16 w-full" />
                <Skeleton className="h-16 w-full" />
              </div>
            ) : (
              <Accordion type="multiple" className="space-y-3">
                {courses.map((course) => (
                  <AccordionItem
                    key={course.id}
                    value={`course-${course.id}`}
                    className="border rounded-lg px-4"
                  >
                    <div className="flex items-center justify-between py-3">
                      <AccordionTrigger className="text-left flex-1">
                        {course.title}
                      </AccordionTrigger>

                      <div className="flex items-center gap-4 w-1/3">
                        <Progress value={course.progress} />
                        <Badge variant="secondary">{course.progress}%</Badge>
                        <Button variant="destructive" size="sm">
                          Delete
                        </Button>
                      </div>
                    </div>

                    <AccordionContent className="pb-4">
                      <div className="space-y-4">
                        {course.modules.map((module, idx) => (
                          <div key={idx}>
                            <p className="font-semibold">{module.name}</p>
                            <ul className="list-disc ml-5 text-muted-foreground">
                              {module.lessons.map((lesson, i) => (
                                <li key={i}>{lesson}</li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
