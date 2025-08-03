import {createFileRoute, redirect, useRouter} from "@tanstack/react-router";
import {useAppStore} from "../store/AppStore.ts";
import {groupService} from "../api/groupService.ts";
import React, {useState} from "react";
import {friendService} from "../api/friendService.ts";
import {FriendRequestsSection} from "../components/FriendRequestSection.tsx";
import {GroupsSection} from "../components/GroupSection.tsx";
import {GroupMembersModal} from "../components/GroupMembersModal.tsx";
import {CreateGroupModal} from "../components/CreateGroupModal.tsx";
import {AddMemberModal} from "../components/AddMemberModal.tsx";
import {AddExpenseModal} from "../components/AddExpenseModal.tsx";
import {GroupExpensesModal} from "../components/GroupExpensesModal.tsx";

export const Route = createFileRoute("/dashboard")({
    beforeLoad: async () => {
        // This authentication logic is correct
        const {verifyAuth, user} = useAppStore.getState();
        if (user) return;
        await verifyAuth();
        if (!useAppStore.getState().user) {
            throw redirect({to: "/login", search: {redirect: "/dashboard"}});
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
            // FIX: Return a consistent shape with empty arrays on error
            return {groups: [], friendRequest: [], friends: []};
        }
    },
    component: DashboardComponent,
});

function DashboardComponent() {
    const user = useAppStore((state) => state.user)!;

    const {groups, friendRequest, friends} = Route.useLoaderData();

    const router = useRouter();

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
    const handleCreateGroup = () => setShowCreateGroupModal(true);
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
            console.log(`Group ID:- ${groupId}`)
            const res = await groupService.getGroupExpenses(groupId);

            setGroupExpenses(res.data.expenses || []);
            console.log("Group Expenses:", res.data);
            const group = groups.find((g: any) => g._id === groupId);
            setExpensesGroupName(group?.name || "Group Expenses");
            setShowExpensesModal(true);
        } catch (error) {
            console.error("Failed to fetch group expenses:", error);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-100 to-blue-100 p-4">
            <h1 className="font-bold text-2xl mb-1 text-gray-800">
                Dashboard - {user?.name}
            </h1>
            <p className="text-gray-600 mb-6">
                User Id: <span className="font-mono">{user?._id}</span>
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
                handleSubmitAddMember={handleSubmitAddMember}></AddMemberModal>
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
