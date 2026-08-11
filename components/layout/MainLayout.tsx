import Sidebar from "@/components/sidebar/Sidebar";

type MainLayoutProps = {
  children: React.ReactNode;
};

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="flex min-h-screen bg-white">
      <Sidebar />

      <main className="min-w-0 flex-1">
        {children}
      </main>
    </div>
  );
}