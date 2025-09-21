import { useCallback, useEffect, useRef, useState } from "react";
import { groupService } from "../api/groupService";
import { useAppStore } from "../store/AppStore";
import { showErrorToast, showSuccessToast } from "../utils/toast";
import Modal from "./Modal";
import GroupCard from "./ui/GroupCard";


function Groups() {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const groupNameInput = useRef<HTMLInputElement>(null);
    const [isLoading, setIsLoading] = useState(false);
    const { getAllGroups, groups } = useAppStore();
    const groupData = useRef(groups);

    const fetchGroups = useCallback(() => {
        getAllGroups();

    }, [getAllGroups]);

    useEffect(() => {
        fetchGroups();
    }, [fetchGroups]);

    useEffect(() => {
        groupData.current = groups;
    }, [groups]);

    // API DATA
    /**
     * 0
    : 
    isAdmin : true
    name : "bff"
    _id : "68ce2f0b107698c78a279af6"
     */


    // Dummy data for demonstration
    const groupsData = [
        {
            imageUrl: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=500',
            title: 'Trip to Bali',
            description: 'Planning our upcoming vacation!',
            members: [
                { name: 'Alice', avatarUrl: 'https://randomuser.me/api/portraits/women/1.jpg' },
                { name: 'Bob', avatarUrl: 'https://randomuser.me/api/portraits/men/1.jpg' },
            ]
        },
        {
            imageUrl: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=500',
            title: 'Apartment: 4B',
            description: 'Monthly household expenses.',
            members: [
                { name: 'Charlie', avatarUrl: 'https://randomuser.me/api/portraits/men/2.jpg' },
                { name: 'Diana', avatarUrl: 'https://randomuser.me/api/portraits/women/2.jpg' },
                { name: 'Eve', avatarUrl: 'https://randomuser.me/api/portraits/women/3.jpg' },
            ]
        },
        {
            imageUrl: 'https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?w=500',
            title: 'Project Phoenix Team',
            description: 'Team lunches and events.',
            members: [
                { name: 'Frank', avatarUrl: 'https://randomuser.me/api/portraits/men/4.jpg' },
                { name: 'Grace', avatarUrl: 'https://randomuser.me/api/portraits/women/4.jpg' },
                { name: 'Heidi', avatarUrl: 'https://randomuser.me/api/portraits/women/5.jpg' },
            ]
        },
    ];

    const createGroup = useCallback(async () => {
        if (!groupNameInput.current?.value.trim()) {
            showErrorToast('Group name cannot be empty.');
            return;
        }

        setIsLoading(true);

        try {
            await groupService.createGroup(groupNameInput.current.value);
            showSuccessToast('Group created successfully!');

            if (groupNameInput.current) {
                groupNameInput.current.value = '';
            }

            setIsModalOpen(false);

            setTimeout(() => {
                getAllGroups();
            }, 100);

        } catch (err: any) {
            showErrorToast(err.message || 'Failed to create group.');
        } finally {
            setIsLoading(false);
        }
    }, [getAllGroups]);

    return (
        <div className="max-w-7xl mx-auto p-4 md:p-8">


            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Your Groups</h1>
                <button onClick={() => setIsModalOpen(true)} className="px-4 py-2 font-semibold text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                    </svg>
                    Create Group
                </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {groups.map((group, index) => (
                    <GroupCard key={index} {...group} />
                ))}
            </div>

            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title="Create New Group"
            >
                <div className="mt-2">
                    <input
                        ref={groupNameInput}
                        type="text"
                        className="w-full px-3 py-2 border rounded-md"
                        placeholder="Group name"
                    />
                    <div className="mt-4 flex justify-end gap-2">
                        <button
                            className="px-4 py-2 border rounded-md"
                            onClick={() => setIsModalOpen(false)}
                        >
                            Cancel
                        </button>
                        <button
                            className="bg-blue-600 text-white px-4 py-2 rounded-md disabled:bg-blue-400"
                            onClick={createGroup}
                            disabled={isLoading}
                        >
                            {isLoading ? 'Creating...' : 'Create'}
                        </button>
                    </div>
                </div>
            </Modal>
        </div>
    );
}

export default Groups;