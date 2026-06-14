import { useNavigate } from "react-router-dom";
import { Button } from "@/components";

export const ErrorView = () => {
  const navigate = useNavigate();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center space-y-4 bg-gray-900 text-white">
      <h1 className="font-bold text-4xl">404</h1>
      <p className="text-gray-500">Page not found</p>
      <Button onClick={() => navigate(-1)}>Back</Button>
    </main>
  );
};
