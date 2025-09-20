
import { Link } from '@tanstack/react-router';
import React from 'react';

const Sidebar: React.FC = () => {
    const linkClasses = "flex items-center p-3 my-2 text-gray-200 no-underline rounded-lg transition-colors duration-200 hover:bg-slate-700 hover:text-white";

    const activeLinkClasses = "font-bold text-teal-400 bg-slate-700";

    console.log("Sidebar render");
    return (
        <nav className="flex flex-col h-full bg-slate-800 p-4">

            <div>
                <div className="mb-8">
                    <h2 className="text-2xl font-semibold text-white">Menu</h2>
                </div>

                <Link
                    to="/dashboard"
                    className={linkClasses}
                    activeProps={{ className: activeLinkClasses }}
                    activeOptions={{ exact: true }}
                >
                    Dashboard
                </Link>
                <Link
                    to="/dashboard/groups"
                    className={linkClasses}
                    activeProps={{ className: activeLinkClasses }}
                >
                    Groups
                </Link>
                <Link
                    to="/dashboard/settings"
                    className={linkClasses}
                    activeProps={{ className: activeLinkClasses }}
                >
                    Settings
                </Link>
            </div>

            <div className="mt-auto pt-4 border-t border-slate-700">
                <div className="flex items-center justify-between">

                    <div className="flex items-center">
                        <div className="w-10 h-10 rounded-full bg-slate-600 flex items-center justify-center mr-3 flex-shrink-0">
                            <span className="text-lg font-semibold text-white">JD</span>
                        </div>
                        <div className="text-left">
                            <div className="text-sm font-bold text-white">John Doe</div>
                            <div className="text-xs text-gray-400">Administrator</div>
                        </div>
                    </div>

                    <button
                        onClick={() => alert('Logout logic goes here!')}
                        className="p-2 rounded-md text-gray-400 transition-colors duration-200 hover:bg-slate-700 hover:text-white"
                        aria-label="Logout"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                            <polyline points="16 17 21 12 16 7"></polyline>
                            <line x1="21" y1="12" x2="9" y2="12"></line>
                        </svg>
                    </button>

                </div>
            </div>
        </nav>
    );
};

export default Sidebar;