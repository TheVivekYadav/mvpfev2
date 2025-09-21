import { Link } from "@tanstack/react-router";

interface GroupCardProps {
    _id: string;
    name: string;
    isAdmin: boolean;
    // Optional props for backward compatibility
    imageUrl?: string;
    title?: string;
    description?: string;
    members?: Array<{ name: string, avatarUrl: string }>;
}


const GroupCard = ({ _id, imageUrl = "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=500", name, description = "desc of group", members = [
    { name: 'Alice', avatarUrl: 'https://randomuser.me/api/portraits/women/1.jpg' },
    { name: 'Bob', avatarUrl: 'https://randomuser.me/api/portraits/men/1.jpg' },
] }: GroupCardProps) => (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden flex flex-col">
        <img className="w-full h-40 object-cover" src={imageUrl} alt={name} />

        {/* Set flex-grow to make this div fill available space */}
        <div className="p-4 flex flex-col flex-grow">
            {/* Title and description */}
            <div className="flex-grow">
                <h3 className="text-xl font-bold text-gray-800">{name}</h3>
                <p className="text-sm text-gray-500 mt-1">{description}</p>
            </div>

            {/* Avatars and View link at the bottom */}
            <div className="mt-4 flex justify-between items-center">
                {/* Member avatars with corrected styling */}
                <div className="flex -space-x-3">
                    {members.map((member, index) => (
                        <img
                            key={index}
                            className="w-8 h-8 rounded-full border-2 border-white object-cover ring-1 ring-gray-300"
                            src={member.avatarUrl}
                            alt={member.name}
                        />
                    ))}
                </div>

                {/* Corrected "View" link */}
                <Link to="/dashboard/groups/$groupId"
                    params={{ groupId: _id }} className="text-sm font-semibold text-blue-600 hover:text-blue-800 flex items-center gap-1">
                    View
                    {/* Unicode arrow character */}
                    <span className="font-bold text-lg">↗</span>
                </Link>
            </div>
        </div>
    </div>
);

export default GroupCard;