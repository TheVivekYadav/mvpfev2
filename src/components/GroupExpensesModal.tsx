export function GroupExpensesModal({show, onClose, expensesGroupName, groupExpenses}: any) {
    if (!show) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
            <div className="bg-white rounded-xl shadow-2xl p-6 w-full max-w-2xl relative">
                <button
                    className="absolute top-2 right-2 text-gray-400 hover:text-gray-700"
                    onClick={onClose}
                    aria-label="Close"
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/>
                    </svg>
                </button>
                <h3 className="text-lg font-bold mb-4 text-yellow-700">{expensesGroupName} - Expenses</h3>
                <ul className="space-y-4 max-h-[60vh] overflow-y-auto">
                    {groupExpenses.length === 0 ? (
                        <li className="text-gray-400 italic">No expenses found</li>
                    ) : (
                        groupExpenses.map((expense: any) => (
                            <li
                                key={expense.name || expense._id}
                                className="bg-yellow-50 rounded-md p-4 shadow flex flex-col gap-2 border border-yellow-200"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="flex flex-col">
                                        <span
                                            className="font-semibold text-gray-800 text-base">{expense.description}</span>
                                        <span className="text-xs text-gray-500">
                                            {expense.date ? new Date(expense.date).toLocaleDateString() : "N/A"}
                                        </span>
                                    </div>
                                    <span className="ml-auto text-green-700 font-bold text-lg">
                                        ₹{expense.amount}
                                        
                                    </span>
                                </div>
                                <div className="flex items-center gap-2 text-sm text-gray-600">
                                    <span className="font-medium">Paid by:</span>
                                    <span className="flex items-center gap-1">
                                        <span
                                            className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-blue-200 text-blue-800 font-bold text-sm">
                                            {expense.paidBy?.name
                                                ? expense.paidBy.name
                                                    .split(" ")
                                                    .map((n: string) => n[0])
                                                    .join("")
                                                    .toUpperCase()
                                                    .slice(0, 2)
                                                : "U"}
                                        </span>
                                        <span>{expense.paidBy?.name || "Unknown"}</span>
                                    </span>
                                    <span className="ml-2 text-xs text-gray-400">{expense.paidBy?.email}</span>
                                </div>
                                <div className="text-xs text-gray-700 mt-1">
                                    <span className="font-medium">Split Among:</span>
                                    <ul className="ml-2 mt-1">
                                        {expense.splitAmong.map((split: any) => (
                                            <li key={split._id || split.userId} className="flex items-center gap-2">
                                                <span
                                                    className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-gray-200 text-gray-700 font-bold text-xs">
                                                    {typeof split.userId === "string"
                                                        ? split.userId.slice(0, 2).toUpperCase()
                                                        : (split.userId.name || "")
                                                            .split(" ")
                                                            .map((n: string) => n[0])
                                                            .join("")
                                                            .toUpperCase()
                                                            .slice(0, 2)}
                                                </span>
                                                <span>
                                                    {typeof split.userId === "string"
                                                        ? split.userId
                                                        : split.userId.name || split.userId._id}
                                                </span>
                                                <span className="ml-2 text-blue-700 font-semibold">
                                                    {split.percentage}%
                                                </span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div className="text-xs text-gray-400 mt-2">
                                    Created: {expense.createdAt ? new Date(expense.createdAt).toLocaleString() : "N/A"}
                                </div>
                            </li>
                        ))
                    )}
                </ul>
            </div>
        </div>
    );
}
