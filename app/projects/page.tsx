"use client";

import { useState } from "react";
import MainLayout from "@/components/layout/MainLayout";
import ProjectList from "@/components/projects/ProjectList";

export default function ProjectsPage() {
  const [showAddProject, setShowAddProject] = useState(false);

  return (
    <MainLayout>
      <div className="min-h-screen bg-[#fafafa]">
        <header className="flex min-h-16 items-center justify-between border-b border-[#e8e8e8] bg-white px-6">
          <h1 className="text-lg font-semibold text-[#171717]">
            Projects
          </h1>

          <button
            type="button"
            onClick={() => setShowAddProject(true)}
            className="rounded-md bg-[#171717] px-4 py-2 text-sm font-medium text-white hover:bg-[#333333]"
          >
            + Add Project
          </button>
        </header>

        <main className="p-6">
          <ProjectList
            showAddProject={showAddProject}
            onCloseAddProject={() =>
              setShowAddProject(false)
            }
          />
        </main>
      </div>
    </MainLayout>
  );
}