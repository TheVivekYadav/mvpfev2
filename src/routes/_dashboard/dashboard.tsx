import { createFileRoute, Outlet } from '@tanstack/react-router';
import { useEffect, useState } from 'react';
import Header from '../../components/layout/Header';
import Sidebar from '../../components/layout/Sidebar';

export const Route = createFileRoute('/_dashboard/dashboard')({
  component: RouteComponent,
})

function RouteComponent() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);


  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setSidebarOpen(false);
      }
    };
    document.addEventListener('keydown', handleKeyDown);

    // Clean up the event listener when the component unmounts
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []); // Empty dependency array means this runs only once

  return <>
    <div className="relative flex flex-col h-screen">

      <Header setSidebarOpen={setSidebarOpen} />

      <div className="flex flex-1 overflow-hidden">

        <aside className={`
                        absolute md:relative inset-y-0 left-0 z-30
                        transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0
                        transition-transform duration-300 ease-in-out
                        w-64 flex-shrink-0 shadow-lg
                    `}>
          <Sidebar />
        </aside>

        {isSidebarOpen && (
          <div
            className="fixed inset-0 bg-black opacity-50 z-20 md:hidden"
            onClick={() => setSidebarOpen(false)}
          ></div>
        )}

        <main className="flex-1 overflow-y-auto bg-[#f4f7fa] p-8">
          <Outlet />
        </main>

      </div>

    </div>
  </>
}