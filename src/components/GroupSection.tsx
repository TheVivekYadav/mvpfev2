export function GroupsSection({
                                  groups,
                                  handleAddMember,
                                  handleViewGroupMembers,
                                  handleViewGroupExpenses,
                                  handleCreateGroup,
                                  handleShowAddExpense,
                                  handleSettleUp, // <-- add this prop
                              }: any) {
    return (
        <div className="flex-1 bg-white rounded-xl shadow-lg p-6 min-w-[220px] border border-gray-100">
            <h2 className="font-semibold mb-3 text-green-700 text-lg flex items-center gap-2">
                <svg className="w-5 h-5 text-green-400" aria-hidden="true" fill="none" stroke="currentColor"
                     strokeWidth="2"
                     viewBox="0 0 24 24">
                    <path
                        d="M17 20h5v-2a4 4 0 00-3-3.87M9 20H4v-2a4 4 0 013-3.87m9-7a4 4 0 11-8 0 4 4 0 018 0z"/>
                </svg>
                Groups
                <button
                    className="ml-auto p-2 rounded-full bg-blue-100 hover:bg-blue-300 transition-colors flex items-center justify-center"
                    aria-label="Create Group"
                    type="button"
                    onClick={handleCreateGroup}
                >
                    <svg className="w-5 h-5 text-blue-700" fill="none" stroke="currentColor" strokeWidth="2"
                         viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4"/>
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
                                <button
                                    className="ml-2 p-1 rounded-full bg-green-100 hover:bg-green-200 transition-colors text-green-700"
                                    aria-label="Add Expense"
                                    type="button"
                                    onClick={() => handleShowAddExpense(group._id)}
                                >
                                    ＋₹
                                </button>
                                <button
                                    className="ml-2 p-1 rounded-full bg-orange-100 hover:bg-orange-200 transition-colors text-orange-700"
                                    aria-label="Settle Up"
                                    type="button"
                                    onClick={() => handleSettleUp(group._id)}
                                >
                                    💰
                                </button>
                            </li>
                        ))
                    )}
                </ul>
            </div>
        </div>
    );
}
