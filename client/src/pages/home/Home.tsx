
import { AppSidebar } from "@/components/app-sidebar"
import { CourseGenerator } from "@/components/course-generator"

export default function HomePage() {
  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <AppSidebar />
      <main className="flex-1 overflow-y-auto lg:ml-0">
        <CourseGenerator />
      </main>
    </div>
  )
}
