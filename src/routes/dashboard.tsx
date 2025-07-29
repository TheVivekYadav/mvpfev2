import {createFileRoute} from '@tanstack/react-router'
import {useAppStore} from "../store/AppStore.ts";
import {useEffect, useState} from "react";

export const Route = createFileRoute('/dashboard')({
    component: RouteComponent,
})

function RouteComponent() {
    const user = useAppStore(state => state.user);
    const friendRequests = useAppStore(state => state.friendRequests);
    const groups = useAppStore(state => state.groups);
    const fetchGroups = useAppStore(state => state.fetchGroups);
    const [loadingGroups, setLoadingGroups] = useState(true);

    useEffect(() => {
        useAppStore.getState().verifyAuth();
        useAppStore.getState().fetchFriendRequests().catch((error) => {
            console.error("Error fetching friend requests:", error)
        });

        setLoadingGroups(true);
        fetchGroups()
            .catch((err) => {
                console.error("Error fetching groups:", err);
            })
            .finally(() => setLoadingGroups(false));
    }, []);

    // async function sendFriendRequest() {
    //     try {
    //         await friendService.sendFriendRequest(friendId);
    //         console.log("Friend request sent successfully");
    //         await useAppStore.getState().fetchFriendRequests(); // Refresh requests
    //     } catch (error) {
    //         console.log("Friend request failed:", error);
    //     }
    // }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-100 to-blue-100 p-4">
            <h1 className="font-bold text-2xl mb-1 text-gray-800">Dashboard - {user?.name}</h1>
            <p className="text-gray-600 mb-6">User Id: <span className="font-mono">{user?._id}</span></p>
            <div className="flex flex-col md:flex-row gap-6 w-full max-w-6xl mx-auto">
                {/* Friend Request Section */}
                <div className="flex-1 bg-white rounded-xl shadow-lg p-6 min-w-[220px] border border-gray-100">
                    <h2 className="font-semibold mb-3 text-blue-700 text-lg flex items-center gap-2">
                        <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" strokeWidth="2"
                             viewBox="0 0 24 24">
                            <path
                                d="M17 20h5v-2a4 4 0 00-3-3.87M9 20H4v-2a4 4 0 013-3.87m9-7a4 4 0 11-8 0 4 4 0 018 0z"/>
                        </svg>
                        Friend Requests
                    </h2>
                    {/*<Input value={friendId} onChange={(e) => setFriendId(e.target.value)}/>*/}
                    {/*<button onClick={sendFriendRequest} className="bg-blue-500 text-white px-3 py-1 rounded">Send Friend Request</button>*/}
                    <div className="mt-4">
                        <h3 className="font-medium text-gray-700 mb-2">Pending Requests</h3>
                        <ul className="space-y-2">
                            {friendRequests.length === 0 && (
                                <li className="text-gray-400 italic">No pending requests</li>
                            )}
                            {friendRequests.map((request, index) => (
                                <li
                                    key={request._id ?? index}
                                    className="bg-blue-50 hover:bg-blue-100 transition rounded px-3 py-2 flex items-center gap-2 shadow-sm"
                                >
                                    <span
                                        className="font-semibold text-blue-700">{request.name ?? request.email ?? request._id ?? JSON.stringify(request)}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Groups & Expenses Section */}
                <div className="flex-1 bg-white rounded-xl shadow-lg p-6 min-w-[220px] border border-gray-100">
                    <h2 className="font-semibold mb-3 text-green-700 text-lg flex items-center gap-2">
                        <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" strokeWidth="2"
                             viewBox="0 0 24 24">
                            <path
                                d="M17 20h5v-2a4 4 0 00-3-3.87M9 20H4v-2a4 4 0 013-3.87m9-7a4 4 0 11-8 0 4 4 0 018 0z"/>
                        </svg>
                        Groups & Expenses
                    </h2>
                    <div className="mb-4 text-gray-700">
                        Total Groups:{" "}
                        <span className="font-bold text-green-600">
                            {loadingGroups ? "Loading..." : groups.length}
                        </span>
                    </div>
                    <div>
                        <h3 className="font-medium text-gray-700 mb-2">Recent Expenses</h3>
                        <ul className="space-y-1">
                            {loadingGroups && (
                                <li className="text-gray-400 italic">Loading...</li>
                            )}
                            {!loadingGroups && groups.length === 0 && (
                                <li className="text-gray-400 italic">No groups found</li>
                            )}
                            {!loadingGroups && groups.map((group, idx) => (
                                <li key={group._id ?? idx} className="bg-green-50 rounded px-2 py-1">
                                    {group.name} - <span className="font-semibold text-green-700">
                                        ${group.totalExpense ?? "0"}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Group Chat Section */}
                <div className="flex-1 bg-white rounded-xl shadow-lg p-6 min-w-[220px] border border-gray-100">
                    <h2 className="font-semibold mb-3 text-purple-700 text-lg flex items-center gap-2">
                        <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" strokeWidth="2"
                             viewBox="0 0 24 24">
                            <path
                                d="M8 10h.01M12 10h.01M16 10h.01M21 12c0 4.418-4.03 8-9 8a9.77 9.77 0 01-4-.8l-4.28 1.07a1 1 0 01-1.21-1.21l1.07-4.28A8.96 8.96 0 013 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
                        </svg>
                        Group Chat
                    </h2>
                    <div className="h-32 overflow-y-auto border rounded mb-3 p-2 text-sm bg-gray-50">
                        <div><span className="font-bold text-purple-700">Alice:</span> Hi team!</div>
                        <div><span className="font-bold text-purple-700">Bob:</span> Hello!</div>
                    </div>
                    <input
                        className="border rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-purple-300"
                        placeholder="Type a message..."/>
                </div>
            </div>
        </div>
    )
}
