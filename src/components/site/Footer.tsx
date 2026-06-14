import { FaGithub, FaLinkedin } from "react-icons/fa";

export const Footer = () => {
  return (
    <footer className="w-full border-gray-800 border-t bg-gray-900 text-gray-500">
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-4 px-4 py-6 text-sm sm:flex-row">
        <p>Built with React, Vite, Tailwind and React Router</p>
        <div className="flex items-center gap-4">
          <a
            className="flex items-center gap-2 transition hover:text-white"
            href="https://github.com/Alex-Liu-0704"
            rel="noopener"
            target="_blank"
          >
            <FaGithub className="text-lg" />
            <span>GitHub</span>
          </a>
          <a className="flex items-center gap-2 transition hover:text-white" href="" rel="noreferrer" target="_blank">
            <FaLinkedin className="text-lg" />
            <span>LinkedIn</span>
          </a>
        </div>
      </div>
    </footer>
  );
};
