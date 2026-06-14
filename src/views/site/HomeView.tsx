import { useNavigate } from "react-router-dom";
import { Button } from "@/components";

export const HomeView = () => {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen flex-col bg-gray-900 text-white">
      <main className="mx-auto flex max-w-7xl flex-1 flex-col items-center justify-center px-4">
        <section className="space-y-8 text-center">
          <h1 className="font-bold text-5xl tracking-tight">TMDB Explorer</h1>
          <p className="text-gray-400 text-lg">Explore movies and discover people using a fast, modern interface.</p>
          <Button onClick={() => navigate("/sign-in")}>Enter</Button>
        </section>
      </main>
    </div>
  );
};
