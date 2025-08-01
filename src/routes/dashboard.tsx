import {createFileRoute, redirect} from '@tanstack/react-router';
import {useAppStore} from '../store/AppStore.ts';
import {groupService} from '../api/groupService.ts';
import {useState} from "react";
import {friendService} from "../api/friendService.ts";

export const Route = createFileRoute('/dashboard')({
    beforeLoad: async () => {
        const {verifyAuth, user} = useAppStore.getState();
        if (user) return;
        await verifyAuth();
        const freshUser = useAppStore.getState().user;
        if (!freshUser) {
            throw redirect({
                to: '/login',
                search: {redirect: '/dashboard'},
            });
        }
    },
    loader: async () => {
        try {
            const response = await groupService.getAllGroups();
            const friendRequests = await friendService.getAllFriendRequests();
            const friends = await friendService.getFriends();
            return {
                groups: response.data.groups,
                friendRequest: friendRequests.data.requests,
                friends: friends.data.contacts
            };
        } catch (error) {
            console.error("Failed to load groups:", error);
            return {};
        }
    },
    component: DashboardComponent,
});


function DashboardComponent() {
    const user: { name: string, _id: string } = useAppStore((state) => state.user)!;
    const [friendID, setFriendID] = useState("");

    const {groups} = Route.useLoaderData();
    const {friendRequest} = Route.useLoaderData();
    const {friends} = Route.useLoaderData();

    const handleSendFriendRequest = async () => {
        if (!friendID) {
            console.log("No friend id provided")
            return;
        }
        try {
            await friendService.sendFriendRequest(friendID).then((res) => {
                console.log("Friend request sent successfully:", res);
            }).catch((error) => {
                console.log(error)
            })
        } catch (error) {
            console.error("Error sending friend request:", error);
        }
    }

    const handleAcceptFriendRequest = async (id: string) => {
        try {
            await friendService.acceptFriendRequest(id);
            // Optionally, refresh friend requests or update state here
            console.log("Friend request accepted:", id);
        } catch (error) {
            console.error("Failed to accept friend request:", error);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-100 to-blue-100 p-4">
            <h1 className="font-bold text-2xl mb-1 text-gray-800">Dashboard - {user.name}</h1>
            <p className="text-gray-600 mb-6">User Id: <span className="font-mono">{user._id}</span></p>

            <div className="flex flex-col md:flex-row gap-6 w-full max-w-6xl mx-auto">
                {/* Friend Request Section (unchanged) */}
                <div className="flex-1 bg-white rounded-xl shadow-lg p-6 min-w-[220px] border border-gray-100">
                    <h2 className="font-semibold mb-3 text-blue-700 text-lg flex items-center gap-2">
                        <svg className="w-5 h-5 text-blue-400" aria-hidden="true" fill="none" stroke="currentColor"
                             strokeWidth="2" viewBox="0 0 24 24">
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
                                    <svg className="w-4 h-4 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
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
                                            <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor"
                                                 strokeWidth="2" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/>
                                            </svg>
                                        </button>
                                        <button
                                            className="p-1 rounded-full hover:bg-red-100 transition-colors"
                                            aria-label="Reject"
                                            type="button"
                                        >
                                            <svg className="w-4 h-4 text-red-500" fill="none" stroke="currentColor"
                                                 strokeWidth="2" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round"
                                                      d="M6 18L18 6M6 6l12 12"/>
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
                                    <svg className="w-4 h-4 text-green-400" fill="currentColor" viewBox="0 0 20 20">
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
                        <svg className="w-5 h-5 text-green-400" aria-hidden="true" fill="none" stroke="currentColor"
                             strokeWidth="2" viewBox="0 0 24 24">
                            <path
                                d="M17 20h5v-2a4 4 0 00-3-3.87M9 20H4v-2a4 4 0 013-3.87m9-7a4 4 0 11-8 0 4 4 0 018 0z"/>
                        </svg>
                        Groups & Expenses
                    </h2>

                </div>

                {/* Group Chat Section (unchanged) */}
                <div className="flex-1 bg-white rounded-xl shadow-lg p-6 min-w-[220px] border border-gray-100">
                    <h2 className="font-semibold mb-3 text-purple-700 text-lg flex items-center gap-2">
                        <svg className="w-5 h-5 text-purple-400" aria-hidden="true" fill="none" stroke="currentColor"
                             strokeWidth="2" viewBox="0 0 24 24">
                            <path
                                d="M8 10h.01M12 10h.01M16 10h.01M21 12c0 4.418-4.03 8-9 8a9.77 9.77 0 01-4-.8l-4.28 1.07a1 1 0 01-1.21-1.21l1.07-4.28A8.96 8.96 0 013 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
                        </svg>
                        Groups
                    </h2>
                    <div className="mb-4 text-gray-700">
                        {/* The `|| "0"` fallback is no longer strictly necessary but is safe to keep */}
                        Total Groups: <span className="font-bold text-green-600">{groups?.length ?? "0"}</span>
                    </div>
                    <div>
                        <h3 className="font-medium text-gray-700 mb-2">Recent Expenses</h3>
                        <ul className="space-y-1">
                            {!Array.isArray(groups) || groups.length === 0 ? (
                                <li className="text-gray-400 italic">No groups found</li>
                            ) : (
                                groups.map((group: { _id: string, name: string }) => (
                                    <li key={group._id}
                                        className="text-gray-700 bg-gray-100 p-2 rounded-md flex items-center gap-2 hover:bg-gray-200 transition-colors cursor-pointer">
                                        <span className="font-semibold">{group.name}</span>
                                    </li>
                                ))
                            )}
                        </ul>
                    </div>
                    {/* ... */}
                </div>
            </div>
        </div>
    );
}