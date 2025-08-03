export function FriendRequestsSection({
                                          friendRequest,
                                          friends,
                                          friendID,
                                          setFriendID,
                                          handleSendFriendRequest,
                                          handleAcceptFriendRequest,
                                      }: any) {
    return (
        <div className="flex-1 bg-white rounded-xl shadow-lg p-6 min-w-[220px] border border-gray-100">
            <h2 className="font-semibold mb-3 text-blue-700 text-lg flex items-center gap-2">
                <svg className="w-5 h-5 text-blue-400" aria-hidden="true" fill="none" stroke="currentColor"
                     strokeWidth="2"
                     viewBox="0 0 24 24">
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
                    (friendRequest ?? []).map((friend: any) => (
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
                                         strokeWidth="2"
                                         viewBox="0 0 24 24">
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
                                    <svg className="w-4 h-4 text-red-500" fill="none" stroke="currentColor"
                                         strokeWidth="2"
                                         viewBox="0 0 24 24">
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
                    friends!.map((friend: any) => (
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
    );
}
