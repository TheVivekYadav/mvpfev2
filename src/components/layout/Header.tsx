import { Link } from "@tanstack/react-router";

interface HeaderProps {
  setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Header: React.FC<HeaderProps> = ({ setSidebarOpen }) => {

  return (
    <header className="flex items-center justify-between bg-white px-4 sm:px-8 py-4 border-b border-gray-200 z-10">
      <div className="flex items-center space-x-4">
        <button
          className="text-gray-600 hover:text-gray-900 md:hidden"
          onClick={() => setSidebarOpen(true)}
          aria-label="Open sidebar"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="4" y1="12" x2="20" y2="12"></line>
            <line x1="4" y1="6" x2="20" y2="6"></line>
            <line x1="4" y1="18" x2="20" y2="18"></line>
          </svg>
        </button>

        <Link to="/">
          <h1 className="text-xl md:text-2xl font-bold text-gray-800">
            PenySplit
          </h1>
        </Link>
      </div>

    </header>
  );
};

export default Header;