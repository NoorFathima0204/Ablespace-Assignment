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

  const [showFilters, setShowFilters] = useState(false);
  const [filterPriority, setFilterPriority] =
    useState("All");
  const [filterLead, setFilterLead] = useState("All");

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

  const filteredProjects = projects.filter((project) => {
    const matchesPriority =
      filterPriority === "All" ||
      project.priority === filterPriority;

    const matchesLead =
      filterLead === "All" ||
      project.lead === filterLead;

    return matchesPriority && matchesLead;
  });

  const clearFilters = () => {
    setFilterPriority("All");
    setFilterLead("All");
  };

  const leads = [
    ...new Set(projects.map((project) => project.lead)),
  ];

  return (
    <>
      <div className="mb-4 flex items-center justify-end">
        <button
          type="button"
          onClick={() =>
            setShowFilters((current) => !current)
          }
          className="rounded-md border border-[#e5e5e5] bg-white px-3 py-2 text-sm text-[#666666] hover:bg-[#f7f7f7]"
        >
          Filter
        </button>
      </div>

      {showFilters && (
        <div className="mb-4 rounded-lg border border-[#e5e5e5] bg-white p-4 shadow-sm">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-xs font-medium text-[#666666]">
                Priority
              </label>

              <select
                value={filterPriority}
                onChange={(event) =>
                  setFilterPriority(event.target.value)
                }
                className="w-full rounded-md border border-[#e5e5e5] bg-white px-3 py-2 text-sm outline-none focus:border-[#999999]"
              >
                <option>All</option>
                <option>High</option>
                <option>Medium</option>
                <option>Low</option>
              </select>
            </div>

            <div>
              <label className="mb-1 block text-xs font-medium text-[#666666]">
                Lead
              </label>

              <select
                value={filterLead}
                onChange={(event) =>
                  setFilterLead(event.target.value)
                }
                className="w-full rounded-md border border-[#e5e5e5] bg-white px-3 py-2 text-sm outline-none focus:border-[#999999]"
              >
                <option>All</option>

                {leads.map((leadName) => (
                  <option
                    key={leadName}
                    value={leadName}
                  >
                    {leadName}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="mt-4 flex justify-end">
            <button
              type="button"
              onClick={clearFilters}
              className="text-sm text-[#666666] hover:text-[#171717]"
            >
              Clear filters
            </button>
          </div>
        </div>
      )}

      <div className="overflow-hidden rounded-lg border border-[#e5e5e5] bg-white">
        {/* Desktop header */}
        <div className="hidden grid-cols-[2fr_1fr_1fr_1fr_auto] border-b bg-gray-50 px-5 py-3 text-xs font-medium text-gray-500 sm:grid">
          <span>Project</span>
          <span>Priority</span>
          <span>Lead</span>
          <span>Due Date</span>
          <span></span>
        </div>

        {filteredProjects.length === 0 && (
          <div className="px-5 py-10 text-center text-sm text-gray-500">
            No projects found.
          </div>
        )}

        {filteredProjects.map((project) => (
          <div
            key={project.id}
            className="border-b px-4 py-4 last:border-b-0 sm:grid sm:grid-cols-[2fr_1fr_1fr_1fr_auto] sm:items-center sm:px-5"
          >
            {/* Mobile */}
            <div className="sm:hidden">
              <div className="flex items-start justify-between gap-3">
                <span className="font-medium text-[#171717]">
                  {project.name}
                </span>

                <span
                  className={
                    project.priority === "High"
                      ? "shrink-0 text-red-500"
                      : project.priority === "Medium"
                        ? "shrink-0 text-orange-500"
                        : "shrink-0 text-green-600"
                  }
                >
                  {project.priority}
                </span>
              </div>

              <div className="mt-3 space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">
                    Lead
                  </span>

                  <span className="text-[#171717]">
                    {project.lead}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-500">
                    Due Date
                  </span>

                  <span className="text-[#171717]">
                    {project.dueDate}
                  </span>
                </div>
              </div>

              <div className="mt-4 flex gap-2 border-t border-[#eeeeee] pt-3">
                <button
                  type="button"
                  onClick={() =>
                    openEditModal(project)
                  }
                  className="flex-1 rounded-md border border-[#e5e5e5] px-3 py-2 text-sm text-[#666666] hover:bg-[#f5f5f5] hover:text-[#171717]"
                >
                  Edit
                </button>

                <button
                  type="button"
                  onClick={() =>
                    deleteProject(project.id)
                  }
                  className="flex-1 rounded-md border border-red-100 px-3 py-2 text-sm text-red-500 hover:bg-red-50"
                >
                  Delete
                </button>
              </div>
            </div>

            {/* Desktop */}
            <span className="hidden font-medium text-[#171717] sm:block">
              {project.name}
            </span>

            <span
              className={`hidden sm:block ${
                project.priority === "High"
                  ? "text-red-500"
                  : project.priority === "Medium"
                    ? "text-orange-500"
                    : "text-green-600"
              }`}
            >
              {project.priority}
            </span>

            <span className="hidden sm:block">
              {project.lead}
            </span>

            <span className="hidden text-gray-500 sm:block">
              {project.dueDate}
            </span>

            <div className="hidden items-center gap-2 sm:flex">
              <button
                type="button"
                onClick={() =>
                  openEditModal(project)
                }
                className="rounded-md px-2 py-1 text-xs text-[#666666] hover:bg-[#f5f5f5] hover:text-[#171717]"
              >
                Edit
              </button>

              <button
                type="button"
                onClick={() =>
                  deleteProject(project.id)
                }
                className="rounded-md px-2 py-1 text-xs text-red-500 hover:bg-red-50"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
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

              <div className="flex justify-end gap-2 pt-3">
                <button
                  type="button"
                  onClick={closeModal}
                  className="rounded-md border border-[#e5e5e5] px-4 py-2 text-sm text-[#666666]"
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