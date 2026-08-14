"use client";

import { FormEvent, useEffect, useState } from "react";

type Project = {
  id: string;
  name: string;
  priority: "High" | "Medium" | "Low";
  lead: string;
  dueDate: string;
};

type ProjectListProps = {
  showAddProject: boolean;
  onCloseAddProject: () => void;
};

const initialProjects: Project[] = [
  {
    id: "1",
    name: "Website Redesign",
    priority: "High",
    lead: "Alex",
    dueDate: "12 Sep 2026",
  },
  {
    id: "2",
    name: "Mobile Application",
    priority: "Medium",
    lead: "Chris",
    dueDate: "20 Sep 2026",
  },
  {
    id: "3",
    name: "Marketing Website",
    priority: "Low",
    lead: "Sarah",
    dueDate: "28 Sep 2026",
  },
];

const STORAGE_KEY = "ablespace-projects";

export default function ProjectList({
  showAddProject,
  onCloseAddProject,
}: ProjectListProps) {
  const [projects, setProjects] =
    useState<Project[]>(initialProjects);

  const [isLoaded, setIsLoaded] = useState(false);

  const [showModal, setShowModal] = useState(false);
  const [editingProject, setEditingProject] =
    useState<Project | null>(null);

  const [name, setName] = useState("");
  const [priority, setPriority] =
    useState<Project["priority"]>("Medium");
  const [lead, setLead] = useState("");
  const [dueDate, setDueDate] = useState("");

  useEffect(() => {
    try {
      const savedProjects =
        localStorage.getItem(STORAGE_KEY);

      if (savedProjects) {
        setProjects(JSON.parse(savedProjects));
      }
    } catch {
      console.log("Could not load saved projects.");
    }

    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (!isLoaded) return;

    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(projects)
    );
  }, [projects, isLoaded]);

  useEffect(() => {
    if (showAddProject) {
      setEditingProject(null);
      setName("");
      setPriority("Medium");
      setLead("");
      setDueDate("");
      setShowModal(true);
    }
  }, [showAddProject]);

  const closeModal = () => {
    setShowModal(false);
    setEditingProject(null);
    onCloseAddProject();
  };

  const openEditModal = (project: Project) => {
    setEditingProject(project);
    setName(project.name);
    setPriority(project.priority);
    setLead(project.lead);
    setDueDate(project.dueDate);
    setShowModal(true);
  };

  const handleSubmit = (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    if (!name.trim() || !lead.trim() || !dueDate) {
      return;
    }

    if (editingProject) {
      setProjects((currentProjects) =>
        currentProjects.map((project) =>
          project.id === editingProject.id
            ? {
                ...project,
                name: name.trim(),
                priority,
                lead: lead.trim(),
                dueDate,
              }
            : project
        )
      );
    } else {
      const newProject: Project = {
        id: crypto.randomUUID(),
        name: name.trim(),
        priority,
        lead: lead.trim(),
        dueDate,
      };

      setProjects((currentProjects) => [
        ...currentProjects,
        newProject,
      ]);
    }

    closeModal();
  };

  const deleteProject = (id: string) => {
    setProjects((currentProjects) =>
      currentProjects.filter(
        (project) => project.id !== id
      )
    );
  };

  return (
    <>
      <div className="rounded-lg border border-[#e5e5e5] bg-white">

  {/* Desktop table */}
  <div className="hidden md:block overflow-hidden">
    <div className="grid grid-cols-[2fr_1fr_1fr_1fr_auto] border-b bg-[#fafafa] px-5 py-3 text-xs font-medium text-[#666666]">
      <span>Project</span>
      <span>Priority</span>
      <span>Lead</span>
      <span>Due Date</span>
      <span></span>
    </div>

    {projects.map((project) => (
      <div
        key={project.id}
        className="grid grid-cols-[2fr_1fr_1fr_1fr_auto] items-center border-b px-5 py-4 text-sm last:border-b-0"
      >
        <span className="font-medium text-[#171717]">
          {project.name}
        </span>

        <span
          className={
            project.priority === "High"
              ? "text-red-500"
              : project.priority === "Medium"
                ? "text-orange-500"
                : "text-green-600"
          }
        >
          {project.priority}
        </span>

        <span className="text-[#555555]">
          {project.lead}
        </span>

        <span className="text-[#666666]">
          {project.dueDate}
        </span>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => openEditModal(project)}
            className="rounded-md px-2 py-1 text-xs text-[#666666] hover:bg-[#f5f5f5] hover:text-[#171717]"
          >
            Edit
          </button>

          <button
            type="button"
            onClick={() => deleteProject(project.id)}
            className="rounded-md px-2 py-1 text-xs text-red-500 hover:bg-red-50"
          >
            Delete
          </button>
        </div>
      </div>
    ))}
  </div>

  {/* Mobile cards */}
  <div className="divide-y divide-[#eeeeee] md:hidden">
    {projects.map((project) => (
      <div
        key={project.id}
        className="p-4"
      >
        <div className="mb-3 flex items-start justify-between gap-3">
          <h3 className="font-medium text-[#171717]">
            {project.name}
          </h3>

          <span
            className={
              project.priority === "High"
                ? "shrink-0 text-sm text-red-500"
                : project.priority === "Medium"
                  ? "shrink-0 text-sm text-orange-500"
                  : "shrink-0 text-sm text-green-600"
            }
          >
            {project.priority}
          </span>
        </div>

        <div className="space-y-2 text-sm">
          <div className="flex justify-between gap-4">
            <span className="text-[#888888]">
              Lead
            </span>

            <span className="text-right text-[#333333]">
              {project.lead}
            </span>
          </div>

          <div className="flex justify-between gap-4">
            <span className="text-[#888888]">
              Due Date
            </span>

            <span className="text-right text-[#333333]">
              {project.dueDate}
            </span>
          </div>
        </div>

        <div className="mt-4 flex gap-2 border-t border-[#eeeeee] pt-3">
          <button
            type="button"
            onClick={() => openEditModal(project)}
            className="flex-1 rounded-md border border-[#e5e5e5] px-3 py-2 text-sm text-[#555555] hover:bg-[#f7f7f7]"
          >
            Edit
          </button>

          <button
            type="button"
            onClick={() => deleteProject(project.id)}
            className="flex-1 rounded-md border border-red-100 px-3 py-2 text-sm text-red-500 hover:bg-red-50"
          >
            Delete
          </button>
        </div>
      </div>
    ))}
  </div>

