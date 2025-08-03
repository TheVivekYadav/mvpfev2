import {createFileRoute, redirect, useRouter} from "@tanstack/react-router";
import {useAppStore} from "../store/AppStore.ts";
import {groupService} from "../api/groupService.ts";
import React, {useState} from "react";
import {friendService} from "../api/friendService.ts";
import {AddExpense} from "../components/AddExpense";

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

    const [friendID, setFriendID] = useState("");

    const handleSendFriendRequest = async () => {
        if (!friendID) return;
        try {
            await friendService.sendFriendRequest(friendID);
            console.log("Friend request sent successfully");
            await router.invalidate();
        } catch (error) {
            console.error("Error sending friend request:", error);
        }
    };

    const handleAcceptFriendRequest = async (id: string) => {
        try {
            await friendService.acceptFriendRequest(id);
            console.log("Friend request accepted:", id);
            await router.invalidate();
        } catch (error) {
            console.error("Failed to accept friend request:", error);
        }
    };

    // Group creation modal state
    const [showCreateGroupModal, setShowCreateGroupModal] = useState(false);
    const [newGroupName, setNewGroupName] = useState("");

    const handleCreateGroup = () => {
        setShowCreateGroupModal(true);
    };

    const handleSubmitCreateGroup = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newGroupName.trim()) return;
        try {
            await groupService.createGroup(newGroupName.trim());
            console.log("Group created successfully:", newGroupName);
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
        const userIds = addMemberUserIds
            .split(",")
            .map((id) => id.trim())
            .filter(Boolean);
        if (userIds.length === 0) return;
        try {
            await groupService.addMember(addMemberGroupId, userIds);
            console.log("Members added successfully");
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
            const members = res.data.members || [];
            setMembers(members);
            const group = groups.find((g: any) => g._id === groupId);
            setMembersGroupName(group?.name || "Group Members");
            setShowMembersModal(true);
        } catch (error) {
            console.error("Failed to fetch group members:", error);
        }
    };

    // Add Expense modal state
    const [showAddExpenseModal, setShowAddExpenseModal] = useState(false);

    // Prepare group and user options for AddExpense
    const groupOptions = groups ?? [];
    // Collect all unique users from group members for demo (replace with your logic as needed)
    const allGroupMembers = members.length > 0
        ? members.map(m => m.userId)
        : friends ?? [];
    const userOptions = allGroupMembers.length > 0
        ? allGroupMembers
        : friends ?? [];

    // Handle Add Expense submit
    const handleAddExpense = async (expense: any) => {
        try {
            await groupService.createExpense(expense);
            setShowAddExpenseModal(false);
            await router.invalidate();
        } catch (error) {
            console.error("Failed to add expense:", error);
        }
    };

    // Expense state for selected group
    const [selectedGroupId, setSelectedGroupId] = useState<string | null>(null);
    const [groupExpenses, setGroupExpenses] = useState<any[]>([]);
    const [showExpensesModal, setShowExpensesModal] = useState(false);
    const [expensesGroupName, setExpensesGroupName] = useState<string>("");

    // Fetch and show expenses for a group
    const handleViewGroupExpenses = async (groupId: string) => {
        try {
            const res = await groupService.listGroupExpense(groupId);
            setGroupExpenses(res.data.expenses || []);
            const group = groups.find((g: any) => g._id === groupId);
            setExpensesGroupName(group?.name || "Group Expenses");
            setSelectedGroupId(groupId);
            setShowExpensesModal(true);
        } catch (error) {
            console.error("Failed to fetch group expenses:", error);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-100 to-blue-100 p-4">
            <h1 className="font-bold text-2xl mb-1 text-gray-800">
                Dashboard - {user.name}
            </h1>

            <p className="text-gray-600 mb-6">
                User Id: <span className="font-mono">{user._id}</span>
            </p>

            <div className="flex flex-col md:flex-row gap-6 w-full max-w-6xl mx-auto">
                {/* Friend Request Section  */}

                <div className="flex-1 bg-white rounded-xl shadow-lg p-6 min-w-[220px] border border-gray-100">
                    <h2 className="font-semibold mb-3 text-blue-700 text-lg flex items-center gap-2">
                        <svg
                            className="w-5 h-5 text-blue-400"
                            aria-hidden="true"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                        >
                            <path
                                d="M17 20h5v-2a4 4 0 00-3-3.87M9 20H4v-2a4 4 0 013-3.87m9-7a4 4 0 11-8 0 4 4 0 018 0z"/>
                        </svg>
                        Friend Requests
                    </h2>

                    <input
                        className="w-full mb-3 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-200 transition"
                        placeholder="Enter friend's username or email"
                        value={friendID}
                        onChange={(e) => setFriendID(e.target.value)}
                    />

                    <button
                        className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md p-2 transition"
                        onClick={handleSendFriendRequest}
                    >
                        Send Friend Request
                    </button>

                    <ul className="space-y-2 mt-4">
                        {(friendRequest ?? []).length > 0 ? (
                            (friendRequest ?? []).map((friend) => (
                                <li
                                    className="group bg-blue-50 text-blue-700 px-4 py-2 rounded-md flex items-center gap-2 shadow-sm hover:bg-blue-100 transition cursor-pointer"
                                    key={friend.id}
                                >
                                    <svg
                                        className="w-4 h-4 text-blue-400"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                    >
                                        <path
                                            d="M10 10a4 4 0 100-8 4 4 0 000 8zm0 2c-4 0-7 2-7 4v1a1 1 0 001 1h12a1 1 0 001-1v-1c0-2-3-4-7-4z"/>
                                    </svg>

                                    <span className="font-medium flex-1">{friend.name}</span>

                                    <div className="hidden group-hover:flex gap-1 ml-auto">
                                        <button
                                            className="p-1 rounded-full hover:bg-green-100 transition-colors"
                                            aria-label="Accept"
                                            type="button"
                                            onClick={() => handleAcceptFriendRequest(friend.id)}
                                        >
                                            <svg
                                                className="w-4 h-4 text-green-500"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M5 13l4 4L19 7"
                                                />
                                            </svg>
                                        </button>

                                        <button
                                            className="p-1 rounded-full hover:bg-red-100 transition-colors"
                                            aria-label="Reject"
                                            type="button"
                                        >
                                            <svg
                                                className="w-4 h-4 text-red-500"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M6 18L18 6M6 6l12 12"
                                                />
                                            </svg>
                                        </button>
                                    </div>
                                </li>
                            ))
                        ) : (
                            <li className="text-gray-400 italic text-center py-2 bg-gray-50 rounded-md">
                                No friend requests
                            </li>
                        )}
                    </ul>

                    <ul className="space-y-2 mt-4">
                        {(friends?.length ?? 0) > 0 ? (
                            friends!.map((friend) => (
                                <li
                                    key={friend._id}
                                    className="bg-green-50 text-green-700 px-4 py-2 rounded-md flex items-center gap-2 shadow-sm hover:bg-green-100 transition"
                                >
                                    <svg
                                        className="w-4 h-4 text-green-400"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                    >
                                        <path
                                            d="M10 10a4 4 0 100-8 4 4 0 000 8zm0 2c-4 0-7 2-7 4v1a1 1 0 001 1h12a1 1 0 001-1v-1c0-2-3-4-7-4z"/>
                                    </svg>

                                    <span className="font-medium">{friend.name}</span>
                                </li>
                            ))
                        ) : (
                            <li className="text-gray-400 italic text-center py-2 bg-gray-50 rounded-md">
                                No Friends
                            </li>
                        )}
                    </ul>
                </div>

                {/* Groups & Expenses Section */}

                <div className="flex-1 bg-white rounded-xl shadow-lg p-6 min-w-[220px] border border-gray-100">
                    <h2 className="font-semibold mb-3 text-green-700 text-lg flex items-center gap-2">
                        <svg
                            className="w-5 h-5 text-green-400"
                            aria-hidden="true"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                        >
                            <path
                                d="M17 20h5v-2a4 4 0 00-3-3.87M9 20H4v-2a4 4 0 013-3.87m9-7a4 4 0 11-8 0 4 4 0 018 0z"/>
                        </svg>
                        Expenses
                        <button
                            className="ml-auto p-2 rounded-full bg-blue-100 hover:bg-blue-300 transition-colors flex items-center justify-center"
                            aria-label="Add Expense"
                            type="button"
                            onClick={() => setShowAddExpenseModal(true)}
                        >
                            <svg
                                className="w-5 h-5 text-blue-700"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M12 4v16m8-8H4"
                                />
                            </svg>
                        </button>
                    </h2>

                    <div className="mb-4 text-gray-700">
                        Total Groups:{" "}
                        <span className="font-bold text-green-600">
              {groups?.length ?? "0"}
            </span>
                    </div>

                    <div>
                        <ul className="space-y-1">
                            {!Array.isArray(groups) || groups.length === 0 ? (
                                <li className="text-gray-400 italic">No groups found</li>
                            ) : (
                                groups.map((group: { _id: string; name: string }) => (
                                    <li
                                        key={group._id}
                                        className="text-gray-700 bg-gray-100 p-2 rounded-md flex items-center gap-2 hover:bg-gray-200 transition-colors cursor-pointer"
                                    >
                                        <span className="font-semibold">{group.name}</span>
                                        <button
                                            className="ml-auto p-1 rounded-full bg-blue-100 hover:bg-blue-300 transition-colors text-blue-700"
                                            aria-label="Add Member"
                                            type="button"
                                            onClick={() => handleAddMember(group._id)}
                                        >
                                            +
                                        </button>
                                        <button
                                            className="ml-2 p-1 rounded-full bg-purple-100 hover:bg-purple-300 transition-colors text-purple-700"
                                            aria-label="View Members"
                                            type="button"
                                            onClick={() => handleViewGroupMembers(group._id)}
                                        >
                                            👁
                                        </button>
                                        <button
                                            className="ml-2 p-1 rounded-full bg-yellow-100 hover:bg-yellow-200 transition-colors text-yellow-700"
                                            aria-label="View Expenses"
                                            type="button"
                                            onClick={() => handleViewGroupExpenses(group._id)}
                                        >
                                            💸
                                        </button>
                                    </li>
                                ))
                            )}
                        </ul>
                    </div>

                    {/* ... */}
                </div>
            </div>

            {/* Group Members Modal */}
            {showMembersModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
                    <div className="bg-white rounded-xl shadow-2xl p-6 w-full max-w-md relative">
                        <button
                            className="absolute top-2 right-2 text-gray-400 hover:text-gray-700"
                            onClick={() => setShowMembersModal(false)}
                            aria-label="Close"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2}
                                 viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/>
                            </svg>
                        </button>
                        <h3 className="text-lg font-bold mb-4 text-blue-700">{membersGroupName}</h3>
                        <ul className="space-y-3">
                            {members.length === 0 ? (
                                <li className="text-gray-400 italic">No members found</li>
                            ) : (
                                members.map((member) => {
                                    const name = member.userId.name || "";
                                    const initials = name
                                        .split(" ")
                                        .map((n: string) => n[0])
                                        .join("")
                                        .toUpperCase()
                                        .slice(0, 2);
                                    return (
                                        <li key={member._id}
                                            className="flex items-center gap-3 bg-blue-50 rounded-md p-2">
                                            <div
                                                className="w-8 h-8 rounded-full border border-blue-200 bg-blue-200 flex items-center justify-center text-blue-800 font-bold text-base select-none">
                                                {initials || "U"}
                                            </div>
                                            <div className="flex-1">
                                                <div className="font-semibold text-gray-800">{member.userId.name}</div>
                                                <div className="text-xs text-gray-500">{member.userId.email}</div>
                                            </div>
                                            {member.isAdmin && (
                                                <span
                                                    className="text-xs px-2 py-1 bg-green-100 text-green-700 rounded font-bold ml-2">
                                                    Admin
                                                </span>
                                            )}
                                        </li>
                                    );
                                })
                            )}
                        </ul>
                    </div>
                </div>
            )}

            {/* Create Group Modal */}
            {showCreateGroupModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
                    <div className="bg-white rounded-xl shadow-2xl p-6 w-full max-w-sm relative">
                        <button
                            className="absolute top-2 right-2 text-gray-400 hover:text-gray-700"
                            onClick={() => setShowCreateGroupModal(false)}
                            aria-label="Close"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2}
                                 viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/>
                            </svg>
                        </button>
                        <h3 className="text-lg font-bold mb-4 text-green-700">Create New Group</h3>
                        <form onSubmit={handleSubmitCreateGroup} className="space-y-4">
                            <input
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-200 transition"
                                placeholder="Group Name"
                                value={newGroupName}
                                onChange={(e) => setNewGroupName(e.target.value)}
                                autoFocus
                            />
                            <div className="flex justify-end gap-2">
                                <button
                                    type="button"
                                    className="px-4 py-2 rounded-md bg-gray-100 hover:bg-gray-200 text-gray-700"
                                    onClick={() => setShowCreateGroupModal(false)}
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 rounded-md bg-green-500 hover:bg-green-600 text-white font-semibold"
                                >
                                    Create
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Add Member Modal */}
            {showAddMemberModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
                    <div className="bg-white rounded-xl shadow-2xl p-6 w-full max-w-sm relative">
                        <button
                            className="absolute top-2 right-2 text-gray-400 hover:text-gray-700"
                            onClick={() => setShowAddMemberModal(false)}
                            aria-label="Close"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2}
                                 viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/>
                            </svg>
                        </button>
                        <h3 className="text-lg font-bold mb-4 text-blue-700">Add Members</h3>
                        <form onSubmit={handleSubmitAddMember} className="space-y-4">
                            <input
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-200 transition"
                                placeholder="Enter user IDs (comma separated)"
                                value={addMemberUserIds}
                                onChange={(e) => setAddMemberUserIds(e.target.value)}
                                autoFocus
                            />
                            <div className="flex justify-end gap-2">
                                <button
                                    type="button"
                                    className="px-4 py-2 rounded-md bg-gray-100 hover:bg-gray-200 text-gray-700"
                                    onClick={() => setShowAddMemberModal(false)}
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 rounded-md bg-blue-500 hover:bg-blue-600 text-white font-semibold"
                                >
                                    Add
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Add Expense Modal */}
            {showAddExpenseModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
                    <div className="bg-white rounded-xl shadow-2xl p-6 w-full max-w-lg relative">
                        <button
                            className="absolute top-2 right-2 text-gray-400 hover:text-gray-700"
                            onClick={() => setShowAddExpenseModal(false)}
                            aria-label="Close"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2}
                                 viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/>
                            </svg>
                        </button>
                        <AddExpense
                            groups={groupOptions}
                            users={userOptions}
                            onSubmit={handleAddExpense}
                            onCancel={() => setShowAddExpenseModal(false)}
                        />
                    </div>
                </div>
            )}

            {/* Group Expenses Modal */}
            {showExpensesModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
                    <div className="bg-white rounded-xl shadow-2xl p-6 w-full max-w-2xl relative">
                        <button
                            className="absolute top-2 right-2 text-gray-400 hover:text-gray-700"
                            onClick={() => setShowExpensesModal(false)}
                            aria-label="Close"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2}
                                 viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/>
                            </svg>
                        </button>
                        <h3 className="text-lg font-bold mb-4 text-yellow-700">{expensesGroupName} - Expenses</h3>
                        <ul className="space-y-4 max-h-[60vh] overflow-y-auto">
                            {groupExpenses.length === 0 ? (
                                <li className="text-gray-400 italic">No expenses found</li>
                            ) : (
                                groupExpenses.map((expense) => (
                                    <li key={expense._id}
                                        className="bg-yellow-50 rounded-md p-3 shadow flex flex-col gap-1">
                                        <div className="flex items-center gap-2">
                                            <span className="font-semibold text-gray-800">{expense.description}</span>
                                            <span className="ml-auto text-green-700 font-bold">
                                                ₹{expense.amount}
                                            </span>
                                        </div>
                                        <div className="text-xs text-gray-500">
                                            Paid by: <span
                                            className="font-medium text-gray-700">{expense.paidBy?.name || "Unknown"}</span>
                                            {" | "}
                                            Date: {expense.date ? new Date(expense.date).toLocaleDateString() : "N/A"}
                                        </div>
                                        <div className="text-xs text-gray-600">
                                            Split Among:
                                            <ul className="ml-2 list-disc">
                                                {expense.splitAmong.map((split: any) => (
                                                    <li key={split._id || split.userId} className="ml-2">
                                                        User ID: <span className="font-mono">{split.userId}</span>
                                                        {" - "}
                                                        {split.percentage}%
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </li>
                                ))
                            )}
                        </ul>
                    </div>
                </div>
            )}
        </div>
    );
}
