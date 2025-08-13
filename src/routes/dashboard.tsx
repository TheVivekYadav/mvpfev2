import { createFileRoute, redirect, useRouter } from "@tanstack/react-router";
import { useState } from "react";
import { friendService } from "../api/friendService.ts";
import { groupService } from "../api/groupService.ts";
import { FriendRequestsSection } from "../components/FriendRequestSection.tsx";
import { GroupsSection } from "../components/GroupSection.tsx";
import { AddExpenseModal } from "../components/modal/AddExpenseModal.tsx";
import { AddMemberModal } from "../components/modal/AddMemberModal.tsx";
import { CreateGroupModal } from "../components/modal/CreateGroupModal.tsx";
import { GroupExpensesModal } from "../components/modal/GroupExpensesModal.tsx";
import { GroupMembersModal } from "../components/modal/GroupMembersModal.tsx";
import { useAppStore } from "../store/AppStore.ts";

export const Route = createFileRoute("/dashboard")({
    beforeLoad: async () => {
        const { verifyAuth, user } = useAppStore.getState();
        if (!user) {
            await verifyAuth();
            if (!useAppStore.getState().user) {
                throw redirect({ to: "/login", search: { redirect: "/dashboard" } });
            }
        }
    },
    loader: async () => {
        try {
            // Fetch all data in parallel for better performance
            const [groupsRes, friendRequestsRes, friendsRes] = await Promise.all([
                groupService.getAllGroups(),
                friendService.getAllFriendRequests(),
                friendService.getFriends(),
            ]);
            return {
                groups: groupsRes.data.groups || [],
                friendRequest: friendRequestsRes.data.requests || [],
                friends: friendsRes.data.contacts || [],
            };
        } catch (error) {
            console.error("Failed to load dashboard data:", error);
            // Return a consistent shape with empty arrays on error
            return { groups: [], friendRequest: [], friends: [] };
        }
    },
    component: DashboardComponent,
});

function DashboardComponent() {
    const { groups, friendRequest, friends } = Route.useLoaderData();
    const user = useAppStore((state) => state.user);


    const [showCreateGroupModal, setShowCreateGroupModal] = useState(false);
    const [showAddMemberModal, setShowAddMemberModal] = useState(false);
    const [showMembersModal, setShowMembersModal] = useState(false);
    const [showAddExpenseModal, setShowAddExpenseModal] = useState(false);
    const [showExpensesModal, setShowExpensesModal] = useState(false);
    const [selectedExpenseGroupId, setSelectedExpenseGroupId] = useState<string | null>(null);



    // If user is not present, don't render dashboard (prevents flicker)
    if (!user) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <span className="text-lg text-gray-500">Loading dashboard...</span>
            </div>
        );
    }


    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-50 to-green-100 p-4">
            <h1 className="font-bold text-2xl mb-1 text-blue-900 drop-shadow">
                Dashboard - <span className="text-green-700">{user?.name}</span>
            </h1>
            <p className="text-blue-700 mb-6">
                User Id: <span className="font-mono bg-blue-50 px-2 py-1 rounded">{user?._id}</span>
            </p>
            <div className="flex flex-col md:flex-row gap-6 w-full max-w-6xl mx-auto">
                <FriendRequestsSection
                    friendRequest={friendRequest}
                    friends={friends}
                />
                <GroupsSection
                    groups={groups}
                />
            </div>
            <GroupMembersModal
                show={showMembersModal}
                onClose={() => setShowMembersModal(false)}
            />
            <CreateGroupModal
                show={showCreateGroupModal}
                onClose={() => setShowCreateGroupModal(false)}
            />
            <AddMemberModal
                show={showAddMemberModal}
                onClose={() => setShowAddMemberModal(false)}
            />
            <AddExpenseModal
                show={showAddExpenseModal}
                onClose={() => {
                    setShowAddExpenseModal(false);
                    setSelectedExpenseGroupId(null);
                }}
                handleAddExpense={(expense: any) =>
                    handleAddExpense({
                        ...expense,
                        groupId: selectedExpenseGroupId || expense.groupId,
                    })
                }
            />
            <GroupExpensesModal
                show={showExpensesModal}
                onClose={() => setShowExpensesModal(false)}
            />
        </div>
    );
}