</div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl">
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-[#171717]">
                {editingProject
                  ? "Edit Project"
                  : "Add Project"}
              </h2>

              <button
                type="button"
                onClick={closeModal}
                className="text-xl text-[#999999] hover:text-[#171717]"
              >
                ×
              </button>
            </div>

            <form
              onSubmit={handleSubmit}
              className="space-y-4"
            >
              <div>
                <label className="mb-1 block text-sm font-medium text-[#555555]">
                  Project name
                </label>

                <input
                  required
                  value={name}
                  onChange={(event) =>
                    setName(event.target.value)
                  }
                  placeholder="Enter project name"
                  className="w-full rounded-md border border-[#e5e5e5] px-3 py-2 text-sm outline-none focus:border-[#999999]"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-[#555555]">
                  Priority
                </label>

                <select
                  value={priority}
                  onChange={(event) =>
                    setPriority(
                      event.target.value as Project["priority"]
                    )
                  }
                  className="w-full rounded-md border border-[#e5e5e5] px-3 py-2 text-sm outline-none"
                >
                  <option value="High">High</option>
                  <option value="Medium">Medium</option>
                  <option value="Low">Low</option>
                </select>
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-[#555555]">
                  Lead
                </label>

                <input
                  required
                  value={lead}
                  onChange={(event) =>
                    setLead(event.target.value)
                  }
                  placeholder="Enter lead name"
                  className="w-full rounded-md border border-[#e5e5e5] px-3 py-2 text-sm outline-none focus:border-[#999999]"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-[#555555]">
                  Due date
                </label>

                <input
                  required
                  type="text"
                  value={dueDate}
                  onChange={(event) =>
                    setDueDate(event.target.value)
                  }
                  placeholder="e.g. 25 Sep 2026"
                  className="w-full rounded-md border border-[#e5e5e5] px-3 py-2 text-sm outline-none focus:border-[#999999]"
                />
              </div>

              <div className="flex flex-col-reverse gap-2 pt-3 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  onClick={closeModal}
                  className="rounded-md border border-[#e5e5e5] px-4 py-2 text-sm text-[#666666] hover:bg-[#f7f7f7]"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="rounded-md bg-[#171717] px-4 py-2 text-sm font-medium text-white hover:bg-[#333333]"
                >
                  {editingProject
                    ? "Save Changes"
                    : "Add Project"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}