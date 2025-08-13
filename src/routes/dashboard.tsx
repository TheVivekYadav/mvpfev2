import { createFileRoute, redirect, useRouter } from "@tanstack/react-router";
import React, { useState } from "react";
import { friendService } from "../api/friendService.ts";
import { groupService } from "../api/groupService.ts";
import { settlement } from "../api/settlement";
import { AddExpenseModal } from "../components/modal/AddExpenseModal.tsx";
import { AddMemberModal } from "../components/modal/AddMemberModal.tsx";
import { CreateGroupModal } from "../components/modal/CreateGroupModal.tsx";
import { FriendRequestsSection } from "../components/FriendRequestSection.tsx";
import { GroupExpensesModal } from "../components/modal/GroupExpensesModal.tsx";
import { GroupMembersModal } from "../components/modal/GroupMembersModal.tsx";
import { GroupsSection } from "../components/GroupSection.tsx";
import { useAppStore } from "../store/AppStore.ts";

export const Route = createFileRoute("/dashboard")({
    beforeLoad: async () => {
        const {verifyAuth, user} = useAppStore.getState();
        if (!user) {
            await verifyAuth();
            if (!useAppStore.getState().user) {
                throw redirect({to: "/login", search: {redirect: "/dashboard"}});
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
            return {groups: [], friendRequest: [], friends: []};
        }
    },
    component: DashboardComponent,
});

function DashboardComponent() {
    const {groups, friendRequest, friends} = Route.useLoaderData();
    const router = useRouter();
    const user = useAppStore((state) => state.user);

    // If user is not present, don't render dashboard (prevents flicker)
    if (!user) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <span className="text-lg text-gray-500">Loading dashboard...</span>
            </div>
        );
    }

    // Friend request state
    const [friendID, setFriendID] = useState("");
    const handleSendFriendRequest = async () => {
        if (!friendID) return;
        try {
            await friendService.sendFriendRequest(friendID);
            await router.invalidate();
        } catch (error) {
            console.error("Error sending friend request:", error);
        }
    };
    const handleAcceptFriendRequest = async (id: string) => {
        try {
            await friendService.acceptFriendRequest(id);
            await router.invalidate();
        } catch (error) {
            console.error("Failed to accept friend request:", error);
        }
    };

    // Group creation modal state
    const [showCreateGroupModal, setShowCreateGroupModal] = useState(false);
    const [newGroupName, setNewGroupName] = useState("");
    // const handleCreateGroup = () => setShowCreateGroupModal(true);
    const handleSubmitCreateGroup = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newGroupName.trim()) return;
        try {
            await groupService.createGroup(newGroupName.trim());
            setShowCreateGroupModal(false);
            setNewGroupName("");
            await router.invalidate();
        } catch (error) {
            console.error("Failed to create group:", error);
        }
    };

    // Add Member modal state
    const [showAddMemberModal, setShowAddMemberModal] = useState(false);
    const [addMemberGroupId, setAddMemberGroupId] = useState<string | null>(null);
    const [addMemberUserIds, setAddMemberUserIds] = useState<string>("");
    const handleAddMember = (groupId: string) => {
        setAddMemberGroupId(groupId);
        setAddMemberUserIds("");
        setShowAddMemberModal(true);
    };
    const handleSubmitAddMember = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!addMemberGroupId) return;
        const userIds = addMemberUserIds.split(",").map((id) => id.trim()).filter(Boolean);
        if (userIds.length === 0) return;
        try {
            await groupService.addMember(addMemberGroupId, userIds);
            setShowAddMemberModal(false);
            setAddMemberGroupId(null);
            setAddMemberUserIds("");
            await router.invalidate();
        } catch (error) {
            console.error("Failed to add members:", error);
        }
    };

    // Modal state for group members
    const [showMembersModal, setShowMembersModal] = useState(false);
    const [members, setMembers] = useState<any[]>([]);
    const [membersGroupName, setMembersGroupName] = useState<string>("");
    const handleViewGroupMembers = async (groupId: string) => {
        try {
            const res = await groupService.listGroupMembers(groupId);
            setMembers(res.data.members || []);
            const group = groups.find((g: any) => g._id === groupId);
            setMembersGroupName(group?.name || "Group Members");
            setShowMembersModal(true);
        } catch (error) {
            console.error("Failed to fetch group members:", error);
        }
    };

    // Add Expense modal state
    const [showAddExpenseModal, setShowAddExpenseModal] = useState(false);
    const [selectedExpenseGroupId, setSelectedExpenseGroupId] = useState<string | null>(null);

    // Prepare group and user options for AddExpense
    const groupOptions = groups ?? [];
    const allGroupMembers = members.length > 0 ? members.map(m => m.userId) : friends ?? [];
    const userOptions = allGroupMembers.length > 0 ? allGroupMembers : friends ?? [];

    // Handle Add Expense submit
    const handleAddExpense = async (expense: any) => {
        try {
            await groupService.createExpense(expense);
            setShowAddExpenseModal(false);
            setSelectedExpenseGroupId(null);
            await router.invalidate();
        } catch (error) {
            console.error("Failed to add expense:", error);
        }
    };

    // Show AddExpense modal for a specific group
    const handleShowAddExpense = (groupId: string) => {
        setSelectedExpenseGroupId(groupId);
        setShowAddExpenseModal(true);
    };

    // Group expenses modal state
    const [showExpensesModal, setShowExpensesModal] = useState(false);
    const [groupExpenses, setGroupExpenses] = useState<any[]>([]);
    const [expensesGroupName, setExpensesGroupName] = useState<string>("");
    const handleViewGroupExpenses = async (groupId: string) => {
        try {
            const res = await groupService.getGroupExpenses(groupId);

            setGroupExpenses(res.data.expenses || []);
            const group = groups.find((g: any) => g._id === groupId);
            setExpensesGroupName(group?.name || "Group Expenses");
            setShowExpensesModal(true);
        } catch (error) {
            console.error("Failed to fetch group expenses:", error);
        }
    };

    // Settlement handler
    const handleSettleUp = async (groupId: string, paidTo) => {
        if (!user) return;
        try {
            // For demo: settle up with 0 amount (or prompt for amount if needed)
            await settlement.create({ groupId, paidTo: user._id, amount: 10 });
            await router.invalidate();
            alert("Settlement created!");
        } catch (error) {
            console.error("Failed to settle up:", error);
            alert("Failed to settle up.");
        }
    };

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
                    friendID={friendID}
                    setFriendID={setFriendID}
                    handleSendFriendRequest={handleSendFriendRequest}
                    handleAcceptFriendRequest={handleAcceptFriendRequest}
                />
                <GroupsSection
                    groups={groups}
                    handleAddMember={handleAddMember}
                    handleViewGroupMembers={handleViewGroupMembers}
                    handleViewGroupExpenses={handleViewGroupExpenses}
                    handleCreateGroup={() => setShowCreateGroupModal(true)}
                    handleShowAddExpense={handleShowAddExpense}
                    handleSettleUp={handleSettleUp}
                />
            </div>
            <GroupMembersModal
                show={showMembersModal}
                onClose={() => setShowMembersModal(false)}
                members={members}
                membersGroupName={membersGroupName}
            />
            <CreateGroupModal
                show={showCreateGroupModal}
                onClose={() => setShowCreateGroupModal(false)}
                newGroupName={newGroupName}
                setNewGroupName={setNewGroupName}
                handleSubmitCreateGroup={handleSubmitCreateGroup}
            />
            <AddMemberModal
                show={showAddMemberModal}
                onClose={() => setShowAddMemberModal(false)}
                addMemberUserIds={addMemberUserIds}
                setAddMemberUserIds={setAddMemberUserIds}
                handleSubmitAddMember={handleSubmitAddMember}
            />
            <AddExpenseModal
                show={showAddExpenseModal}
                onClose={() => {
                    setShowAddExpenseModal(false);
                    setSelectedExpenseGroupId(null);
                }}
                groupOptions={groupOptions}
                userOptions={userOptions}
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
                expensesGroupName={expensesGroupName}
                groupExpenses={groupExpenses}
            />
        </div>
    );
}
