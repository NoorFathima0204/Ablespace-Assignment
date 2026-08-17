"use client";

import { useEffect, useMemo, useState } from "react";
import MainLayout from "@/components/layout/MainLayout";
import TaskBoard, { Task } from "@/components/tasks/TaskBoard";
import TaskFilters from "@/components/filters/TaskFilters";
import ThemeSwitcher from "@/components/theme/ThemeSwitcher";
import SearchBar from "@/components/ui/SearchBar";
import TaskModal from "@/components/tasks/TaskModal";

const API_URL = "http://localhost:3001/projects";

type FilterValues = {
  status: string;
  priority: string;
  member: string;
};

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  const [search, setSearch] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  const [filters, setFilters] = useState<FilterValues>({
    status: "All",
    priority: "All",
    member: "All",
  });

  const [showTaskModal, setShowTaskModal] = useState(false);
  const [modalStatus, setModalStatus] =
    useState<Task["status"]>("todo");

  const [editingTask, setEditingTask] = useState<Task | null>(null);

  useEffect(() => {
    const loadTasks = async () => {
      try {
        const response = await fetch(API_URL);

        if (!response.ok) {
          throw new Error("Failed to load tasks");
        }

        const data = await response.json();

        const formattedTasks: Task[] = data.map((project: any) => ({
          id: project._id,
          title: project.name,
          priority: project.priority || "Low",
          member: project.member || "A",
          dueDate: project.dueDate || "",
          status: project.status || "todo",
        }));

        setTasks(formattedTasks);
      } catch (error) {
        console.error("Could not load tasks:", error);
      } finally {
        setIsLoaded(true);
      }
    };

    loadTasks();
  }, []);

  const openTaskModal = (
    status: Task["status"] = "todo"
  ) => {
    setEditingTask(null);
    setModalStatus(status);
    setShowTaskModal(true);
  };

  const addTask = async (task: Omit<Task, "id">) => {
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: task.title,
          description: "",
          status: task.status,
          priority: task.priority,
          dueDate: task.dueDate,
          member: task.member,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to create task");
      }

      const createdProject = await response.json();

      const newTask: Task = {
        id: createdProject._id,
        title: createdProject.name,
        priority: createdProject.priority || "Low",
        member: createdProject.member || "A",
        dueDate: createdProject.dueDate || "",
        status: createdProject.status || "todo",
      };

      setTasks((currentTasks) => [
        ...currentTasks,
        newTask,
      ]);

      setShowTaskModal(false);
    } catch (error) {
      console.error("Could not create task:", error);
    }
  };

  const deleteTask = async (id: string) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete task");
      }

      setTasks((currentTasks) =>
        currentTasks.filter((task) => task.id !== id)
      );
    } catch (error) {
      console.error("Could not delete task:", error);
    }
  };

  const editTask = (task: Task) => {
    setEditingTask(task);
    setModalStatus(task.status);
    setShowTaskModal(true);
  };

  const updateTask = async (
    updatedTask: Omit<Task, "id">
  ) => {
    if (!editingTask) return;

    try {
      const response = await fetch(
        `${API_URL}/${editingTask.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: updatedTask.title,
            description: "",
            status: updatedTask.status,
            priority: updatedTask.priority,
            dueDate: updatedTask.dueDate,
            member: updatedTask.member,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update task");
      }

      const updatedProject = await response.json();

      const formattedTask: Task = {
        id: updatedProject._id,
        title: updatedProject.name,
        priority: updatedProject.priority || "Low",
        member: updatedProject.member || "A",
        dueDate: updatedProject.dueDate || "",
        status: updatedProject.status || "todo",
      };

      setTasks((currentTasks) =>
        currentTasks.map((task) =>
          task.id === editingTask.id
            ? formattedTask
            : task
        )
      );

      setEditingTask(null);
      setShowTaskModal(false);
    } catch (error) {
      console.error("Could not update task:", error);
    }
  };

  const changeTaskStatus = async (
    id: string,
    status: Task["status"]
  ) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          status,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to update task status");
      }

      setTasks((currentTasks) =>
        currentTasks.map((task) =>
          task.id === id
            ? { ...task, status }
            : task
        )
      );
    } catch (error) {
      console.error(
        "Could not update task status:",
        error
      );
    }
  };

  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      const matchesSearch = task.title
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchesPriority =
        filters.priority === "All" ||
        task.priority === filters.priority;

      const matchesMember =
        filters.member === "All" ||
        task.member === filters.member;

      const statusMap: Record<
        string,
        Task["status"]
      > = {
        "To Do": "todo",
        Doing: "doing",
        Completed: "completed",
        "On Hold": "onHold",
      };

      const matchesStatus =
        filters.status === "All" ||
        task.status === statusMap[filters.status];

      return (
        matchesSearch &&
        matchesPriority &&
        matchesMember &&
        matchesStatus
      );
    });
  }, [tasks, search, filters]);

  if (!isLoaded) {
    return (
      <MainLayout>
        <div className="flex min-h-screen items-center justify-center bg-[var(--background)]">
          <p className="text-sm text-[var(--muted)]">
            Loading tasks...
          </p>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
        <header className="flex min-h-16 items-center justify-between gap-4 border-b border-[var(--border)] bg-[var(--surface)] px-6">
          <h1 className="text-lg font-semibold text-[var(--foreground)]">
            Tasks
          </h1>

          <div className="flex items-center gap-2">
            <SearchBar
              value={search}
              onSearch={setSearch}
            />

            <button
              type="button"
              onClick={() =>
                setShowFilters((current) => !current)
              }
              className="rounded-md border border-[var(--border)] bg-[var(--surface)] px-3 py-2 text-sm text-[var(--muted)] hover:bg-black/5 dark:hover:bg-white/5"
            >
              Filter
            </button>

            <ThemeSwitcher />

            <button
              type="button"
              onClick={() => openTaskModal("todo")}
              className="rounded-md bg-[#171717] px-4 py-2 text-sm font-medium text-white hover:bg-[#333333] dark:bg-white dark:text-[#171717] dark:hover:bg-[#e5e5e5]"
            >
              + Add Task
            </button>
          </div>
        </header>

        <div className="relative p-6">
          {showFilters && (
            <div className="absolute right-6 top-20 z-20">
              <TaskFilters
                values={filters}
                onChange={setFilters}
                onClose={() => setShowFilters(false)}
              />
            </div>
          )}

          <TaskBoard
            tasks={filteredTasks}
            onAddTask={openTaskModal}
            onEdit={editTask}
            onDelete={deleteTask}
            onStatusChange={changeTaskStatus}
          />
        </div>
      </div>

      {showTaskModal && (
        <TaskModal
          defaultStatus={modalStatus}
          task={editingTask}
          onClose={() => {
            setShowTaskModal(false);
            setEditingTask(null);
          }}
          onAdd={
            editingTask
              ? updateTask
              : addTask
          }
        />
      )}
    </MainLayout>
  );
}