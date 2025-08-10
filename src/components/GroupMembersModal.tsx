export function GroupMembersModal({show, onClose, members, membersGroupName}: any) {
    if (!show) return null;
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
            <div
                className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl shadow-2xl p-6 w-full max-w-md relative border border-blue-200">
                <button
                    className="absolute top-2 right-2 text-blue-400 hover:text-blue-700"
                    onClick={onClose}
                    aria-label="Close"
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/>
                    </svg>
                </button>
                <h3 className="text-lg font-bold mb-4 text-blue-800">{membersGroupName}</h3>
                <ul className="space-y-3">
                    {members.length === 0 ? (
                        <li className="text-blue-400 italic">No members found</li>
                    ) : (
                        members.map((member: any) => {
                            const name = member.userId.name || "";
                            const initials = name
                                .split(" ")
                                .map((n: string) => n[0])
                                .join("")
                                .toUpperCase()
                                .slice(0, 2);
                            return (
                                <li key={member._id}
                                    className="flex items-center gap-3 bg-blue-100 rounded-md p-2 border border-blue-200">
                                    <div
                                        className="w-10 h-10 rounded-full border-2 border-blue-300 bg-blue-200 flex items-center justify-center text-blue-800 font-bold text-lg select-none shadow"
                                    >
                                        {initials || "U"}
                                    </div>
                                    <div className="flex-1">
                                        <div className="font-semibold text-blue-900">{member.userId.name}</div>
                                        <div className="text-xs text-blue-500">{member.userId.email}</div>
                                    </div>
                                    {member.isAdmin && (
                                        <span
                                            className="text-xs px-2 py-1 bg-green-200 text-green-800 rounded font-bold ml-2 border border-green-300"
                                        >
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
    );
}