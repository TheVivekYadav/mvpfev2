import {createFileRoute} from '@tanstack/react-router'

export const Route = createFileRoute('/')({
    component: RouteComponent,
})

function RouteComponent() {
    return (
        <main
            className="flex flex-col items-center min-h-[80vh] bg-gradient-to-br from-blue-50 via-purple-50 to-green-50 py-8 px-2">
            <section className="w-full max-w-3xl text-center mb-10">
                <h1 className="text-4xl md:text-5xl font-extrabold text-blue-700 mb-4 drop-shadow">
                    Welcome to ChaiCode Split
                </h1>
                <p className="text-lg md:text-xl text-gray-700 mb-6">
                    Effortlessly split bills, manage group expenses, and keep your friendships stress-free.
                </p>
                <div className="flex flex-col md:flex-row gap-4 justify-center mt-6">
                    <a
                        href="/register"
                        className="px-6 py-3 rounded-md bg-blue-600 text-white font-semibold text-lg shadow hover:bg-blue-700 transition"
                    >
                        Get Started
                    </a>
                    <a
                        href="/about"
                        className="px-6 py-3 rounded-md bg-white border border-blue-200 text-blue-700 font-semibold text-lg shadow hover:bg-blue-50 transition"
                    >
                        Learn More
                    </a>
                </div>
            </section>
            <section className="w-full max-w-4xl grid md:grid-cols-3 gap-6">
                <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center">
                    <span className="text-3xl mb-2 text-green-500">👥</span>
                    <h2 className="font-bold text-lg mb-2 text-blue-800">Group Management</h2>
                    <p className="text-gray-600 text-sm">
                        Create groups, add friends, and manage members with ease.
                    </p>
                </div>
                <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center">
                    <span className="text-3xl mb-2 text-purple-500">💸</span>
                    <h2 className="font-bold text-lg mb-2 text-blue-800">Smart Expense Splitting</h2>
                    <p className="text-gray-600 text-sm">
                        Split expenses by amount or percentage and track who owes what.
                    </p>
                </div>
                <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center">
                    <span className="text-3xl mb-2 text-yellow-500">📊</span>
                    <h2 className="font-bold text-lg mb-2 text-blue-800">Clear Summaries</h2>
                    <p className="text-gray-600 text-sm">
                        Get instant summaries of group balances and recent activity.
                    </p>
                </div>
            </section>
        </main>)
}
