import { Outlet } from "react-router-dom";
import { Footer, Header } from "@/components";

export const MainLayout = () => {
  return (
    <div className="flex min-h-screen flex-col bg-gray-900 text-white">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};
