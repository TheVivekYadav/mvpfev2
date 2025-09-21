// @ts-nocheck
import { useAppStore } from "../store/AppStore";
import GroupCard from "./ui/GroupCard";
import SummaryCard from "./ui/SummaryCard";

function DashboardPage() {

    const { user } = useAppStore();

    const groupsData = [
        { imageUrl: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=500', title: 'Trip to Bali', description: 'Planning our upcoming vacation!', members: [{ name: 'A', avatarUrl: 'https://randomuser.me/api/portraits/women/1.jpg' }, { name: 'B', avatarUrl: 'https://randomuser.me/api/portraits/men/1.jpg' }] },
        { imageUrl: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=500', title: 'Apartment 4B', description: 'Monthly household expenses.', members: [{ name: 'C', avatarUrl: 'https://randomuser.me/api/portraits/men/2.jpg' }, { name: 'D', avatarUrl: 'https://randomuser.me/api/portraits/women/2.jpg' }, { name: 'E', avatarUrl: 'https://randomuser.me/api/portraits/women/3.jpg' }] },
        { imageUrl: 'https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?w=500', title: 'Project Phoenix Team', description: 'Team lunches and events.', members: [{ name: 'F', avatarUrl: 'https://randomuser.me/api/portraits/men/4.jpg' }, { name: 'G', avatarUrl: 'https://randomuser.me/api/portraits/women/4.jpg' }, { name: 'H', avatarUrl: 'https://randomuser.me/api/portraits/women/5.jpg' }] },
    ];

    return (
        <div className="max-w-7xl mx-auto p-4 md:p-8">
            {/* Header section */}
            <header className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-gray-900">Welcome back, {user ? user.name.toUpperCase() : "Loading..."}</h1>

            </header>

            {/* Summary cards section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <SummaryCard title="You are owed" amount="2,280.00" note="Total from all groups" amountColor="text-green-600" />
                <SummaryCard title="You owe" amount="410.00" note="Total across all groups" amountColor="text-red-600" />
                <SummaryCard title="Net Balance" amount="1,870.00" note="You are owed in total" />
            </div>

            {/* Your Groups section */}
            <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Your Groups</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {groupsData.map((group, index) => (
                        <GroupCard key={index} {...group} />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default DashboardPage;