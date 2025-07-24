import {createFileRoute} from '@tanstack/react-router'
import {useAppStore} from "../store/AppStore.ts";
import {useEffect} from "react";
// import friendService from "../api/friendService.ts";

export const Route = createFileRoute('/dashboard')({
    component: RouteComponent,
})


function RouteComponent() {

    const user = useAppStore(state => state.user);
    // const friendRequests = useAppStore(state => state.friendRequests);
    // const [friendId, setFriendId] = useState("");

    useEffect(() => {
        useAppStore.getState().verifyAuth();
        // useAppStore.getState().fetchFriendRequests();

    }, [])

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
        <div>
            <h1 className="font-bold">Dashboard - {user?.name}</h1>
            <p>User Id {user?._id}</p>
            <div className="flex flex-col md:flex-row gap-4 w-full">
                {/* Friend Request Section */}
                <div className="flex-1 bg-white rounded shadow p-4 min-w-[220px]">
                    <h2 className="font-semibold mb-2">Friend Requests</h2>
                    {/*<Input value={friendId} onChange={(e) => setFriendId(e.target.value)}/>*/}
                    {/*<button onClick={sendFriendRequest} className="bg-blue-500 text-white px-3 py-1 rounded">*/}
                    {/*    Send Friend Request*/}
                    {/*</button>*/}
                    <div className="mt-2">
                        <h3 className="font-medium">Pending Requests</h3>
                        {/*<ul className="list-disc ml-5">*/}
                        {/*    {*/}

                        {/*        friendRequests.map((request, index) => (*/}
                        {/*            <li key={request._id ?? index}>*/}
                        {/*                {request.name ?? request.email ?? request._id ?? JSON.stringify(request)}*/}
                        {/*            </li>*/}
                        {/*        ))*/}
                        {/*    }*/}
                        {/*</ul>*/}
                    </div>
                </div>


                {/* Groups & Expenses Section */}
                <div className="flex-1 bg-white rounded shadow p-4 min-w-[220px]">
                    <h2 className="font-semibold mb-2">Groups & Expenses</h2>
                    {/* Add groups and recent expenses UI here */}
                    <div className="mb-2">Total Groups: <span className="font-bold">5</span></div>
                    <div>
                        <h3 className="font-medium">Recent Expenses</h3>
                        <ul className="list-disc ml-5">
                            <li>Lunch - $20</li>
                            <li>Movie - $15</li>
                        </ul>
                    </div>
                </div>


                {/* Group Chat Section */}
                <div className="flex-1 bg-white rounded shadow p-4 min-w-[220px]">
                    <h2 className="font-semibold mb-2">Group Chat</h2>
                    {/* Add group chat UI here */}
                    <div className="h-32 overflow-y-auto border rounded mb-2 p-2 text-sm bg-gray-50">
                        <div><span className="font-bold">Alice:</span> Hi team!</div>
                        <div><span className="font-bold">Bob:</span> Hello!</div>
                    </div>
                    <input className="border rounded px-2 py-1 w-full" placeholder="Type a message..."/>
                </div>
            </div>
        </div>
    )
}
