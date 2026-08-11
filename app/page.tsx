"use client";

import { useEffect, useMemo, useState } from "react";
import MainLayout from "@/components/layout/MainLayout";
import TaskBoard, { Task } from "@/components/tasks/TaskBoard";
import TaskFilters from "@/components/filters/TaskFilters";
import ThemeSwitcher from "@/components/theme/ThemeSwitcher";
import SearchBar from "@/components/ui/SearchBar";
import TaskModal from "@/components/tasks/TaskModal";

const initialTasks: Task[] = [
  {
    id: "1",
    title: "Design Homepage",
    priority: "High",
    member: "A",
    dueDate: "12 Sep 2026",
    status: "todo",
  },
  {
    id: "2",
    title: "Develop Login Feature",
    priority: "Low",
    member: "CN",
    dueDate: "15 Sep 2026",
    status: "todo",
  },
  {
    id: "3",
    title: "Code Review Completed",
    priority: "Low",
    member: "A",
    dueDate: "29 Jul",
    status: "doing",
  },
  {
    id: "4",
    title: "Design Mockups Finalized",
    priority: "Low",
    member: "CN",
    dueDate: "29 Jul",
    status: "doing",
  },
  {
    id: "5",
    title: "Feature Testing Passed",
    priority: "Low",
    member: "A",
    dueDate: "30 Jul",
    status: "completed",
  },
  {
    id: "6",
    title: "UI Design Updated",
    priority: "Medium",
    member: "A",
    dueDate: "31 Jul",
    status: "completed",
  },
  {
    id: "7",
    title: "Backend Integration",
    priority: "Medium",
    member: "Dev",
    dueDate: "02 Aug",
    status: "onHold",
  },
];

type FilterValues = {
  status: string;
  priority: string;
  member: string;
};

const STORAGE_KEY = "ablespace-tasks";

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
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

  // Load saved tasks after the page has mounted
  useEffect(() => {
    try {
      const savedTasks = localStorage.getItem(STORAGE_KEY);

      if (savedTasks) {
        setTasks(JSON.parse(savedTasks));
      }
    } catch {
      console.log("Could not load saved tasks.");
    }

    setIsLoaded(true);
  }, []);

  // Save tasks whenever they change
  useEffect(() => {
    if (!isLoaded) return;

    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(tasks)
    );
  }, [tasks, isLoaded]);

  const openTaskModal = (
    status: Task["status"] = "todo"
  ) => {
    setEditingTask(null);
    setModalStatus(status);
    setShowTaskModal(true);
  };

  const addTask = (task: Omit<Task, "id">) => {
    const newTask: Task = {
      ...task,
      id: crypto.randomUUID(),
    };

    setTasks((currentTasks) => [
      ...currentTasks,
      newTask,
    ]);
  };

  const deleteTask = (id: string) => {
    setTasks((currentTasks) =>
      currentTasks.filter((task) => task.id !== id)
    );
  };

  const editTask = (task: Task) => {
    setEditingTask(task);
    setModalStatus(task.status);
    setShowTaskModal(true);
  };

  const updateTask = (updatedTask: Omit<Task, "id">) => {
    if (!editingTask) return;

    setTasks((currentTasks) =>
      currentTasks.map((task) =>
        task.id === editingTask.id
          ? {
              ...updatedTask,
              id: editingTask.id,
            }
          : task
      )
    );

    setEditingTask(null);
  };

  const changeTaskStatus = (
    id: string,
    status: Task["status"]
  ) => {
    setTasks((currentTasks) =>
      currentTasks.map((task) =>
        task.id === id
          ? { ...task, status }
          : task
      )
    );
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

  return (
    <MainLayout>
      <div className="min-h-screen bg-[#fafafa]">
        <header className="flex min-h-16 items-center justify-between gap-4 border-b border-[#e8e8e8] bg-white px-6">
          <h1 className="text-lg font-semibold text-[#171717]">
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
              className="rounded-md border border-[#e5e5e5] bg-white px-3 py-2 text-sm text-[#666666] hover:bg-[#f7f7f7]"
            >
              Filter
            </button>

            <ThemeSwitcher />

            <button
              type="button"
              onClick={() => openTaskModal("todo")}
              className="rounded-md bg-[#171717] px-4 py-2 text-sm font-medium text-white hover:bg-[#333333]"
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